import { useAccountNFTs } from "~~/hooks/spark";
import { getTargetNetwork } from "~~/utils/scaffold-eth";


type TNFTPickerProps = {
  address: string;
  className?: string;
};

/**
 * Display (ETH & USD) balance of an ETH address.
 */
export const NFTPicker = ({ address, className = "" }: TNFTPickerProps) => {
  const configuredNetwork = getTargetNetwork();
  const { nfts, pageKey, setCurrentPage, loading, error } = useAccountNFTs(address);

  if (!address || loading || nfts === null) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`border-2 border-gray-400 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer`}>
        <div className="text-warning">Error</div>
      </div>
    );
  }

  return (
    <>
    NFTs found: {nfts?.totalCount}
    </>
  );
};
