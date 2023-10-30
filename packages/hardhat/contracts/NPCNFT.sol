// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NPCNFT is ERC721 {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  mapping(address => uint256[]) public npcNFTs;

  constructor() ERC721("NPC NFTs", "NPC") {
    _tokenIds.increment();
  }

    function _baseURI() override internal view virtual returns (string memory) {
        return "https://www.npc.institute/npc-day-istanbul-2023/npcs/";
    }

  function mintNPC(address _to) public returns (uint256) {
    uint256 newItemId = _tokenIds.current();
    _mint(_to, newItemId);

    _tokenIds.increment();
    npcNFTs[_to].push(newItemId);
    return newItemId;
  }
}