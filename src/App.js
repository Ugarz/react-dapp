import { useState } from "react";
import { ethers } from "ethers";

import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json"
import logo from './logo.svg';
import './App.css';

const { REACT_APP_CONTRACT_ADRESS } = process.env;

const greeterAdress = REACT_APP_CONTRACT_ADRESS;

function App() {
  const [greeting, setGreetingValue] = useState('')
  const [nextGreeting, setNextGreetingValue] = useState('')
  const [transaction, setTransaction] = useState('')

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
        setGreetingValue(dataFromBlockchain)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function setGreeting(e) {
    e.preventDefault()
    if (!nextGreeting) return;
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()

      // create another provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // create a signer to sign the transaction
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAdress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(nextGreeting)
      console.log(transaction)
      setTransaction(transaction)
      // Wait for the transaction to finish (fast on localhost)
      setNextGreetingValue('')
      await transaction.wait()
      fetchGreeting()
    }
  }

  return (
    <div className="App">
      <header >
        <h1>Say hi to Ethereum Blockchain</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          <button className="App-btn" onClick={fetchGreeting}>Fetch the current greeting</button>
          <form action="">
            <input
              className="App-input"
              onChange={e => setNextGreetingValue(e.target.value)}
              placeholder="Say hi!"
              type="text"
              value={nextGreeting}
              name="userSayHi"
            />
            <label htmlFor="userSayHi">Enter your best greetings!</label>
            <button onClick={setGreeting} type="submit">Send to Blockchain</button>
            {
              greeting &&
                <p>The current greeting is: "{greeting}"</p>
            }
            {nextGreeting &&
              <p>The next phrase will be: "{nextGreeting}"</p>
            }
            {transaction &&
            <>
              <h2>Transaction</h2>
              <ul>
                <li>hash: {transaction.hash}</li>
                <li>from: {transaction.from}</li>
                <li>to: {transaction.to}</li>
                <li>nonce: {transaction.nonce}</li>
                <li>data: {transaction.data}</li>
              </ul>
            </>
            }
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
