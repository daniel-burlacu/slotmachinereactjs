import React,{ useState} from 'react';
import Constants from '../../Constants';
import bonusWin from '../../assets/sounds/winningBonus.wav'
import Withdrawal from '../withdrawal/Withdrawal'; 
import {ethers} from "ethers";
import PFPRacerNFT from '../../artifacts/contracts/PFPRacerNFT.sol/abi.json'
import './calculatescore.css';
/*
Receiving spinResults={props.resultsArray} 
          spinResultsIdx={props.resultsArrayIdx} 
          myBet={bet} 
          setCallbackScore={callbackScore} 
          game={props.game}
*/

let show = 0;
let fnScr = 0;

const CalculateScore = (props) => {
    const [score, setScore] = useState(2);
    let finalScore=0;
 /*Controling the calculation working score part !!!*********************/
 if(show!==props.game){

    let bet =props.myBet;
    
    
    let spinResults = props.spinResults;
//    let spinResultsIdx = props.spinResultsIdx;

  //  let bet = 0;
    let winningLines = [];
  //  let countWin = 0;
    let symbolSellection = [];
  //  const symbols = Constants.REEL_SYMBOLS;
   

  
   // audioUrlBtn = require("../assets/sounds/buttonPress.wav");
    const audioBtn = new Audio("../../assets/sounds/buttonPress.wav");
  
   // audioUrlSpin = require("../assets/sounds/spinningSlotMachine.wav");
    const audioSpin = new Audio("../../assets/sounds/spinningSlotMachine.wav");

    const audioWinBonus = new Audio(bonusWin);

    const playWinBonus = () =>{
          audioWinBonus.play();
    }

    const handleScore = (e) => {
//        setScore(Math.round((score + e) * 100) / 100);
        console.log("My e in handleScore is:"+e)
        console.log("My score in handleScoreis: "+score);
        let result = score+e;
        finalScore= Math.round((result + Number.EPSILON) * 100) / 100;
        console.log("My finalScore in handleScore is:"+finalScore);
        setScore(finalScore);
      };

    const setMyScore = (e) => {
        let scr = 0;
    
        if (bet > 0 && e > 0) {

        //  scr = e + bet * e;
        if(e<100){
          scr=(bet*e)*10; // (0.2*0.2)=0.04*10 = 0.4
          scr = Math.round((scr + Number.EPSILON) * 100) / 100;
          console.log("My score in e<100 "+scr);
        }else if(e>=100){
            scr=(bet*e)+e; //
            scr = Math.round((scr + Number.EPSILON) * 100) / 100;
            console.log("My score in e>=100 "+scr);
        }
        //  scr = Math.round(scr * 100) / 100;
        // scr=Math.round(scr);
        } else if (bet > 0 && e === 0) {
        //  scr = e + bet * e;
          // scr=(bet*e)*10;
          // scr = Math.round((scr + Number.EPSILON) * 100) / 100;
          scr=0;
          console.log("My score in (bet > 0 && e === 0 "+scr);
        //  scr = Math.round(scr * 100) / 100;
        // scr=Math.round(scr);
        } 
        // else if (bet === 0 && e > 0) {
        //  scr = Math.round((scr + e) * 100) / 100;
       // scr=Math.round(scr+e);
        // }
        //handleScore(scr);
        // let result = score+e;
        // finalScore= Math.round((result + Number.EPSILON) * 100) / 100;

        return scr;
        //setScore(scr);
      };

    const drawScore = (lineNumberType, fool) => {
        let newScore = 0;
        if (fool) {
          lineNumberType = 18;
        }
        switch (lineNumberType) {
          case 0: // top line
            console.log("Case 0: top line");
            newScore = 0.5;
            break;
          case 1: // middle line
            //        audioWin.play();
            console.log("Case 1: middle line");
            newScore = 0.5;
            break;
          case 2: // bottom line
            //        audioWin.play();
            console.log("Case 2: bottom line");
            newScore = 0.5;
            break;
          case 3: // V shape starting bottom left
            //        audioWin.play();
            console.log("Case 3: V shape starting bottom left");
            newScore = 0.2;
            break;
          case 4: // V shape starting bottom right
            //        audioWin.play();
            console.log("Case 4: V shape starting bottom right");
            newScore = 0.2;
            break;
          case 5: // W shape starting top left
            //        audioWin.play();
            console.log("Case 5: W shape starting top left");
            newScore = 0.3;
            break;
          case 6: // M shape starting bottom left
            //        audioWin.play();
            console.log("Case 6: M shape starting bottom left");
            newScore = 0.3;
            break;
          case 7: // M shape on top half
            //        audioWin.play();
            console.log("Case 7: M shape on top half");
            newScore = 0.3;
            break;
          case 8: // W shape on top half
            //        audioWin.play();
            console.log("Case 8: W shape on top half");
            newScore = 0.3;
            break;
          case 9: //W shape on bottom half
            //        audioWin.play();
            console.log("Case 8: W shape on bottom half");
            newScore = 0.3;
            break;
          case 10: // M shape on bottom half
            //        audioWin.play();
            console.log("Case 8: M shape on bottom half");
            newScore = 0.3;
            break;
          case 11: // U shape on top half
            //        audioWin.play();
            console.log("Case 11: U shape on top half");
            newScore = 0.1;
            break;
          case 12: // inverse U shape on top half
            //        audioWin.play();
            console.log("Case 12: inverse U shape on top half");
            newScore = 0.1;
            break;
          case 13: // U shape on bottom half
            //        audioWin.play();
            console.log("Case 13: U shape on bottom half");
            newScore = 0.1;
            break;
          case 14: // inverse U shape on bottom half
            //        audioWin.play();
            console.log("Case 14: inverse U shape on bottom half");
            newScore = 0.1;
            break;
          case 15: // inverse U shape on top half
            //        audioWin.play();
            console.log("Case 15: inverse U shape on top half");
            newScore = 0.1;
            break;
          case 16: // Z shape from top left
            //        audioWin.play();
            console.log("Case 16: Z shape from top left");
            newScore = 0.2;
            break;
          case 17: // Z shape from bottom left
            //        audioWin.play();
            console.log("Case 17: Z shape from bottom left");
            newScore = 0.2;
            break;
          case 18: // JackPot
            //        audioWinBonus.play();
            console.log("Case 18: JackPot");
            playWinBonus();
            newScore = 100;
            break;
          default:
            console.log("Case default: zero");
            newScore = 0;
        }
    
//        setMyScore(newScore);
        
        return newScore;
      };

      const checkFiveFools = () => {
        let fl = false;
       //this has been changed from Constants.LINES.length;
        for (let i = 0; i < Constants.LINES.length; i++) {
          let fool = 0;
          //this has been changed from Constants.LINES[i].length
          for (let j = 0; j < Constants.LINES[i].length; j++) {
            let indexI = Constants.LINES[i][j][0];
            let indexJ = Constants.LINES[i][j][1];
            if (spinResults[indexI][indexJ] === "D") {
              fool++;
            }
          }
     
          if (fool === 5) {
            fl = true;
            winningLines.push(i);
            props.winningLinesCallBack(winningLines, fl);
            drawScore(i, true);
            //  highLightWinningLines(0);
            break;
          }
        }
        return fl;
      }

      const checkFourFools = () => {
        for (let i = 0; i < Constants.LINES.length; i++) {
          let fool = 0;
          for (let j = 0; j < Constants.LINES[0].length; j++) {
            let indexI = Constants.LINES[i][j][0];
            let indexJ = Constants.LINES[i][j][1];
       
            if (spinResults[indexI][indexJ] === "D") {
              fool++;
            }
          }
       
          if (fool === 4) {
            winningLines.push(i);
            drawScore(i, false);
          }
        }
      };

      const checkLinesElements = (symbol) => {
//        countWin++;
        let symNr = 0;
        let fool = 0;
        for (let i = 0; i < Constants.LINES.length; i++) {
          fool = 0;
          symNr = 0;
          for (let j = 0; j < Constants.LINES[i].length; j++) {
            let indexI = Constants.LINES[i][j][0];
            let indexJ = Constants.LINES[i][j][1];
    
            if (spinResults[indexI][indexJ] === "D") {
              fool++;
            }
            if (symbol === spinResults[indexI][indexJ]) {
              symNr++;
            }
          }
          if (fool + symNr === 5 && fool < 4) {
            winningLines.push(i);
          }
        }
        winningLines = uniq(winningLines);
      };
    
      const uniq = (a) => {
        return a.sort().filter(function (item, pos, ary) {
          return !pos || item !== ary[pos - 1];
        });
      };

      const checkElements = () => {
        let fool = 0;
        for (let k = 0; k < 3; k++) {
          fool = 0;
          for (let i = 0; i < spinResults.length; i++) {
            let symb = "";
            for (let j = k; j < spinResults[i].length; j++) {
              if (spinResults[i][j] !== "D") {
                symb = spinResults[i][j];
                j = spinResults[i].length;
              } else {
                fool++;
                j = spinResults[i].length;
              }
            }
            if (fool < 4 && symb !== "") {
              symbolSellection.push(symb);
            }
          }
        }
        for (let i = 0; i < symbolSellection.length; i++) {
          checkLinesElements(symbolSellection[i]);
        }
      };
    
      const setBetZero = () => {
        bet = 0;
      };

      const evaluatespinResults = () => {
        checkFourFools();
        checkElements();
        if (winningLines.length > 0) {
         props.winningLinesCallBack(winningLines, false);
         let fnScore=0;
          for (let i = 0; i < winningLines.length; i++) {
            console.log("My score is "+score);
            let scr = drawScore(winningLines[i], false);
            console.log("My scr in evaluateSpinResults is: "+scr);
            let betScore = setMyScore(scr);
            console.log("My betScore in evaluateSpinResults is: "+betScore);
            fnScore= fnScore+betScore;
          }
          console.log("My fnScore in evaluateSpinResults is:"+fnScore);
          fnScore=fnScore+score;
          finalScore= Math.round((fnScore + Number.EPSILON) * 100) / 100;
        } else {
          if (score - bet >= 0.2) {
          props.looserCallBack();
//            finalScore=Math.round((score - bet) * 100) / 100;
//            setScore(Math.round((score - bet) * 100) / 100);
            console.log("My finalScore in evaluateSpinResults is: "+finalScore);
            let fnScore= score-bet;
            finalScore= Math.round((fnScore + Number.EPSILON) * 100) / 100;
            console.log("My finalScore in evaluateSpinResults after adding score is: "+finalScore);
            if (score < bet) {
              setBetZero();
            }
          } else if (score - bet === 0) {
            finalScore=score-bet;
            setBetZero();
//            setScore(0);
            finalScore=0;
        //CREATE A GAME OVER SET FROM HERE    
            insertToDb();
            props.looserCallBack();

          }
        }
      };

      const insertToDb = async () =>{
        if(typeof window.ethereum !== "undefined"){
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const contractAddr = "0xDFe7ff7386e0C4321Bd1fc7d5f47887C91C7455B";
          const url="https://vast-ridge-99820.herokuapp.com";
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const gasPrice = await provider.getGasPrice();
          const newSigner = provider.getSigner();
//          setAccount(accounts[0]);
          let contract = new ethers.Contract(
                          contractAddr,
                          PFPRacerNFT.abi,
                          newSigner
                        );

                        const dataToSend = JSON.stringify({ "wallet": accounts[0],
                                                            "txtype":"withdrawal",
                                                            "amount":0,
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
          
        }else{
          alert("Please install metamask");
        }
      }

      const checkWin = () => {
        if (props.game > 0) {
          let fool = checkFiveFools();
          if (!fool) {
            evaluatespinResults();
          }
        }
    
      };


/**Testing part  */  
  
setTimeout(()=>{
    //    setScore(scr);
    checkWin();
    setScore(finalScore);
    
    console.log("My score in state is: "+score);
    console.log("My finalScore in state is: "+finalScore);
    props.setCallbackScore(finalScore);
    show=props.game;
},7500)
/**END of testing part */  

/******************************************/  
}

const callbackSetMyScr = (myScr) => {
      if(myScr===0){
        setScore(myScr);

        props.setCallbackScore(myScr);
   //   btnDisable=true;
    }else if(myScr>0){
        setScore(myScr);
        props.setCallbackScore(myScr);
    }
      //score=myScr;
    }

    const callBackGetScore = () => {
      return score;
    }
 
    return (    
      <> 
      <Withdrawal blockWithdraw={props.blockWithdrawal} getScoreCallback={callBackGetScore} setScoreCallBack={callbackSetMyScr}/>
      <label className="label-score">
        Score:<span id="score">{score}</span>
      </label>
    </>  
    )
}


export default CalculateScore;