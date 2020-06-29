const Oracle = artifacts.require("OracleSc");

module.exports = (deployer) => {
  deployer.deploy(Oracle);
};
