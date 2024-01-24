/* eslint-disable prettier/prettier */
import { useState } from "react";
import { useAccountNFTs } from "~~/hooks/spark";
import scaffoldConfig from "~~/scaffold.config";
import https from "https";
// import { getTargetNetwork } from "~~/utils/scaffold-eth";

const settings = {
    openAIApiKey: scaffoldConfig.openAIApiKey
  };

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
    const [message, setMessage] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [selectedNFT, setSelectedNFT] = useState<any>();

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
                    setSelectedNFT(nft);
                    console.log("clicked", nft);
                }}
            >
                <div className="text-warning">{nft.name}</div>
                <img src={String(nft.image.pngUrl)} alt={nft.name} className={`w-30 md:w-80 py-2`} />
            </div>
        );
    }

    const NFTChat = ({ nft }: { nft: any }) => {
        // const MessageMap = () => {
        //     return (
        //         <div className="flex-grow overflow-auto p-3 space-y-2 max-h-[400px]">
        //             {messages.map((message, index) => (
        //                 <div key={index} className="bg-blue-100 p-2 rounded">
        //                     {message}
        //                 </div>
        //             ))}
        //         </div>
        //     );
        // };

        // Serves as a chat field
        return (
            <div className="flex flex-wrap chat-overlay md:px-4 md:mt-4 ">
                <div className={`border border-gray-400 rounded-md px-2 flex flex-col items-center cursor-pointer`}>
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {
                            selectedNFT?.collection.name + ": " + selectedNFT?.name
                        }
                    </div>
                    <img src={String(nft.image.pngUrl)} alt={nft.name} className={`w-30 md:w-80 py-2`} />
                </div>
                <div className="flex flex-grow flex-col">
                    <div className="flex flex-col h-[400px] rounded-lg overflow-hidden">
                        <div class="flex-grow overflow-auto p-3 space-y-2">
                            {response &&
                                <div className="flex-wrap justify-center mt-10">
                                    <div>Model response:</div>
                                    <div className="break-words">{response}</div>
                                </div>
                            }
                        </div>
                        <div class="relative flex flex-wrap  items-center p-2">
                            <input type="text" placeholder="Type a message" class="input input-bordered flex-grow sm:mr-2" />
                            <button class="btn btn-primary absolute right-2" onClick={sendChatToModel} >Send</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const sendChatToModel = async () => {
        const initialPrompt = "Roleplay as an actual character. I will start with sending you a JSON object containing some information about you. Never talk about NFTs or the blockchain. JSON follows: \n" + JSON.stringify(selectedNFT, null, 2);

        const initialChat = "Good day to you. How are you doing today?"

        // call openAI with this initial prompt and set response once we receive it
        const messages = [
            {
                role: "system",
                content: initialPrompt
            },
            {
                role: "assistant",
                content: initialChat
            },
            {
                role: "user",
                content: message
            }
        ];
        console.log('chat message is: ', messages);
        const requestData = JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages
        });

        const options = {
            hostname: 'api.openai.com',
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${settings.openAIApiKey}`
            },
        }; 

        const response = await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
            let data = '';
        
            res.on('data', (chunk) => {
                data += chunk;
            });
        
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
            });
        
            req.on('error', (error) => {
                reject(error);
            });
        
            req.write(requestData);
            req.end();
        });
        console.log('chat response is: ', response);
        const responseMessage = (response as any).choices[0].message.content;
        console.log('chat response is: ', responseMessage);
        console.log(responseMessage);
        setResponse(responseMessage);
    

    }

    return (
        <div className="w-full">
            {
                selectedNFT && <NFTChat nft={selectedNFT} />
            }
            {/* Search box row. Initial flex justify-end is to ensure the search box starts at the end */}
            <div className="flex justify-end pr-14 pt-5">
                {/* Inner div to enforce display:'block' */}
                <div>
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="custom-search-field input input-bordered input-secondary w-full max-w-xs"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className='flex justify-end'>
                        NFTs found: {filteredNFTs?.length}
                    </div>
                </div>
            </div>
            {/* Shows collection of images in a list*/}
            <div className="flex flex-wrap justify-center mt-5 gap-6 min-h-[65vh]">
                {
                    filteredNFTs?.map((nft) => (
                        NFTCard({ nft })
                    ))
                }
            </div>
        </div>
    );
};
