// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract InsureAssets is Ownable {
    constructor() Ownable(msg.sender) {}

    struct ItemHistory {
        string item;
        uint timestamp;
    }


    mapping(address => ItemHistory[]) public bankVault;

    // Function that hashes the strings 
    function hashString(string memory _item) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_item));
    }

    // Function to get insurance for the user
    function getInsurance(string memory _item) public {
        require(bankVault[msg.sender].length == 0, "You are already insured.");

        bankVault[msg.sender].push(ItemHistory({
            item: _item,
            timestamp: block.timestamp
        }));

    }

    // Function to update the insurance items and append timestamp
    function updateInsurance(string memory _item) public {
        require(bankVault[msg.sender].length > 0, "You are not insured yet.");

        bankVault[msg.sender].push(ItemHistory({
            item: _item,
            timestamp: block.timestamp
        }));
    }

    // Function to verify if the input matches the latest stored items
    function verifyItems(string memory _item) public view returns (bool) {
        require(bankVault[msg.sender].length > 0, "You are not insured yet.");

        uint lastIndex = bankVault[msg.sender].length - 1;
        if (hashString(_item) == hashString(bankVault[msg.sender][lastIndex].item)) {
            return true; 
        } else {
            revert("Items do not match the stored record.");
        }
    }

    // Function to allow only the owner to verify items for a specific address
    function ownerVerify(string memory _item, address _name) public view onlyOwner returns (bool) {
        require(bankVault[_name].length > 0, "This person is not insured yet.");

        uint lastIndex = bankVault[_name].length - 1;
        if (hashString(_item) == hashString(bankVault[_name][lastIndex].item)) {
            return true; // Items match
        } else {
            revert("Items do not match the stored record.");
        }
    }

    // Function that only the owner can call to show items and timestamps for a specific user
    function viewInsuranceRecord(address _name) public view onlyOwner returns (ItemHistory[] memory) {
        // Ensure the address is insured
        require(bankVault[_name].length > 0, "This person is not insured yet.");


        return bankVault[_name];
    }
}



