import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { CHAIN_SUBGRAPH_URL } from '../constants/chainInfo'
import { useChainId } from './useChainId'
import { useMemo } from 'react'

const usePrimitivesFromSmartVault = (id = '0x', limit = 10) => {
  const chainId = useChainId()

  const { data, isLoading } = useQuery(
    ['usePrimitivesFromSmartVault', chainId, id],
    () => fetchSmartVault(chainId, id.toString()),
    {
      refetchInterval: 10000,
    }
  )

  return useMemo(() => {
    let actions

    // match primitives into actions
    let grouped = data?.primitiveExecutions.reduce(function (rv, x) {
      ; (rv[x['transaction']['id']] = rv[x['transaction']['id']] || []).push(x)
      return rv
    }, {})

    // order actions
    // eslint-disable-next-line
    actions = grouped && Object.entries(grouped).sort((a, b) => {
      // sort actions
      if (b[1][0]?.transaction?.executedAt > a[1][0]?.transaction?.executedAt) return 1
      else if (b[1][0]?.transaction?.executedAt < a[1][0]?.transaction?.executedAt) return -1
    })

    return {
      id: data?.id,
      totalValueManaged: data?.totalValueManaged || 0,
      lastAction: actions && actions[0] && actions[0][1],
      actions: actions && actions?.slice(0, limit),
      isLoading: isLoading
    }
  }, [data, isLoading, limit])
}

const fetchSmartVault = async (chainId, id) => {
  //TODO: put id in the query. Cause for some reason is failing
  let data = await request(
    CHAIN_SUBGRAPH_URL[chainId],
    gql`
    {
          primitiveExecutions(orderBy: transaction__executedAt, orderDirection: desc, where: {smartVault: ${'"' + id.toLowerCase() + '"'}}){
            id
            smartVault {
              totalValueManaged
            }
            type
            data
            transaction {
              id
              executedAt
              target	
              sender
              gasUsed
              gasPrice
              costNative
              costUsd
              relayer
              hash
            }
            fee {
              pct
              token {
                id
                name
                symbol
                decimals
              }
              amount
              feeCollector
            }
            movements {
              id
              type
              token {
                id
                name
                symbol
                decimals
              }
              amount
            }
            }
          }

    `
  )
  console.log('usePrimitivesFromSmartVault2', data)
  return data
}

export default usePrimitivesFromSmartVault
