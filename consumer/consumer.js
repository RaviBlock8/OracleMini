const Web3 = require("web3");
const { ethers } = require("ethers");
const OracleAbi = require("./OracleSc.json");
const { start } = require("repl");

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

const startService = async () => {
  let oracleContract = await loadWeb3();
  console.log("started listening.....");
  oracleContract.on("WeatherUpdate", (temp, eventObject) => {
    console.log("temprature update:", temp);
  });
};

startService();
