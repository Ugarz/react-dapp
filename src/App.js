import { useState } from "react";
import { ethers } from "ethers";

import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json"
import logo from './logo.svg';
import './App.css';

const { REACT_APP_CONTRACT_ADRESS } = process.env;

const greeterAdress = REACT_APP_CONTRACT_ADRESS;

function App() {
  const [greeting, setGreetingValue] = useState('')

  // Request the informations from the metamask wallet by asking the user to connect.
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts"})
  }
  async function fetchGreeting() {
    // We're looking for the metamask to be connected to ethereum
    if (typeof window.ethereum !== 'undefined') {
      // Create a new provider
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAdress, Greeter.abi, provider)
      try {
        const dataFromBlockchain = await contract.greet()
        console.log("dataFromBlockchain:", dataFromBlockchain)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      // create another provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // create a signer to sign the transaction
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAdress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      // Wait for the transaction to finish (fast on localhost)
      setGreetingValue('')
      await transaction.wait()
      fetchGreeting()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          onChange={e => setGreetingValue(e.target.value)}
          placeholder="Say hi!"
          type="text"
          value={greeting}
        />
      </header>
    </div>
  );
}

export default App;
