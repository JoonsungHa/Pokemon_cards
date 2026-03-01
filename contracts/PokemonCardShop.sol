// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * Minimal shop: accepts ETH for a card id and forwards to owner.
 * Deploy on Sepolia and set VITE_POKEMON_SHOP_CONTRACT_ADDRESS in .env.
 */
contract PokemonCardShop {
    address public owner;
    event Purchase(address indexed buyer, string cardId, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function purchase(string calldata cardId) external payable {
        require(msg.value > 0, "Must send ETH");
        emit Purchase(msg.sender, cardId, msg.value);
        (bool ok, ) = owner.call{ value: msg.value }("");
        require(ok, "Transfer failed");
    }
}
