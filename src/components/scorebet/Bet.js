import React,{useState} from 'react';
import './setbet.css';

const Bet = (props) => {

const [bet, setBet] = useState(0);


if(props.score===0 && bet>0){
    setBet(0);
}
  
const increaseBet = () => {
if(!props.block){
    if (bet < props.score - 0.2 && props.score !== 0) {
        setBet(Math.round((bet + 0.2) * 100) / 100);
    } else {
        setBet(props.score);
        }
}
};
//needs to be fixed
const decreaseBet = () => {
    if(!props.block){
        if (bet >= 0.2 && props.score !== 0) {
        
            setBet(Math.round((bet - 0.2) * 100) / 100);
            
        } else if (bet === props.score && props.score !== 0) {
            setBet(Math.round((props.score - 0.2) * 100) / 100);
        }
}
};

return(
    <>
    <button
        className="setBet"
        onClick={()=> increaseBet()}
        //  disabled={state.disabled}
      >{props.setBet(bet)}
        +
    </button>
    <div className={!bet ? "bet rolling" : "bet"}>Bet:{bet}</div>
    <button
        className="setBet"
        onClick={()=>decreaseBet()}
        //  disabled={this.state.disabled}
      >{props.setBet(bet)}
        -
    </button >
    </>
    );
}

export default Bet;