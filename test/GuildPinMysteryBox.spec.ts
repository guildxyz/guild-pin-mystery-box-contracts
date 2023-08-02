import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

// NFT CONFIG
const name = "Guild NFT";
const symbol = "GUILDNFT";
const cids = ["QmPaZD7i8TpLEeGjHtGoXe4mPKbRNNt8YTHH5nrKoqz9wJ", "QmcaGypWsmzaSQQGuExUjtyTRvZ2FF525Ww6PBNWWgkkLj"];

// CONTRACTS
let GuildPinMysteryBox: ContractFactory;
let nft: Contract;

// Test accounts
let wallet0: SignerWithAddress;
let wallet1: SignerWithAddress;
let wallet2: SignerWithAddress;
let wallet3: SignerWithAddress;
let wallet4: SignerWithAddress;
let randomWallet: SignerWithAddress;

describe("GuildPinMysteryBox", () => {
  before("get accounts", async () => {
    [wallet0, wallet1, wallet2, wallet3, wallet4, randomWallet] = await ethers.getSigners();
  });

  beforeEach("deploy contract", async () => {
    GuildPinMysteryBox = await ethers.getContractFactory("GuildPinMysteryBox");
    nft = (await GuildPinMysteryBox.deploy(name, symbol, cids[0])) as Contract;
    await nft.waitForDeployment();
  });

  it("should have initialized the state variables", async () => {
    expect(await nft.name()).to.eq(name);
    expect(await nft.symbol()).to.eq(symbol);
    expect(await nft.owner()).to.eq(wallet0.address);
  });

  it("should be soulbound", async () => {
    await expect(nft.approve(wallet0.address, 0)).to.be.revertedWithCustomError(GuildPinMysteryBox, "Soulbound");
    await expect(nft.setApprovalForAll(wallet0.address, true)).to.be.revertedWithCustomError(
      GuildPinMysteryBox,
      "Soulbound"
    );
    await expect(nft.isApprovedForAll(wallet0.address, randomWallet.address)).to.be.revertedWithCustomError(
      GuildPinMysteryBox,
      "Soulbound"
    );
    await expect(nft.transferFrom(wallet0.address, randomWallet.address, 0)).to.be.revertedWithCustomError(
      GuildPinMysteryBox,
      "Soulbound"
    );
    await expect(
      nft["safeTransferFrom(address,address,uint256)"](wallet0.address, randomWallet.address, 0)
    ).to.be.revertedWithCustomError(GuildPinMysteryBox, "Soulbound");
    await expect(
      nft["safeTransferFrom(address,address,uint256,bytes)"](wallet0.address, randomWallet.address, 0, ethers.ZeroHash)
    ).to.be.revertedWithCustomError(GuildPinMysteryBox, "Soulbound");
  });

  context("#batchMint", () => {
    it("should revert if the tokens are attempted to be minted by anyone but the owner", async () => {
      await expect((nft.connect(randomWallet) as Contract).batchMint([randomWallet.address])).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("should mint tokens for the given addresses", async () => {
      await expect(nft.batchMint([wallet0, wallet1, wallet2, wallet3, wallet4])).to.changeTokenBalances(
        nft,
        [wallet0, wallet1, wallet2, wallet3, wallet4],
        [1, 1, 1, 1, 1]
      );
    });
  });

  context("TokenURI", () => {
    context("#tokenURI", () => {
      it("should revert when trying to get the tokenURI for a non-existent token", async () => {
        await expect(nft.tokenURI(84)).to.revertedWithCustomError(nft, "NonExistentToken").withArgs(84);
      });

      it("should return the correct tokenURI", async () => {
        await nft.batchMint([wallet0.address]);

        const tokenURI = await nft.tokenURI(0);
        const regex = new RegExp(`ipfs://${cids[0]}`);
        expect(regex.test(tokenURI)).to.eq(true);
      });
    });

    context("#updateTokenURI", () => {
      beforeEach("mint a token", async () => {
        await nft.batchMint([wallet0.address]);
      });

      it("should revert if the cid is attempted to be changed by anyone but the owner", async () => {
        await expect((nft.connect(randomWallet) as Contract).updateTokenURI(cids[1])).to.be.revertedWith(
          "Ownable: caller is not the owner"
        );
      });

      it("should update cid", async () => {
        const oldTokenURI = await nft.tokenURI(0);
        await nft.updateTokenURI(cids[1]);
        const newTokenURI = await nft.tokenURI(0);
        expect(newTokenURI).to.not.eq(oldTokenURI);
        expect(newTokenURI).to.contain(cids[1]);
      });

      it("should emit MetadataUpdate event", async () => {
        await expect(nft.updateTokenURI(cids[0])).to.emit(nft, "MetadataUpdate").withArgs();
      });
    });
  });
});
