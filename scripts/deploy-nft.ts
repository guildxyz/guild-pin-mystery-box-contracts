import { ethers } from "hardhat";

// CONFIG
const name = ""; // The name of the token.
const symbol = ""; // The short, usually all caps symbol of the token.
const cid = ""; // The cid that will be returned by the tokenURI.

async function main() {
  const GuildPinMysteryBox = await ethers.getContractFactory("GuildPinMysteryBox");
  const guildPinMysteryBox = await GuildPinMysteryBox.deploy(name, symbol, cid);

  const network = await ethers.provider.getNetwork();
  console.log(`Deploying contract to ${network.name !== "unknown" ? network.name : network.chainId}...`);
  console.log(`Tx hash: ${guildPinMysteryBox.deploymentTransaction()?.hash}`);

  await guildPinMysteryBox.waitForDeployment();

  console.log("GuildPinMysteryBox deployed to:", await guildPinMysteryBox.getAddress());
  console.log("Constructor arguments:", name, symbol, cid);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
