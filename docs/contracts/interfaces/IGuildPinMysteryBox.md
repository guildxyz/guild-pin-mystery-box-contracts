# IGuildPinMysteryBox

A soulbound NFT distributed for the top 100 participants in the Guild Pin campaign on Guild.xyz.

## Functions

### batchMint

```solidity
function batchMint(
    address[] recipients
) external
```

Mints tokens sequentially for the supplied addresses.

Only callable by the owner.

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `recipients` | address[] | The array of recipients' addresses. |

### updateTokenURI

```solidity
function updateTokenURI(
    string newCid
) external
```

Updates the cid for tokenURI.

Only callable by the owner.

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `newCid` | string | The new cid that points to the updated image. |

## Events

### MetadataUpdate

```solidity
event MetadataUpdate(
)
```

Event emitted whenever the cid is updated.

## Custom errors

### NonExistentToken

```solidity
error NonExistentToken(uint256 tokenId)
```

Error thrown when trying to query info about a token that's not (yet) minted.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The queried id. |

