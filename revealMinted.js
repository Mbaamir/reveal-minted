
const revealMintedListener = async () => {
  const fs = require("fs");
  const Web3 = require("web3");
  const contractConfig = require("./contractConfig.json");

  const contractMetadata = require("./MbaamirToken.json");
  const contractAbi = contractMetadata.output.abi; //needed if Metadata contains, but is not ABI

  const contractAddress = contractConfig.contractAddress;

  const provider = contractConfig.alchemyRopstenProvider;
    

  const web3 = await new Web3(provider);

  const MbaamirContract = await new web3.eth.Contract(
    contractAbi,
    contractAddress
  );

  console.log("Starting revealMintedListener");

  async function revealMintedListenerFunc() {
    MbaamirContract.events.Transfer(
      {
        filter: {
          from: 0x0000000000000000000000000000000000000000000000000000000000000000,
        },
        fromBlock: "earliest",
      },
      function (error, events) {
        let mintedId = events.returnValues.tokenId;
        console.log(mintedId, "minted");

        let mintedFileExists = fs.existsSync(
          `${__dirname}/hidden/media/${mintedId}.jpg`
        );

        if (mintedFileExists) {
          fs.rename(
            `${__dirname}/hidden/media/${mintedId}.jpg`,
            `${__dirname}/public/media/${mintedId}.jpg`,
            function (error) {
              if (error) {
                console.error;
              } else console.log(`Revealed ${mintedId}`);
            }
          );
        } else {
          console.log(`${mintedId} does not exist in Hidden`);
        }
      }
    );
  }
  revealMintedListenerFunc();
};

module.exports = revealMintedListener;
