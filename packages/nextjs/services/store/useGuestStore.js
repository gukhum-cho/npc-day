/* eslint-disable prettier/prettier */
// This store is responsible for managing the guest account state and functions
import {create} from 'zustand';

export const useGuestStore = create(( set,get ) => ({
    // define your state and functions here
    guestAccount: null,
    setGuestAccount: (guestAccount) => set({ guestAccount }),
    connectWithGuestAccount: () => {
        // Use a predefined guest account with NFTs
        set({ guestAccount: "paulgadi.eth" });
    },
}));