import { isAddress } from 'viem'
import { getEnsProfile } from '#app/actions.ts'
import { useQuery } from '@tanstack/react-query'

export function useEnsProfile(addressOrName: string) {
  return useQuery({
    queryKey: ['ensProfile', addressOrName],
    queryFn: async () => getEnsProfile(addressOrName),
    enabled: Boolean(addressOrName) && isAddress(addressOrName),
    refetchOnWindowFocus: false
  })
}
