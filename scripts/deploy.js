const hre = require("hardhat");

async function main() {
  const MarketPride = await hre.ethers.getContractFactory("MarketPride");
  const marketPride = await MarketPride.deploy();

  await marketPride.deployed();

  console.log(
    `deployed to ${marketPride.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
