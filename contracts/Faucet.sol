// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IERC20 {
    function decimals() external returns (uint8);

    function transfer(address to, uint256 amount) external returns (bool);
}

contract Faucet {
    function transfer(address _tokenAddr) public {
        uint _decimals = IERC20(_tokenAddr).decimals();
        uint _amount = 700 * (10 ** _decimals);
        IERC20(_tokenAddr).transfer(msg.sender, _amount);
    }
}
