import { useState } from "react";
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
    const [searchTerm, setSearchTerm] = useState("");

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

    const filteredNFTs = nfts?.ownedNfts.filter((nft) =>
        nft.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div>NFTs found: {filteredNFTs?.length}</div>

            {
                filteredNFTs?.map((nft) => (
                    <div>
                        {nft.name}
                        <img src={String(nft.image.pngUrl)} alt={nft.name} className={`w-80`}/>
                    </div>
                ))
                /*
                filteredNFTs?.map((nft) => (
                <div key={nft.collection + "/" + nft.tokenId}>
                    <img src={String(nft.image.pngUrl)} alt={nft.name} className={`w-80`}/>
                    <div>{nft.name}</div>
                    <div>{nft.description}</div>
                </div>
                ))
                */
            }
        </>
    );
};
