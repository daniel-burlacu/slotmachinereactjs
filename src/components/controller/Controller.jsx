import React,{useState, useRef} from 'react';
import ScoreBet from '../scorebet/ScoreBet';
import './controller.css'

const Controller = (props) =>{
    const [spinning, setSpinning] = useState(false);
    let bet=2;
    let score=2;
    let refScore = useRef();
    let btnDisable=false;

    const setBetCallBack=(myBet)=>{
        bet=myBet;
    }

    const setScoreCallBack = (myScore) =>{
        score=myScore;
    }
    
    const callbackSpin =()=>{
        if(bet===0){
          window.confirm("Please place a bet to play !");
        }else{
            
            if(!spinning){
              setSpinning(true);
              props.spinReel();
             }
            setTimeout(()=>{
              setSpinning(false);
          },10000)
        }
    }

    return(
      <>
        <div className="controls" ref={refScore}>
        <div
          className={!spinning ? "spin spinning" : "spin"}
          onClick={() => {
            callbackSpin();
          }}
          disabled={spinning} >
          {spinning ? "Spinning..." : "SPIN"}
        </div>
        <ScoreBet block={spinning} resultsArray={props.myResults} resultsArrayIdx={props.myResultsIdx} callBackSetBet={setBetCallBack} callbackSetScore={setScoreCallBack} game={props.game} winningLinesCallBack={props.winningLinesCallBack} looserCallBack={props.looserCallBack}/>    
      </div>
      </>
    )
}

export default Controller;