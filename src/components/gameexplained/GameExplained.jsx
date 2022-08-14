import React, { useRef,useEffect, useState } from "react";
import "./gameexplained.css";
import {motion} from "framer-motion";
import image1 from "../../assets/images/winningPatterns/bottomU.png";
import image2 from "../../assets/images/winningPatterns/bottomLine.png";
import image3 from "../../assets/images/winningPatterns/JackpotLine.png";
import image4 from "../../assets/images/winningPatterns/M.png";
import image5 from "../../assets/images/winningPatterns/middleLine.png";
import image6 from "../../assets/images/winningPatterns/mShapeStarttinBottomLeft.png";
import image7 from "../../assets/images/winningPatterns/topLine.png";
import image8 from "../../assets/images/winningPatterns/uShapeBottomHalf.png";
import image9 from "../../assets/images/winningPatterns/uShapeInverseTopHalf.png";
import image10 from "../../assets/images/winningPatterns/uShapeTopHalf.png";
import image11 from "../../assets/images/winningPatterns/V.png";
import image12 from "../../assets/images/winningPatterns/VupsideDown.png";
import image13 from "../../assets/images/winningPatterns/w.png";
import image14 from "../../assets/images/winningPatterns/wInverse.png";
import image15 from "../../assets/images/winningPatterns/wShapeOnBottomHalf.png";
import image16 from "../../assets/images/winningPatterns/WUpperCase.png";
import image17 from "../../assets/images/winningPatterns/Z.png";
import image18 from "../../assets/images/winningPatterns/ZInverse.png";


const GameExplained = () => {
    const images = [image1, image2, image3, image4, image5, image6,image7,image8,image9, image10, image11,image12, image13,image14,image15, image16, image17, image18];
    const [width, setWidth] = useState(0);
    const carousel = useRef();
    
    useEffect(()=>{
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      },[]);

    return(
        <>
        <div className="winningPatterns">
            <h2 className="h2-title">Winning Patterns and Values</h2>
        </div>
        <motion.div ref={carousel} className="carousel" whileTap={{cursor: "grabbing"}}>
        <motion.div 
          className="inner-carousel"
          drag="x"
          dragConstraints={{right:0, left:-width}}  
        >
          {images.map((image)=>{
            return(
            <motion.div className="item" key={image}>
              <img src={image} alt=""/>
            </motion.div>
            )
          })
          }
        </motion.div>
      </motion.div>
        </>
    )
}

export default GameExplained;