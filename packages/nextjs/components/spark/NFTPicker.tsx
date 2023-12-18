import { useState } from "react";
import { useAccountNFTs } from "~~/hooks/spark";
// import { getTargetNetwork } from "~~/utils/scaffold-eth";

type TNFTPickerProps = {
    address: string;
    className?: string;
};

/**
 * Allow user to pick an NFT in their address, uses Alchemy
 */
export const NFTPicker = ({ address, className = "" }: TNFTPickerProps) => {
    // const configuredNetwork = getTargetNetwork();
    const { nfts, 
            // pageKey, 
            // setCurrentPage, 
            loading, error } = useAccountNFTs(address);
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

    const NFTCard = ({ nft }: { nft: any }) => {
        return (
            <div
                className={`border-2 border-gray-400 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer`}
                onClick={() => {
                    console.log("clicked", nft);
                }}
            >
                <div className="text-warning">{nft.name}</div>
                <img src={String(nft.image.pngUrl)} alt={nft.name} className={`w-80 py-2`} />
            </div>
        );
    }

    return (
        <div className={className}>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div>NFTs found: {filteredNFTs?.length}</div>

            <div className="flex flex-wrap justify-center mt-10">
                {
                    filteredNFTs?.map((nft) => (
                        NFTCard({ nft })
                    ))
                }
            </div>
        </div>
    );
};
