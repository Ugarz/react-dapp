![](https://github.com/Ugarz/react-dapp/blob/main/public/homepage.png?raw=true)

# Dead simple React Dapp
I'm in the crypto universe for several years now, I enjoy the blockchain dev ecosystem for a long time.
By this project aim to explore the `React.js Dapp stack` in a simple and comprehensive repo.

## What are we doing here ?
1. I want to use the Ethereum blockchain to read, store and update data. The client will send new data to store in blockchain from an input.
2. I want to use React.js as the Front-End library to mimic what I already know but twist it a little bit.


# Stack
## Tools
Here you can find a list of tools I will be using to make this work.
|Tool| Description|
|--|--|
|[ethers.js](https://docs.ethers.io/v5/)|Allow you to communicate with blockchain. `Web3.js` is also a good alternative|
|[hardhat](https://hardhat.org/)|Allow you to setup a local env blockchain dev. `Truffle` suite is also a good alternative|
|[chai](https://www.chaijs.com/)|Simple js module for tests purpose|
|[React.js](https://reactjs.org/)| A for Front-End library, barely known but promising|
|[Infura](https://infura.io/)| A Blockchain development Suite, used to deploy to the Ropsten testing network|
|[Ropsten Ethereum Faucet](https://faucet.ropsten.be/)| Allow you to send fake ETH on your wallet on the Ropsten testnet.|


# Getting Started

## Installation
Clone the Front-End repo
```shell
git clone git@github.com:Ugarz/react-dapp.git
cd react-dapp && npm i
```
## Environnement Setup
### Setup a local blockchain
We use **hardhat** to create a local blockchain and use it *(only for dev purpose).*
What you want is to link the React-dapp to your local blockchain, for this you will have to start the *hardhat* blockchain locally with this command:
```bash
npx hardhat # Choose to create a simple project and select the project root.
```
Heads up to the `hardhat.config.js` you see a `module.exports` containing the basic configurations. In the key `paths` you will specify where you want your `artifacts` to appear in your project. Since we are running a React.js Dapp, we want them to be as close as possible to the Front-End code (in `/src`).
```js
module.exports = {
  solidity: "0.8.11",
  paths: {
    artifacts: './src/artifacts',
  }
};
```

Next you will be able to add supports for diffrent networks in a `networks` key. The `chainId` is specific to the way hardhat works.
```js
module.exports = {
  solidity: "0.8.11",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
```
When you have setup the configuration for local blockchain, you will have to generate this artifacts for the Front-End in order to use them in your website.
```bash
npx hardhat compile # Compiles the entire project, building all artifacts
```

### Setup Metamask
Now that you have your local blockchain, you want to get a wallet in your browser to manipulate the smart contracts and connect the Front-End to.

You can [Install Metamask](https://metamask.io/) (available for most of new Browsers).

Now you can link your Metamask to your local network of blockchain.

## Launch
Start a terminal and launch the blockchain
```bash
npx hardhat node # Starts a JSON-RPC server on top of Hardhat Network
```
Deploy the smart contract
```bash
npx hardhat run scripts/deploy.js --network localhost
# You will get a response with the the smart contract address
# Something like 0x5FbDB2315678afecb367f032d93F642f64180aa3
```
1. Fetch the `Private Key` of the first account you created (with 10000 ETH)
2. Import the wallet in your Metamask (be sure to switch your network to localhost).
3.

Start the Front-End with a new terminal
```bash
npm start
```
This should open a [local website on port 3000](http://localhost:3000) in your browser.

## Development
We will import `abi` (application binary interface) in our Front-End application to use the smart contract in our website.


# Resources
- [The Complete Guide to Full Stack Ethereum Development - Tutorial for Beginners (2021) ](https://youtu.be/a0osIaAOFSE)
> What I am building with this project
- [How to Build a Full Stack NFT Marketplace on Ethereum with Polygon and Next.js - 2021 Tutorial](https://youtu.be/GKJBEEXUha0)
> Next resource to see
- [Introduction to Ethers.js (Alternative to Web3)](https://youtu.be/cqdAQK7WOlE)
