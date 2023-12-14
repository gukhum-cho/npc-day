import { Network, Alchemy, OwnedNftsResponse } from 'alchemy-sdk';
import { useCallback, useEffect, useState } from "react";
import scaffoldConfig from "~~/scaffold.config";

const settings = {
  apiKey: scaffoldConfig.alchemyApiKey,
  network: Network.ETH_MAINNET,
};

export function useAccountNFTs(address: string) {

  const [nfts, setNfts] = useState<OwnedNftsResponse>();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageKey, setPageKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const alchemy = new Alchemy(settings);

  const fetchNFTs = useCallback(async () => {
    try {
      const fetchedNFTs = await alchemy.nft.getNftsForOwner(address);
      
      const pageKey = fetchedNFTs.pageKey ? parseInt(fetchedNFTs.pageKey) : 0;
      setPageKey(pageKey);

      console.log(fetchedNFTs);
      setNfts(fetchedNFTs);
      setLoading(false);

    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred."));
    }
    
  }, [currentPage])

  useEffect(() => {
    setError(null);
    setLoading(true);
    fetchNFTs();
  }, [fetchNFTs]);

  return {
    nfts,
    setCurrentPage,
    loading,
    error,
    pageKey
  };  
}