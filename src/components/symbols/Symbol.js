import React, {  forwardRef} from "react";
import Image from "../../assets/images/Images";
import {motion} from "framer-motion";


const Symbol = forwardRef ((props, ref)=> {
  let image = "";
 
  const getImage =  () => {
    if(props.spin>0){
    switch (props.symbol) {
      
      case "A":
        return Image.America;
      case "G":
        return Image.Aragon;
      case "N":
        return Image.Argentina;
      case "S":
        return Image.Assen;
      case "U":
        return Image.Australia;
      case "C":
        return Image.Catalunya;
      case "F":
        return Image.Finland;
      case "R":
        return Image.France;
      case "Y":
        return Image.Germany;
      case "I":
        return Image.Indonesia;
      case "J":
        return Image.Japan;
      case "Z":
        return Image.Jerez;
      case "M":
        return Image.Malaysia;
      case "O":
        return Image.Misano;
      case "L":
        return Image.Mugello;
      case "T":
        return Image.Osterreich;
      case "P":
        return Image.Portugal;
      case "Q":
        return Image.Qatar;
      case "H":
        return Image.Thailand;
      case "K":
        return Image.UK;
      case "D":
        return Image.Fool;
      case "V":
        return Image.Valencia;
      default:
        return Image.Fool;
    }
  }else{
    return Image.Fool;
  }
  };

    image = getImage();


    return (
            <motion.img animate={{opacity:1}}
                      src={image} alt="" value={image}/>
    );

});

export default Symbol;



   //   variants={container} initial="hidden" animate="visible"
