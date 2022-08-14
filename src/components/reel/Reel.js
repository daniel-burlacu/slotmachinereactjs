import React, { useRef} from "react";
import Constants from "../../Constants";
import {motion} from 'framer-motion';
import Symbol from "../symbols/Symbol";
import './reel.css';

let offset=0;
let generatedReels=0;

const Reel = (props) => {
  //42 symbols
//  const symbols = "DDDGNNSSVVVCCFFRRYYIIJJZZMMOOLLTTPPKKQQAAG";
//const symbols = "DDDGNNSS";
 let reels = [];
  const symbols = Constants.REEL_SYMBOLS;
  let reelSymbols = [];
  let symbolRef = useRef();
  let randomNr= 3;
  let reelIdx=[];
  let reelImg= [];

  const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const sendArrayList = ()=>{
    
    if(reelIdx.length===3){
        props.createArray(reelIdx, reelImg);
    }
    generatedReels++;
  }

  const generatedSymbols =(randomNr)=>{
       let elementPos=-(randomNr/242);

       for(let i=0; i<3;i++){
        reelIdx.push(elementPos+i);
        reelImg.push(reelSymbols[elementPos+i]);
       }
     }

  const getRandomNr = () => {
    if (props.gameOn > 0) {
    randomNr = -(randomBetween(
        (Constants.REELS_REPEAT - 2) * symbols[props.index].length,
        (Constants.REELS_REPEAT - 8) * symbols[props.index].length
      ) * 242);
    }

    if(offset===randomNr){
      getRandomNr();
    }
   else{
        generatedSymbols(randomNr); //modified 
        offset=randomNr;
    }
  };

  if(props.gameOn===0){
      reelSymbols=symbols[props.index].split("");
  }else if(props.gameOn>0){
    reelSymbols= symbols[props.index].repeat(Constants.REELS_REPEAT).split("");
    getRandomNr();
  }  

const createReels = () =>{
  reels=reelSymbols.map((el, idx) => {
      return (
        <Symbol symbol={el} key={idx} index={idx} spin={props.gameOn} />
      );
    })

    return <>{reels}</>
}

const variants = {
  opacity:{
      opacity: 1 
  },
  spin: {
     y:offset,
     opacity:1, 
     transition:{ 
          duration:3, 
          delay:props.index * 0.8 
      },
  },
  exit : { opacity: 1 }
};

return (
  <motion.div className="reel" >
    <motion.div key={props.index} variants={variants}  opacity="initial"  animate="spin" className="icons" ref={symbolRef}>
      {createReels()}{sendArrayList()}
    </motion.div>
  </motion.div>
);
};
export default Reel;



