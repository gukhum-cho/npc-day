// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../packages/hardhat/contracts/NPCNFT.sol";

contract NPCNFTTest is Test {
    NPCNFT npcNft;

    function setUp() public {
        npcNft = new NPCNFT();
    }

    function testMint() public {
        address user1 = vm.addr(1);
        vm.deal(user1, 0.2 ether);        
        npcNft.mintNPC(user1);

        assertEq(npcNft.tokenURI(1), "https://www.npc.institute/npc-day-istanbul-2023/npcs/1");        
    }
}
