//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { IGuildPinMysteryBox } from "./interfaces/IGuildPinMysteryBox.sol";
import { SoulboundERC721 } from "./token/SoulboundERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/// @title A soulbound NFT distributed for the top 100 participants in the Guild Pin campaign on Guild.xyz.
contract GuildPinMysteryBox is IGuildPinMysteryBox, Ownable, SoulboundERC721 {
    /// @notice The cid for tokenURI.
    string internal cid;

    /// @notice Sets metadata.
    /// @param name The name of the token.
    /// @param symbol The symbol of the token.
    /// @param _cid The cid used to construct the tokenURI for the token to be minted.
    constructor(string memory name, string memory symbol, string memory _cid) SoulboundERC721(name, symbol) {
        cid = _cid;
    }

    function batchMint(address[] calldata recipients) external onlyOwner {
        uint256 mintedTokens = totalSupply();
        uint256 recipientsLength = recipients.length;

        for (uint256 i; i < recipientsLength; ) {
            _safeMint(recipients[i], mintedTokens + i);

            unchecked {
                ++i;
            }
        }
    }

    function updateTokenURI(string calldata newCid) external onlyOwner {
        cid = newCid;
        emit MetadataUpdate();
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) revert NonExistentToken(tokenId);

        return string.concat("ipfs://", cid);
    }
}
