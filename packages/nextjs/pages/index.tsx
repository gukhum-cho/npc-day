/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
// Assets
import BackgroundImage from './../public/assets/landing-background.png';
// External Libraries
import { useAccount } from "wagmi";
// Local Hooks and Zustand Stores
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
// import { useAccountNFTs } from "~~/hooks/spark"; uncomment if need to view loading state of nfts
import { useAddressStore,useSyncAddressWithStore } from "~~/services/store/useAddressStore";
import { useGuestStore } from "~~/services/store/useGuestStore";
// Local Components
import { MetaHeader } from "~~/components/MetaHeader";
import { NFTPicker } from "~~/components/spark";
import BackgroundImageWrapper from "~~/components/BackgroundImageWrapper";

const Home: NextPage = () => {
  useSyncAddressWithStore(); //Syncs the account address with the store
  const address = useAddressStore(state => state.address); 
  const guestAccount = useGuestStore(state => state.guestAccount);
  const connectWithGuestAccount = useGuestStore(state => state.connectWithGuestAccount);
  return (
    <div style={{display:'flex', flexDirection:'column', flexGrow:1}}>
      <MetaHeader />
      {/* This is a wrapper that has a background image and its children covered by a gradient to make it more readable.*/}
      <BackgroundImageWrapper> 
        {/* this is to align x-axis of the opaque container to the center  */}
        <div className={"flex justify-center"}> 
          <div className={`rounded-corner flex justify-center inset-0 bg-black bg-opacity-40 w-full sm:min-w-[300px] md:min-w-[440px] pl-6 min-h-[600px] ${(address || guestAccount) ? '':'max-w-[440px] '}`}>
          {
            address ? (
              <NFTPicker address={address}></NFTPicker>
            ) : (
              guestAccount ? (
                <NFTPicker address={guestAccount}></NFTPicker>

              )
              : (
                // <div className="displayh-full" style={{padding:'15px',border:'1px solid red'}}>
                  <div className="flex flex-col items-center flex-grow mt-[7rem] ">
                    <div className="">
                      <p className="text-lg font-bold text-center tracking-widest">
                        Select A Wallet            
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-2 mt-[3rem]">
                      <button className="btn btn-primary btn-sm" onClick={useAccount} type="button">
                        CONNECT WALLET
                      </button>
                    </div>
                    <div className="flex flex-row items-center mt-[2rem]">
                      <button className="btn btn-primary btn-sm" onClick={connectWithGuestAccount} type="button">
                        USE GUEST WALLET
                      </button>                     
                    </div>
                    {/* Padding right is below since this whole div has a slight padding left to center the overlay with the background image
                        not padding right makes the overlay look off center
                    */}
                    <div className="flex justify-center mt-[3rem] pr-6">
                      <p className="text-sm text-center w-full max-w-[300px]">
                        Connect Wallet to select one of your NFTs, or if you dont have your own wallet you can try out our guest wallet.
                      </p>
                    </div>
                  </div>
              )
            )
          }
          </div>
        </div>      
      </BackgroundImageWrapper>
    </div>
  );
};

export default Home;
