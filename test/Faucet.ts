import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Faucet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContracts() {
    // Contracts are deployed using the first signer/account by default
    const [owner, user1] = await ethers.getSigners();

    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();

    const transferAmount = ethers.utils.parseEther("700");
    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    const erc20 = await ERC20Mock.deploy();
    await erc20.mint(faucet.address, transferAmount); // deposit 1000 tokens to faucet

    return { faucet, user1, erc20, transferAmount };
  }

  describe("Deployment", function () {
    it("User1 should get 700 tokens", async function () {
      const { faucet, user1, erc20, transferAmount } = await loadFixture(deployContracts);

      expect(await erc20.balanceOf(user1.address)).to.equal(0)

      await expect(() => faucet.connect(user1).transfer(erc20.address)).to.changeTokenBalances(
        erc20,
        [faucet, user1],
        [transferAmount.mul(-1), transferAmount]
      );
    });
  });
});
