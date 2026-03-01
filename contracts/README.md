# PokemonCardShop contract

Deploy this contract to **Sepolia** so the app can accept ETH for card purchases.

## Deploy with Remix (easiest)

1. Open [remix.ethereum.org](https://remix.ethereum.org).
2. Create a file `PokemonCardShop.sol` and paste the contents of `PokemonCardShop.sol` in this folder.
3. Compile: Solidity 0.8.20, default optimizer.
4. In "Deploy & run transactions":
   - Environment: "Injected Provider - MetaMask" (connect to Sepolia).
   - Deploy. The deployer becomes `owner` and receives all ETH from purchases.
5. Copy the deployed contract address and set it in your app `.env`:
   ```
   VITE_POKEMON_SHOP_CONTRACT_ADDRESS=0xYourContractAddress
   ```
6. Restart the app (`npm run dev`).

## What the contract does

- `purchase(string cardId)` is **payable**: the user sends ETH when calling it.
- The contract emits `Purchase(buyer, cardId, amount)` and forwards the ETH to `owner`.
- `owner` is set to the deployer address.

## Frontend

The app calls `purchase(cardId)` with `value = card price in ETH` (from USD/ETH rate). Ensure the wallet is on Sepolia and has enough Sepolia ETH for the purchase + gas.
