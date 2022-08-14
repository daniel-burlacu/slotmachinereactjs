import React, { useRef,useEffect, useState } from "react";
import {ethers} from "ethers";
import ReelSet from "./components/reelset/ReelSet";
import "./assets/css/App.css";
import { assert } from "chai";
//import GameScoreCarousels from './components/gamescorecarousel/GameScoreCarousel';
import GameExplained from './components/gameexplained/GameExplained';
import WelcomeMessage from './components/welcomemessage/WelcomeMessage';
import ExportYoutubeVideo from './components/youtubeembeded/ExportYoutubeVideo'

const App = () => {
  const [spin, setSpin] = useState(0);
  const [showList, setShowList] = useState(0);
  const [widthCarousel, setWidthCarousel] = useState(0);
  const carousel = useRef();
    
  const callbackSetSpin = (spin) => {
    setSpin(spin);
  };

  const callBackShowWin = () => {
    setShowList(1);
  };

  return (
    <div className="game">
      <div className="game__container">
      <WelcomeMessage />
      <ReelSet
        runGame={spin}
        spinCallback={callbackSetSpin}
        showWinCallback={callBackShowWin}
      />
      <GameExplained/>
      <ExportYoutubeVideo/>
      </div>
      
    </div>
    
  );
};
export default App;
