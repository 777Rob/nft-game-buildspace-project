const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");

  const gameContract = await gameContractFactory.deploy(
    ["Deadpool", "Snoop Dogg", "Santa"], // Names
    [
      "QmPjTDBnbqbkCoQ2TRXgpZqAiGRTdSG761z1vkitc1yhfs", // Images
      "QmPFwq5hvHTdeHxioRWzx4h85eJGf1p95AuXMZYtWyfest",
      "QmQugRFBJzt7P83kpTPwefqzSxLnBfJa8qXUJR42DCK8Fh",
    ],
    [200, 420, 300], // HP values
    [100, 50, 25], // Attack damage values
    "Voldemort",
    "QmXeuZCc4kko9Ar1LekWQDhQUf4gpawobcFrcE42FaXjKX",
    10000,
    42
  );

  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(1);
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  console.log("Done!");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
