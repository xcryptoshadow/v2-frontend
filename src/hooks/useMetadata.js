import { useQuery } from 'react-query'
import axios from 'axios'

const useMetadata = (type = null, chainId = 1, address = null) => {
  return useQuery(
    ['metadata', type, chainId, address], // data cached with unique id
    () => fetchMetadata(type, chainId, address)
  )
}

const fetchMetadata = async (type, chainId, address) => {
  // TODO: urlMetadata update domain address, split to enviroment file
  const urlMetadata = `https://cdn.statically.io/gh/mimic-fi/v2-metadata/master/build/${type}/${chainId}/${address}`
  console.log('url', urlMetadata)
  const { data } = await axios.get(urlMetadata)
  return data
}

export default useMetadata