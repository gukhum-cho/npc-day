/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { parseEther } from "viem";
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth';
import { useAnimationConfig, useScaffoldContract, useScaffoldContractRead, useScaffoldEventHistory, useScaffoldEventSubscriber} from "~~/hooks/scaffold-eth";
import { useContractStore,useSyncAddressWithStore } from "~~/components/example-ui/useContractStore";
import { useBossStore } from "~~/components/example-ui/useBossStore";
function UserField() {
  useSyncAddressWithStore(); //Syncs the account address with the store
  const bossHp = useBossStore(state => state.bossHp); // Gets the boss's hp (from the useBossStore)
  const setBossHp = useBossStore(state => state.setBossHp); // Sets the boss's hp (from the useBossStore)
  const shakeBoss = useBossStore(state => state.toggleShake); //function to shake the boss for damage effect (from the useBossStore)
  const address = useContractStore(state => state.address); 
  
  //Hook to perform a strong slash. Use performStrongSlash() to perform the quick slash
  const { writeAsync:performStrongSlash, isLoading:strongSlashLoading } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'strongSlash',
    args: [], 
    value: parseEther("0"),
    onBlockConfirmation: txnReceipt => {
        console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  //Hook to perform a quick slash. Use performQuickSlash() to perform the quick slash
  const { writeAsync:performQuickSlash, isLoading:quickSlashLoading } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'quickSlash',
    args: [], 
    value: parseEther("0"), 
    onBlockConfirmation: txnReceipt => {
        console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  }); 

  //Hook to perform a normal slash. Use performNormalSlash() to perform the quick slash
  const { writeAsync:performNormalSlash, isLoading:normalSlashLoading } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'normalSlash',
    args: [], 
    value: parseEther("0"),
    onBlockConfirmation: txnReceipt => {
        console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  // Hook to reset the boss's HP resetBoss
  const { writeAsync:resetBoss, isLoading:resetBossLoading } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'resetBossHealth',
    args: [], 
    value: parseEther("0"),
    onBlockConfirmation: txnReceipt => {
        console.log("📦 Transaction Heal blockHash", txnReceipt.blockHash);
    },
  });

  const handleBossAttack = (eventData) => {
    // Update the boss's HP based on the event data
    shakeBoss(); //Shake the boss
    console.log('attacked boss', eventData)
    const newHealth = eventData[eventData.length - 1].args.newHealth
    setBossHp(newHealth);
    if(newHealth <= 0){
      alert('Boss Defeated!')
    }
  };

  // Subscribe to the BossAttacked event
  useScaffoldEventSubscriber({
    contractName: 'YourContract',
    eventName: 'BossAttacked',
    listener: handleBossAttack,
  });

  useScaffoldEventSubscriber({
    contractName: 'YourContract',
    eventName: 'BossHealthReset',
    listener: () => {
      console.log('Boss Healed!', eventData)
      const { newHealth } = eventData.args;
      setBossHp(newHealth);
    },
  });
  
  const performAttack = (skill) => {
    // Will perform an attack based on the skill passed in and shake the boss for effect
    switch (skill) {
      case 0:
        performNormalSlash()
        break;
      case 1:
        performQuickSlash()
        break;
      case 2:
        performStrongSlash()
        break;
      default:
        break;
    }
  }
  
  const { data: newBossHealth } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "bossHealth",
  });

  useEffect(() => {
    if (newBossHealth !== undefined) {
      setBossHp(newBossHealth);
    }
  }, [newBossHealth, setBossHp]);

  return (
    <div className='user-field-container w-full h-full sm:max-w-[600px] md:max-w-[800px] min-h-[250px] ' style={{}} >
      {/* Add hp bar here */}
      <div className="hp-bar-container bg-gray-200 rounded-full mt-5 mr-5 mb-0 ml-5 h-6 relative">
        <div className="bg-red-500 h-6 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${bossHp}%` }}>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white font-bold">
          {bossHp.toString()}%
        </div>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-10">
        <button className="user-field-buttons p-4 hover:bg-blue-700 text-white rounded-md" onClick={()=>{performAttack(0); }}>Normal Slash</button>
        <button className="user-field-buttons p-4 hover:bg-blue-700 text-white rounded-md" onClick={()=>performAttack(1)}>Quick Slash</button>
        <button className="user-field-buttons p-4 hover:bg-blue-700 text-white rounded-md" onClick={()=>performAttack(2)}>Strong Slash</button>
        <button className="user-reset-button p-4 hover:bg-red-700 text-white rounded-md" onClick={resetBoss}>Reset Boss</button>
      </div>
    </div>
  )
}

export default UserField;
/*
    needed:
        HP
        Mana (Ether)
        Attack
        Skills
*/