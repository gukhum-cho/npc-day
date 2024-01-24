/* eslint-disable prettier/prettier */
import {create} from 'zustand';
import { useEffect } from 'react';
import { useAccount } from "wagmi";
import { parseEther } from "viem";
import { useScaffoldContractRead, useScaffoldContractWrite } from '~~/hooks/scaffold-eth';

// This store is used to manage the address of the current user

export const useContractStore = create(( set,get ) => ({
    // define your state and functions here
    bossHealth: 0,
    address: null,
    setAddress: (address) => set({ address }),
    GetBossHealth: async () => {
        const { read } = useScaffoldContractRead({
            contractName: 'YourContract',
            functionName: 'checkBossHealth',
        });
        if (read) {
            const bossHealth = await read();
            set({ bossHealth });
        }
    },
    PerformStrongSlash: async () => {
        const { writeAsync, isLoading } = useScaffoldContractWrite({
            contractName: 'YourContract',
            functionName: 'strongSlash',
            args: [], // Add any necessary arguments here
            value: parseEther("0.01"), // Adjust the value as needed
            onBlockConfirmation: txnReceipt => {
                console.log("📦 Transaction blockHash", txnReceipt.blockHash);
            },
        });
    },
    PerformQuickSlash: async () => {
        const { writeAsync, isLoading } = useScaffoldContractWrite({
            contractName: 'YourContract',
            functionName: 'quickSlash',
            args: [], // Add any necessary arguments here
            value: parseEther("0.01"), // Adjust the value as needed
            onBlockConfirmation: txnReceipt => {
                console.log("📦 Transaction blockHash", txnReceipt.blockHash);
            },
        });
    },
    PerformNormalSlash: async () => {
        const { writeAsync, isLoading } = useScaffoldContractWrite({
            contractName: 'YourContract',
            functionName: 'normalSlash',
            args: [], // Add any necessary arguments here
            value: parseEther("0.01"), // Adjust the value as needed
            onBlockConfirmation: txnReceipt => {
                console.log("📦 Transaction blockHash", txnReceipt.blockHash);
            },
        });
    
    },
}));

export const useSyncAddressWithStore = () => { 
    // Custom hook to sync the address with the store
    // This is done for a more scalable solution as project grows as syncing with address may be done a lot
    const { address } = useAccount();
    const setAddress = useContractStore((state) => state.setAddress);
    
    useEffect(() => {
        setAddress(address);
    }, [address, setAddress]);
};
