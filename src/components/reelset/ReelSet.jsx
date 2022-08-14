import React, { useEffect, useRef, useState} from "react";
import Constants from "../../Constants";
import "./reelset.css";
import Reel from "../reel/Reel";
import  Controller from '../controller/Controller'
import spinSound from '../../assets/sounds/spinningSlotMachine.wav';
import winBet from '../../assets/sounds/coinsHandling.wav';
import loosing from '../../assets/sounds/loosing.wav';

let timer;

const ReelSet = (props) => {
  const [gameOn, setGameOn] = useState(0);
  let zeroGame= 0;
  let refLights = useRef();
  let refWinning = useRef();

  let spinResultsIdx = [];
  let spinResults = [];
  let winningResults=[];

  const audioSpin = new Audio(spinSound);
  const audioWin = new Audio(winBet);
 
  const audioLoosing = new Audio(loosing);

  const playLoosing = () => {
    audioLoosing.play();
};

  const playWinBet = () => {
        audioWin.play();
  };



  const play = () => {
      audioSpin.play();
    };

  const blurResults = () =>{    
    if(spinResultsIdx.length===5){
      for(let i=0; i<5;i++){
        setTimeout(()=>{
        for(let j=0; j<spinResultsIdx.length;j++){
          for(let k=i; k<5;k++){
            let imagePoz=spinResultsIdx[k][j];
// /            console.log("My childElementCount is: "+refLights.current.childNodes[i].childNodes[0].childElementCount);
//            console.log("My blurring image is: "+refLights.current.childNodes[i].childNodes[0].attributes[3].baseUri);
            refLights.current.childNodes[i].childNodes[0].childNodes[imagePoz].attributes[3].value="opacity: 0.3";
          }
        
        }
      },4500+(i*500))
      } 
   
    }
  }

const callbackCreateArray = (reelIdx, reel) => {
  spinResults.push(reel);
  spinResultsIdx.push(reelIdx);
  blurResults();
}

useEffect(()=>{
// "timer" will be undefined again after the next re-render
  return () => clearTimeout(timer);
},[])

const callBackLooser = () => {
  refWinning.current.innerHTML="Hahaha You've lost !!! &#10040;&#10040;&#10040;&#10040;&#10040; HaHaHa You've lost !!!";
  playLoosing();
}

const highLightWinningLines = (jackpot) =>{
  if(jackpot){
    refWinning.current.innerHTML="YOU WON! &#127775; JACKPOT &#127775; YOU WON!";
  }else{
    refWinning.current.innerHTML="YOU WON! &#127775;&#127775;&#127775;&#127775;&#127775; YOU WON!";
  }
  for(let i=0; i<winningResults.length;i++){
    let lineNr=winningResults[i]


//    for(let j=0; j<Constants.LINES[i].length;j++){
//  setTimeout(()=>{
  for(let j=0; j<Constants.LINES[lineNr].length;j++){
       let indexI=(Constants.LINES[lineNr])[j][0];
       let indexJ=(Constants.LINES[lineNr])[j][1];

      let imagePoz=(spinResultsIdx[indexI])[indexJ];
      // setTimeout(()=>{
      //   refLights.current.childNodes[j].childNodes[0].childNodes[imagePoz].attributes[3].value="opacity: 0.3";
      // },6000+(j*400))
        setTimeout(()=>{
          playWinBet();
          refLights.current.childNodes[j].childNodes[0].childNodes[imagePoz].attributes[3].value="opacity: 1";
          setTimeout(()=>{
            refLights.current.childNodes[j].childNodes[0].childNodes[imagePoz].attributes[3].value="opacity: 0.3";
          },2000)
        },3000+(i*3000))
     
    } 
  }


}


const callbackWinningResults =(winningLines, jackpot) =>{
  winningResults=winningLines;
  highLightWinningLines(jackpot);
}

  const renderReels = () => {
    let reelList = Array.apply(null, Array(Constants.REELS)).map((el, idx) => {
      return <Reel reel={el} key={idx} index={idx} gameOn={gameOn} createArray={callbackCreateArray}/>;
    });
    
    return <>{reelList}</>;
  };  

 const calbackZeroGame = ()=>{
  zeroGame=false;
 } 

  const callBackSpinReel = () => {
      refWinning.current.innerHTML=" &#127775;&#127775;&#127775; Jackpot: <span>100</span>  &#127775;&#127775;&#127775;"
      play();
      setGameOn(gameOn+1);  
  }; 

  return (
    <div className="main__reelset">
    <div className="jackpot" ref={refWinning}>
   <h2> &#127775;&#127775;&#127775; Jackpot: <span>100</span>  &#127775;&#127775;&#127775;</h2>
  </div>
      <div className="container" >
        <div className="playContainer">
          <div className="reelSet"  ref={refLights}>
            {renderReels()}
          </div>
        </div>
      </div>
      <Controller spinReel={callBackSpinReel} zeroGame={calbackZeroGame} myResults={spinResults} myResultsIdx={spinResultsIdx} game={gameOn} winningLinesCallBack={callbackWinningResults} looserCallBack={callBackLooser}/> 
      </div>
  );
};

export default ReelSet;

/**
 * 
 * div =0 , spinResultsIdx[0]
My winning line is 0,0, 1,0, 2,0, 3,0, 4,0
My winning line is 0,1,1,1,2,1,3,1,4,1
My winning line is 0,2,1,2,2,2,3,2,4,2
My winning line is 0,0,1,1,2,2,3,1,4,0
My winning line is 0,2,1,1,2,0,3,1,4,2
My winning line is 0,0,1,2,2,0,3,2,4,0
My winning line is 0,2,1,0,2,2,3,0,4,2
My winning line is 0,1,1,0,2,1,3,0,4,1
My winning line is 0,0,1,1,2,0,3,1,4,0
My winning line is 0,1,1,2,2,1,3,2,4,1
My winning line is 0,2,1,1,2,2,3,1,4,2
My winning line is 0,0,1,1,2,1,3,1,4,0
 * 
 */