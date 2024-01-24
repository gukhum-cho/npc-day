import React from 'react'
import Image from "next/image"; // Import the 'Image' component
import { useBossStore } from './useBossStore';
export function BossImage() {
    const isBossShaking = useBossStore(state => state.isShaking);
    
    return (
        <Image className={`${isBossShaking ? "shake" : ""} `} src="/assets/The-boss.png" alt="boss" width={500} height={500} /> 
    )
}

