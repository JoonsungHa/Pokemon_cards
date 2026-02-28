const API_BASE = 'https://api.tcgdex.net/v2/en';

/**
 * Fetch a set's card list (briefs only; no pricing).
 */
export async function getSet(setId) {
  const res = await fetch(`${API_BASE}/sets/${setId}`);
  if (!res.ok) throw new Error(`Set ${setId}: ${res.statusText}`);
  return res.json();
}

/**
 * Fetch full card details including pricing.
 */
export async function getCard(cardId) {
  const res = await fetch(`${API_BASE}/cards/${cardId}`);
  if (!res.ok) throw new Error(`Card ${cardId}: ${res.statusText}`);
  return res.json();
}

/**
 * Get a numeric price in USD for sorting (prefer TCGplayer, fallback Cardmarket trend in EUR as approx).
 */
function getSortPrice(card) {
  const p = card.pricing;
  if (!p) return 0;
  const usd = p.tcgplayer?.holofoil?.marketPrice ?? p.tcgplayer?.normal?.marketPrice ?? p.tcgplayer?.reverse?.marketPrice;
  if (usd != null) return usd;
  const eur = p.cardmarket?.trend ?? p.cardmarket?.avg ?? p.cardmarket?.low;
  if (eur != null) return eur * 1.08; // rough EUR -> USD
  return 0;
}

/**
 * Fetch cards from high-value sets, then return the top 10 by market price (USD preferred).
 */
export async function getTop10ByPrice() {
  const setsToSample = [
    { id: 'base1', take: 20 },       // Base Set (Charizard, etc.)
    { id: 'swsh3.5', take: 25 },    // Champion's Path
    { id: 'swsh7', take: 30 },      // Evolving Skies
    { id: 'swsh4.5', take: 25 },   // Shining Fates
  ];

  const setResponses = await Promise.all(
    setsToSample.map(({ id }) => getSet(id).catch(() => ({ cards: [] })))
  );

  const allCardIds = [];
  setResponses.forEach((set, i) => {
    const take = setsToSample[i].take;
    const cards = set.cards || [];
    cards.slice(0, take).forEach((c) => allCardIds.push(c.id));
  });

  const cardsWithPricing = await Promise.all(
    allCardIds.map((id) => getCard(id).catch(() => null))
  );

  const valid = cardsWithPricing.filter(Boolean).filter((c) => getSortPrice(c) > 0);
  valid.sort((a, b) => getSortPrice(b) - getSortPrice(a));

  return valid.slice(0, 10);
}
