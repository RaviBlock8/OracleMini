const Web3 = require("web3");
const { ethers } = require("ethers");
const OracleAbi = require("./OracleSc.json");

const loadWeb3 = async () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545")
  );
  //   console.log(web3);
  const providers = new ethers.providers.Web3Provider(web3.eth.currentProvider);
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
      .then((tx) => {
        console.log("update weather called:", tx);
      })
      .catch((err) => {
        console.log("updating weather failed");
      });
  };
  setInterval(writeData, 3000);
};
startServer();
