require("@nomicfoundation/hardhat-toolbox");
const fs = require("fs");
const privateKey = fs.readFileSync('secret.txt').toString();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    hardhat: {
      chainId: 4202
    },
    BitTorrent: {
      url: 'https://pre-rpc.bt.io/',
      accounts: [privateKey],
      gasPrice: 1000000000,
    }
  },
  solidity: "0.8.27",
  allowUnlimitedContractSize: true,
  throwOnTransactionfailure: true,
  throwOnCallFailures: true,
  loggingEnabled: true,
};