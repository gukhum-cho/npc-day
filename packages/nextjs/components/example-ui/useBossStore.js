import create from 'zustand';
import { useAnimationConfig, useScaffoldContract, useScaffoldContractRead, useScaffoldEventHistory, useScaffoldEventSubscriber} from "~~/hooks/scaffold-eth";
export const useBossStore = create(set => ({
    isShaking: false,
    bossHp: 100,
    setBossHp: (bossHp) => set({ bossHp }),
    toggleShake: () => {  //animation to make boss shake when receiving damage
        set({ isShaking: true });
        setTimeout(() => set({ isShaking: false }), 1000); // shake for 1 second
    },
}));

