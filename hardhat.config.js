require("@nomiclabs/hardhat-waffle");

module.exports = {
    defaultNetwork: "hardhat",
    paths: {
      artifacts: './src/artifacts',
    },
    networks: {
      hardhat: {
        chainId: 1337,
      },
      // ropsten: {
      //   url: "https://ropsten.infura.io/v3/projectid",
      //   accounts: [process.env.a2key]
      // },
      // rinkeby: {
      //   url: "https://rinkeby.infura.io/v3/projectid",
      //   accounts: [process.env.a2key]
      // }
    },
    solidity: "0.8.16",
  };