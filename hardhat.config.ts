import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';
dotenv.config()

const accounts = [
  process.env.DEPLOYER || '',
]

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    // get rpc url from: https://chainlist.org/?search=fantom&testnets=true
    fantomTestnet: {
      url: "https://rpc.ankr.com/fantom_testnet",
      accounts: accounts,
    }
  }
};

export default config;
