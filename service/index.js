// const Web3 = require("web3");
const { ethers } = require("ethers");
const OracleAbi = require("./OracleSc.json");

const loadWeb3 = async () => {
  const providers = new ethers.providers.JsonRpcProvider(
    "HTTP://127.0.0.1:8545"
  );
  const oracleContract = new ethers.Contract(
    "0x3eb22260218526C702a9727Dc72117921cb14975",
    JSON.stringify(OracleAbi.abi),
    providers.getSigner(0)
  );
  //   console.log(oracleContract);
  oracleContract.oracleAddress().then((data) => {
    console.log("whitelist:", data);
  });
  return oracleContract;
};

const startServer = async () => {
  let oracleContract = await loadWeb3();
  const writeData = () => {
    console.log("writing data........");
    oracleContract
      .updateWeather("34.5")
      .then(async (tx) => {
        let reciept = await tx.wait(2);
        let latestEvent = reciept.events.pop();
        console.log(latestEvent.args[0]);
        console.log("update weather called");
      })
      .catch((err) => {
        console.log("updating weather failed");
      });
  };
  setInterval(writeData, 3000);
};
startServer();
