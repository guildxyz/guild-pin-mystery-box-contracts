// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title A soulbound NFT distributed for the top 100 participants in the Guild Pin campaign on Guild.xyz.
interface IGuildPinMysteryBox {
    /// @notice Mints tokens sequentially for the supplied addresses.
    /// @dev Only callable by the owner.
    /// @param recipients The array of recipients' addresses.
    function batchMint(address[] calldata recipients) external;

    /// @notice Updates the cid for tokenURI.
    /// @dev Only callable by the owner.
    /// @param newCid The new cid that points to the updated image.
    function updateTokenURI(string calldata newCid) external;

    /// @notice Event emitted whenever the cid is updated.
    event MetadataUpdate();

    /// @notice Error thrown when trying to query info about a token that's not (yet) minted.
    /// @param tokenId The queried id.
    error NonExistentToken(uint256 tokenId);
}
