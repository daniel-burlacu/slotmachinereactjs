import  React, { useEffect, useState} from "react";
import './withdrawal.css';
import {ethers} from "ethers";
import PFPRacerNFT from '../../artifacts/contracts/PFPRacerNFT.sol/abi.json';

const Withdrawal=(props)=>{

    const [rolling, setRolling] = useState(false);
    const [name, setName] = useState("");
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState("");
    let refCode ="";
    const contractAddr="0xDFe7ff7386e0C4321Bd1fc7d5f47887C91C7455B";
    const url="https://vast-ridge-99820.herokuapp.com";
    

    const createSmartKey = async (refCode)=>{
      let hashCode="";

      const dataToSend = JSON.stringify({ "refCode": refCode });
  const link = url+"/api/post_refCode";

  await fetch(link, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:dataToSend
  }).then(response => {
    return response.text();
    }).then(data => {
      hashCode=data;
       }, error => {
      });
      return hashCode;
    }

    const initConnection = async () =>{
      if(typeof window.ethereum !== "undefined"){
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const gasPrice = await provider.getGasPrice();
        const newSigner = provider.getSigner();
        setAccount(accounts[0]);
        setContract(
          new ethers.Contract(
            contractAddr,
            PFPRacerNFT.abi,
            newSigner
          )
        )
      }else{
        alert("Please install metamask");
      }
    }


    useEffect(()=>{
      initConnection();
    },[account]);

  const makeWithdrawal = async(refCode) => {
    
    let withdrawalAmount = Math.floor(props.getScoreCallback());
    let fail=false;
      if(withdrawalAmount > 0){
      window.confirm("GasLimit is set to 174860 WEI,DO NOT CHANGE && Please be aware: if you have 1.2 or 20.2 NFT's you will be able to withdrawal only the integer part of it, like 1 or 2.");
      //await contract.withdrawal(refCode);
      let withdrawalCosts= await contract.getWithdrawalCost();

      let price=withdrawalCosts*withdrawalAmount;
      price = price.toString();
       try{
        // {gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 1000000}
        var options = { gasLimit: 174860, nonce: 45, value: ethers.utils.parseUnits(price, 'wei') };
        await contract.withdrawal(withdrawalAmount,refCode,options);
        
     }catch(err){
       fail=true;
       alert("Network is quite crowded at this this very moment and gas cost's are very high, please try again later !!");
     }
    
    if(!fail){
      insertWalletIntoDB();
      let myScr= props.getScoreCallback()-withdrawalAmount;
      props.setScoreCallBack(myScr);
    }

    }
  }

  const checkWallet = async()=>{
    // /checkUserWallet, setCheckUserWallet
    let results=false;
    const dataToSend = JSON.stringify({ "wallet": account });
    // Send data to the backend via POST
    let link = url+"/api/getWalletVerify";
    await fetch(link, {
//    await fetch('http://localhost:3333/api/getWalletVerify', {
      method: 'POST',
//      mode: 'no-cors', // <---
      headers: {
//        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: dataToSend
    }).then(response => {
      return response.text();
      }).then(data => {

        if(data!=='"0"'){
          results=true;
        }
         }, error => {
        });
    return results;
  }

  const insertWalletIntoDB = async()=>{
    const withdrawalAmount=Math.floor(props.getScoreCallback());

    const dataToSend = JSON.stringify({ "wallet": account,
                                        "txtype":"withdrawal",
                                        "amount":withdrawalAmount,
                                         });
   
      const link = url+"/api/insertWallet";
      await fetch(link,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: dataToSend
    })

  }
  
  const promtRefCode = async()=>{
    let code = prompt("Please enter your refCode:", "RefCode");
    return code;
  }

  const handleSubmit = async() => {
    await initConnection();
    if(account!==""){
      let withdrawalPaused = await contract.getWithdrawalPaused();
      if(!withdrawalPaused){
        let respCheckWallet = await checkWallet();
      if(!respCheckWallet){
          
          if(!props.blockWithdraw){
            let score = Math.floor(props.getScoreCallback());
            if(score>0){
            refCode = await promtRefCode();
              if (refCode === null || refCode === "" || refCode !== "RACECOUPLE2022") {
                let text = "Wrong RefCode ! But you can Mint !";
                window.confirm(text)
              } else {
            //checkAccount and insert to database

              let hashKey = await createSmartKey(refCode);
              
              makeWithdrawal(hashKey);
            }
          }
        }else{
          window.confirm("You need to have at least 1 NFT to withdrawal");
        }
    } else{
      window.confirm("You already had your chance ! But you can still Mint & play !");
    }
  }else{
    alert("Withdrawal has been paused, please try again later !");
  }
  }else{
    alert("Please connect to Metamask !!! Or install Metamask wallet if not already installed in order to place a withdrawal !!!");
  }
};

    return(
    <div
         className={handleSubmit ? "roll rolling" : "roll"}
         onClick={() => {handleSubmit()}}
    >Withdrawal</div>
    )
}

export default Withdrawal;