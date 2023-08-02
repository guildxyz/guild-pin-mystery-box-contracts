// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { ERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { IERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

/// @title An enumerable soulbound ERC721.
/// @notice Allowance and transfer-related functions are disabled.
contract SoulboundERC721 is ERC721, ERC721Enumerable {
    /// @notice Error thrown when a function's execution is not possible, because this is a soulbound NFT.
    error Soulbound();

    // solhint-disable-next-line no-empty-blocks
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    /// @inheritdoc ERC721Enumerable
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721Enumerable, ERC721) returns (bool) {
        return interfaceId == type(IERC721Enumerable).interfaceId || super.supportsInterface(interfaceId);
    }

    function approve(address /* to */, uint256 /* tokenId */) public virtual override(IERC721, ERC721) {
        revert Soulbound();
    }

    function setApprovalForAll(address /* operator */, bool /* approved */) public virtual override(IERC721, ERC721) {
        revert Soulbound();
    }

    function isApprovedForAll(
        address /* owner */,
        address /* operator */
    ) public view virtual override(IERC721, ERC721) returns (bool) {
        revert Soulbound();
    }

    function transferFrom(
        address /* from */,
        address /* to */,
        uint256 /* tokenId */
    ) public virtual override(IERC721, ERC721) {
        revert Soulbound();
    }

    function safeTransferFrom(
        address /* from */,
        address /* to */,
        uint256 /* tokenId */
    ) public virtual override(IERC721, ERC721) {
        revert Soulbound();
    }

    function safeTransferFrom(
        address /* from */,
        address /* to */,
        uint256 /* tokenId */,
        bytes memory /* data */
    ) public virtual override(IERC721, ERC721) {
        revert Soulbound();
    }

    /// @dev Still used for minting/burning.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal virtual override(ERC721Enumerable, ERC721) {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }
}
