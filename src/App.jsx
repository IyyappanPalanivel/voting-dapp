import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Home from './frontend/screens/Home';
import { useState } from 'react';
import Navigation from './frontend/components/Navbar';
import './App.css';
import AddCandidates from './frontend/screens/AddCandidates';
import VotersList from './frontend/screens/VotersList';
import AddVoter from './frontend/screens/AddVoter';
import { ethers } from 'ethers';
import VotingSystemAddress from './frontend/contractsData/VotingSystem-address.json'
import VotingSystemAbi from './frontend/contractsData/VotingSystem.json'

export default function App() {

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [votingSystem, setVotingSystem] = useState(null);


  //MetaMask Login/Connect 
  const web3Handler = async () => {

    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0])
      // Get provider from Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // Set signer
      const signer = provider.getSigner()

      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      })

      window.ethereum.on('accountsChanged', async function (accounts) {
        setAccount(accounts[0])
        await web3Handler()
      })
      loadContracts(signer)
    } else {
      alert('Install MetaMask Wallet')
    }
  }

  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const votingsystem = new ethers.Contract(VotingSystemAddress.address, VotingSystemAbi.abi, signer)
    setVotingSystem(votingsystem);
    setLoading(false);

    //console.log('app',await votingsystem.getVotersList())
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation web3Handler={web3Handler} account={account} />
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Spinner animation="border" style={{ display: 'flex' }} />
            <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={
              <Home votingSystem={votingSystem} account={account}/>
            } />
            <Route path="/add-candidate" element={
              <AddCandidates votingSystem={votingSystem} />
            } />
            <Route path="/voters-list" element={
              <VotersList votingSystem={votingSystem}/>
            } />
            <Route path="/add-voter" element={
              <AddVoter votingSystem={votingSystem}/>
            } />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  )
}