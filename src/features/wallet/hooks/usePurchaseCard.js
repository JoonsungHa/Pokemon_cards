import { useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { POKEMON_SHOP_ABI, POKEMON_SHOP_ADDRESS } from '@/config/contracts'

/**
 * Hook to purchase a card by sending ETH to the PokemonCardShop contract.
 * Requires VITE_POKEMON_SHOP_CONTRACT_ADDRESS to be set and contract deployed on the connected chain (e.g. Sepolia).
 */
export function usePurchaseCard() {
  const {
    writeContract,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
    data: txHash,
  } = useWriteContract()

  const purchaseCard = (cardId, ethPrice) => {
    if (!POKEMON_SHOP_ADDRESS) {
      console.error('VITE_POKEMON_SHOP_CONTRACT_ADDRESS is not set')
      return
    }
    const value = parseEther(String(ethPrice))
    writeContract({
      address: POKEMON_SHOP_ADDRESS,
      abi: POKEMON_SHOP_ABI,
      functionName: 'purchase',
      args: [cardId],
      value,
    })
  }

  return {
    purchaseCard,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
    txHash,
  }
}
