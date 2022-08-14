import React, { useEffect, useState } from "react";
import {ethers} from "ethers";
import "./welcomemessage.css";
import Mint from "../mint/Mint";
import PFPRacerNFT from '../../artifacts/contracts/PFPRacerNFT.sol/abi.json'
import { assert } from "chai";

const WelcomeMessage = (props) =>{
    const [connecting, setConnecting] = useState();
    const [showList, setShowList] = useState(0);
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState("");
    const contractAddr = "0xDFe7ff7386e0C4321Bd1fc7d5f47887C91C7455B";

    const welcomeWallMessage = () => {
        if(welcomeMessage===""){
          return (
            <div className="welcome">
            <div className="div-connect">   
            <h2 className="h2-welcome">Minting Racer NFT Slot Machine</h2>
              <button
                  className={connect ? "connect connecting" : "connect"}
                  onClick={() => {checkConnection()}}
              >Connect to Metamask Wallet</button>
            </div> 
          </div>);
      }else{
                  //insertToDb={props.insertToDb}
        return(
        <div className="welcome">
          <Mint account={account} contract={contract} /> 
          <h2 className="h2-connect">Welcome Player :
            <p className="p-welcomeMessage">{welcomeMessage}</p>
            </h2>
        </div>
        );
      }
      }

      const checkConnection = async() =>{
        if(typeof window.ethereum !== "undefined"){
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
    
            if(accounts[0]!==undefined){
            
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              const newSigner = provider.getSigner();

              let chainId = await newSigner.getChainId();
              if(chainId!==137){
                alert("You are not connected the Correct network please switch to: chainID:137 RPC URL:https://matic-mumbai.chainstacklabs.com");
              }else{
                setWelcomeMessage(accounts);
                setAccount(accounts[0]);
                setContract(
                  new ethers.Contract(
                    contractAddr,
                    PFPRacerNFT.abi,
                    newSigner
                  )
                )
              }
            }else{
              setWelcomeMessage(account);
            }
      }else{
        alert("Metamask not installed !!! Please install metamask in order to place a mint or do a withdrawal !!!");
      }
    }
    
    const connect = async () => {
        if(typeof window.ethereum !== "undefined"){
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
    
          if(accounts[0]===undefined){
            const provider =  new ethers.providers.Web3Provider(window.ethereum);
            const newSigner =  provider.getSigner();
            setAccount(accounts[0]);
            setContract(
              new ethers.Contract(
                contractAddr,
                PFPRacerNFT.abi,
                newSigner
              )
            )
            setWelcomeMessage("Welcome player: "+account+" !");
         }else{
          assert("You already are connected to "+account);
         }
        }else{
          alert("Metamask not installed !!! Please install metamask in order to place a mint or do a withdrawal !!!");
        }
      }

      useEffect(()=>{
        checkConnection();
        welcomeWallMessage();
      },[account])

      return(
        <div>{welcomeWallMessage()}</div>  
      )

}

export default WelcomeMessage;