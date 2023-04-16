import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", () => {

    let counter;

    beforeEach(async () => {
        const Counter = await ethers.getContractFactory("Counter"); // Ethers contract
        counter = await Counter.deploy("APR Counter", 1); // Deployed smart contract
    })

    describe("Deployment", () => {
        it("Should set the iniital count", async () => {
            expect(await counter.value()).to.equal(1); // Count read from blockchain
        })


        it("Should set the iniital name", async () => {
            expect(await counter.name()).to.equal("APR Counter"); // Name read from blockchain
        })
    })

    describe("Counting", () => {
        let transaction;
        it("Should increment the count", async () => {
            transaction = await counter.increment();
            await transaction.wait();
            transaction = await counter.increment();
            await transaction.wait();
            expect(await counter.value()).to.equal(3);
        })

        it("Should decrement the count", async () => {
            transaction = await counter.decrement();
            await transaction.wait();
            expect(await counter.value()).to.equal(0);
        })

        it("Should throw error on decrement() call for value below zero", async () => {
            transaction = await counter.decrement();
            await transaction.wait();
            await expect(counter.decrement()).to.be.reverted;
        })
    })

    describe("Reading", () => {
        it("Should read from public 'value' variable", async () => {
            expect(await counter.value()).to.equal(1);
        })
        it("Should read from  'getCount' function", async () => {
            expect(await counter.getCount()).to.equal(1);
        })
        it("Should read from public 'name' variable", async () => {
            expect(await counter.name()).to.equal("APR Counter");
        })
        it("Should read from  'getName' function", async () => {
            expect(await counter.getName()).to.equal("APR Counter");
        })
    })

    describe("Update", () => {
        it("Should update the name", async () => {
            let transaction = await counter.updateName("Hola Madrid");
            transaction.wait();
            expect(await counter.name()).to.equal("Hola Madrid");
        })
    })

})