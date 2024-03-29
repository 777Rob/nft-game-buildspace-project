// https://i.imgur.com/asYRfns.jpeg

const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Deadpool", "Snoop Dogg", "Santa"], // Names
    [
      "https://i.imgur.com/R076K0l.jpeg", // Images
      "https://i.imgur.com/v5mfoCg.jpeg",
      "https://i.imgur.com/PkiNC76.jpeg",
    ],
    [200, 420, 300], // HP values
    [100, 50, 25], // Attack damage values
    "Voldemort",
    "https://i.imgur.com/asYRfns.jpeg",
    10000,
    42
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);

  txn = await gameContract.mintCharacterNFT(0);
  await txn.wait();
  console.log("Minted NFT #1");

  txn = await gameContract.mintCharacterNFT(1);
  await txn.wait();
  console.log("Minted NFT #2");

  console.log("Done deploying and minting!");

  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();
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
