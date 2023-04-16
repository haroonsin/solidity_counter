// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Counter {
    string public name;
    uint public value;

    constructor(string memory _label, uint _initialCount) {
        name = _label;
        value = _initialCount;
    }

    function getCount() public view returns (uint) {
        return value;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function increment() public returns (uint newCount) {
        value++;
        return value;
    }

    function decrement() public returns (uint newCount) {
        value--;
        return value;
    }

    function updateName(
        string memory _newName
    ) public returns (string memory newName) {
        name = _newName;
        return name;
    }
}
