import  React, { useEffect, useState} from "react";
import './mint.css';
import {ethers} from "ethers";

let mintAmount=0;

const Mint = (props) =>{
    const [mintAmount, setMintAmount] = useState(0);
    const [leftToMint, setLeftToMint] = useState(0);
        
    const url="https://vast-ridge-99820.herokuapp.com";


    const howManyNFTsAreLeft = async () =>{
      console.log("We are in howManyNFTsAreLeft")
      let totalNFT="";
      let mintedNFT="";
      try{
        totalNFT = await props.contract.getMaxSupply();
        console.log("totalNFT = "+totalNFT);
        }catch(err){
          console.log("My error is: "+err);
          totalNFT="ERR";
        }
      try{
        mintedNFT= await props.contract.getContractNFTBalance(); 
      }catch(err){
        console.log("Account is "+props.account);
        console.log("Contract balance err is"+err);
        mintedNFT=0;
      }
        let nftLeftToMint = totalNFT - mintedNFT;
        console.log("Left to mint"+leftToMint)
        setLeftToMint(nftLeftToMint);
      }

      const insertWalletIntoDB = async()=>{

        const dataToSend = JSON.stringify({ "wallet": props.account,
                                            "txtype":"mint",
                                            "amount":mintAmount,
                                             });
          const link = url+"/api/insertWallet";
          await fetch(link,{
      //  await fetch('http://localhost:3333/api/insertWallet', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: dataToSend
        })
    
      }

const handleSubmit= async() =>{
  let transaction = "";
  let errorTx= false;
  let contractPaused = await props.contract.paused();
  console.log("We are in the handleSubmit function");
  if(!contractPaused){
    if(mintAmount>0&&mintAmount<1001){
        try{
            const{ethereum}=window;

            if(ethereum){
   
                let cost = await props.contract.cost();
                cost = cost*mintAmount;
                cost = cost.toString();
                var options = { gasLimit: 174860, nonce: 45, value: ethers.utils.parseUnits(cost, 'wei') };
              try{
//                var options = { gasLimit: 174860, nonce: 45, value: ethers.utils.parseUnits(price, 'wei') };
                transaction = await props.contract.mint(mintAmount, options);
              }catch(err){
                errorTx=true;
                alert("Transaction failed, please try again later ! Transaction has been reverted ! ");
              }
              if(!errorTx){
                alert("Minted !! You can see transaction here:" +"<a href="+`https://mumbai.polygonscan.com/tx/${transaction.hash}`+">Transaction</a>");
                insertWalletIntoDB();
                await howManyNFTsAreLeft();
                setMintAmount(0);
              }
             } else{
                alert("Please connect to Metamask or install it if not already done !");
             }   
        }
        catch(err){
           alert("Network is crowded please try again later !");
        }
     

    }else{
      if(mintAmount===0){
        alert("You need to mint at least 1 NFT");
      }else if(mintAmount >1000){
        alert("Holly Molly what do you wanna do ? Hold your horses and leave some for the others too!!! ");
      }else{
        alert("Make sure you insert NUMBERS Only !!!");
      }
    }

}else{
  alert("Contract is PAUSED, you can't mint at this moment, please try again later");
}
}

    useEffect(()=>{

      howManyNFTsAreLeft();
    },[mintAmount])

     useEffect(()=>{
      howManyNFTsAreLeft();
     },[mintAmount])

      return (
        <>
        <div className="div-form">
        <form className="form">
        <label className="label-mint">
             NFT's left to mint:
             <p className="p-welcomeMint">{leftToMint}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
          <label className="form-label">
            Mint Amount:
            <input
              type="text"
              value={mintAmount}
              onChange={e => setMintAmount(e.target.value)}
            />
          </label>
          <label className="label-price">
            Price per/NFT is 10 Matic
            </label>
        </form>
        </div>
     <button className="form-submit-button" onClick={()=>{handleSubmit(mintAmount)}}>Mint</button>
     </>
      );
}

export default Mint;