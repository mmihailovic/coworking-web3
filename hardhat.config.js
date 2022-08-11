/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle").HardhatUserConfig;
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337 
    }
  }
};
