import React, { useState } from "react";
import Bet from './Bet';
import CalculateScore from '../calculatescore/CalculateScore';


let bet=0;

const ScoreBet = (props) => {

  const [score, setScore] = useState(2);
  
  const callbackBet = (e) => {   
      bet=e;
      props.callBackSetBet(e);
  }

  const callbackScore = (scr) => {
   
      setTimeout(()=>{
        console.log("My score in callback is :"+scr);
        setScore(scr);
      },350)

  }

  return (
    <>
      <Bet block ={props.block} score={score} setBet={callbackBet} />
      <CalculateScore spinResults={props.resultsArray} blockWithdrawal ={props.block} spinResultsIdx={props.resultsArrayIdx} myBet={bet} callbackSetBet={callbackBet} setCallbackScore={callbackScore} game={props.game} winningLinesCallBack={props.winningLinesCallBack} looserCallBack={props.looserCallBack}/>
    </>
  );
};
export default ScoreBet;
