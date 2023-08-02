# GuildPinMysteryBox

A soulbound NFT distributed for the top 100 participants in the Guild Pin campaign on Guild.xyz.

## Variables

### cid

```solidity
string cid
```

The cid for tokenURI.

## Functions

### constructor

```solidity
constructor(
    string name,
    string symbol,
    string _cid
) 
```

Sets metadata.

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `name` | string | The name of the token. |
| `symbol` | string | The symbol of the token. |
| `_cid` | string | The cid used to construct the tokenURI for the token to be minted. |

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

### tokenURI

```solidity
function tokenURI(
    uint256 tokenId
) public returns (string)
```

See {IERC721Metadata-tokenURI}.

#### Parameters

| Name | Type | Description |
| :--- | :--- | :---------- |
| `tokenId` | uint256 |  |

