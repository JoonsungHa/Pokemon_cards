/**
 * ABI for PokemonCardShop.purchase(string cardId) payable.
 * Update if the contract changes.
 */
export const POKEMON_SHOP_ABI = [
  {
    inputs: [{ name: 'cardId', type: 'string', internalType: 'string' }],
    name: 'purchase',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { name: 'buyer', type: 'address', indexed: true, internalType: 'address' },
      { name: 'cardId', type: 'string', indexed: false, internalType: 'string' },
      { name: 'amount', type: 'uint256', indexed: false, internalType: 'uint256' },
    ],
    name: 'Purchase',
    type: 'event',
  },
]

export const POKEMON_SHOP_ADDRESS = import.meta.env.VITE_POKEMON_SHOP_CONTRACT_ADDRESS || ''
