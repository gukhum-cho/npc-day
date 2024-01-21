import create from 'zustand';
import { useEffect } from 'react';
import { useAccount } from "wagmi";
// This store is used to manage the address of the current user

export const useAddressStore = create(( set,get ) => ({
    // define your state and functions here
    address: null,
    setAddress: (address) => set({ address })
}));

export const useSyncAddressWithStore = () => { 
    // Custom hook to sync the address with the store
    // This is done for a more scalable solution as project grows as syncing with address may be done a lot
    const { address } = useAccount();
    const setAddress = useAddressStore((state) => state.setAddress);
    
    useEffect(() => {
        setAddress(address);
    }, [address, setAddress]);
};
