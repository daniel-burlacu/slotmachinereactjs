
const Constants = {
    MAX_HEIGHT: 800,
    MAX_WIDTH: 1200,
    REEL_WIDTH:240,
    REEL_HEIGHT:800,
    REELS: 5,
    SYMBOLS: 3,
    REELS_REPEAT:10,
//winning lines
REEL_SYMBOLS:[
  "DDDGNNTTSSJJJPPNNVVYYAASSDDDNNNSSSDDD",
  "DDDYYNNJJJAAYYSTDDDVVGNNGGTTPPPAAADDD",
  "DDDAVVYYNNJJJTTVVPSSDDDVYYGGSSSYYYDDD",
  "DDDVVSSTTYYTPADDDNNAAJJJAAVVPPPSSSDDD",
  "DDDJJJTAPPPYYVNADDDPPTTSAASSTTTVVVDDD"
], 
/*
REEL_SYMBOLS:[
  "AAGGNNSSVVVCCFFRRYYIIJJZZMMOOLLTTPPBBQQDDD",
  "QQPPPTTLLOOOMMZZZJJJBBBIIYRRFCCVSSNNGAADDD",
  "CCCFFFFRRRRYIJJJJZZZAAAAGGGBBNNSVMOLTPQDDD",
  "JJIIIYYYRFCVQQQPPPTTTLLLOOOBBBMMMMZSNGADDD",
  "LLLLOOOOMBZSSSSNNNNGGGGAJIYYYYRFFFCVQPTDDD",
  "OMZSNGAJIYYYBBBRRRFFFFCCCVQQQPPPPTTTLLLDDD"
], 


REEL_SYMBOLS:[
  "DDDGNNSSVV",
  "DDDAAVVGNN",
  "DDDAVVPSSV",
  "DDDVVTPANN",
  "DDDTAPATTS"
], 

REEL_SYMBOLS:[
  "DDDDDDSSVV",
  "DDDADDVDNN",
  "DDDADDPDSV",
  "DDDVDDPDNN",
  "DDDTDDADTS"
],



 
    */ 
    LINES: [
      //0
        [
          [0,0],[1,0],[2,0],[3,0],[4,0] // top line +3
        ],
      //1  
        [
          [0,1],[1,1],[2,1],[3,1],[4,1] //middle line +3
        ],
      //2  
        [
          [0,2],[1,2],[2,2],[3,2],[4,2] //bottom line +3
        ],
      //3  
        [
          [0,0],[1,1],[2,2],[3,1],[4,0] //V shape starting bottom left +1
        ],
      //4  
        [
          [0,2],[1,1],[2,0],[3,1],[4,2] //V shape starting bottom right +1
        ],
      //5  
        [
          [0,0],[1,2],[2,0],[3,2],[4,0] // W shape starting top left +2
        ],
      //6  
        [
          [0,2],[1,0],[2,2],[3,0],[4,2] // M shape starting bottom left +2
        ],
      //7  
        [
          [0,1],[1,0],[2,1],[3,0],[4,1] // M shape on top half +2
        ],
      //8  
        [
          [0,0],[1,1],[2,0],[3,1],[4,0] // W shape on top half +2
        ],
      //9  
        [
          [0,1],[1,2],[2,1],[3,2],[4,1] // W shape on bottom half +2
        ],
      //10  
        [
          [0,2],[1,1],[2,2],[3,1],[4,2] // M shape on bottom half +2
        ],
      //11  
        [
          [0,0],[1,1],[2,1],[3,1],[4,0] // U shape on top half +3
        ],
      //12  
        [
          [0,1],[1,2],[2,2],[3,2],[4,1] // U shape on bottom half +3
        ],
      //13  
        [
          [0,2],[1,1],[2,1],[3,1],[4,2] // inverse U shape on bottom half +2
        ],
      //14  
        [
          [0,1],[1,0],[2,0],[3,0],[4,1] // inverse U shape on top half +2
        ],
      //15  
        [
          [0,0],[1,0],[2,1],[3,2],[4,2] // Z shape from top left +1
        ],
      //16  
        [
          [0,2],[1,2],[2,1],[3,0],[4,0] // Z shape from bottom left +1
        ],
    ]

  };


export default Constants;
