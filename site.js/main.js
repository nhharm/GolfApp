var owgrDataRaw = require('./owgrdata.json'); //(with path)
var nextTournament = require('./sandersonfarms.json'); //(with path)
var sgTeeGreenRaw = require('./sgtg.json'); //(with path)

let stringTournament = JSON.stringify(nextTournament);
let tournamentObjects = JSON.parse(stringTournament);

let stringOWGR = JSON.stringify(owgrDataRaw);
let owgrObjects = JSON.parse(stringOWGR);

let sgtegString = JSON.stringify(sgTeeGreenRaw);
let sgTeeGreenObjects = JSON.parse(sgtegString);


/**Sets World Golf Rankings Watermark Positive or Negative Trends */

owgrObjects.forEach(player => { 
  const findRankingChange = player.lastWeek - player.ranking
  /**Finds players who have moved greater then 10 spots up versus previous week in rankings */
  if (findRankingChange >= 10 || findRankingChange<= -10 ){
    player.lastWeek = findRankingChange
  }else{
    player.lastWeek = 0
  }
  /**Finds players who have moved greater then 10 spots DOWN versus previous week in rankings
  if (findRankingChange >=0 || findRankingChange <= 9 || findRankingChange >= -9 ){
    player.lastWeek = 0
  } */
  
});


function tournamentParticipants(){
  tournListtNames = [];
  const owgrField = [];
  
  tournamentObjects.forEach(fieldName => { 
    tournListtNames.push(fieldName.name);
  });

  final = owgrField.concat(owgrObjects.filter(player => tournListtNames.includes(player.name)));
}

function addSgTg(){

 output = final.reduce((a, p) => {
  const uP = sgTeeGreenObjects.find(u => u.name === p.name);
  if (uP) a.push({...p, sgtg:uP.rank});
  return a;
}, []);
}

tournamentParticipants()

/*
owgr = 70
teetogreen = 15
pos=7.5
neg=7.5 
    Let v0=(1/w0),v1=(1/w1),v2=(1/w2),
and let t=v0+v1+v2.
Then simply scale v0,v1,v2 by
u0=(v0/t),u1=(v1/t),u2=(v2/t).


*/

function getWeightedOutput(){
  output.forEach(player => { 
    if(player.ranking >= 1 && player.ranking <= 5 ){ 
      player.ranking = 10;
    }
    if(player.ranking >= 6 && player.ranking <= 20 ){ 
      player.ranking = 9;
    }
    if(player.ranking >= 21 && player.ranking <= 40 ){ 
      player.ranking = 7;
    }
    if(player.ranking >= 41 && player.ranking <= 60 ){ 
      player.ranking = 6;
    }
    if(player.ranking >= 61 && player.ranking <= 80 ){ 
      player.ranking = 5;
    }
    if(player.ranking >= 81 && player.ranking <= 100 ){ 
      player.ranking = 4;
    }
    if(player.ranking >= 101 && player.ranking <= 120 ){ 
      player.ranking = 3;
    }
    if(player.ranking >= 121 && player.ranking <= 150 ){ 
      player.ranking = 2;
    }
    if(player.ranking >= 150){ 
      player.ranking = 1;
    }
  });

  output.forEach(player => { 
    if(player.sgtg >= 1 && player.sgtg <= 10 ){ 
      player.sgtg = 10;
    }
    if(player.sgtg >= 11 && player.sgtg <= 20 ){ 
      player.sgtg = 9;
    }
    if(player.sgtg >= 21 && player.sgtg <= 30 ){ 
      player.sgtg = 8;
    }
    if(player.sgtg >= 31 && player.sgtg <= 40 ){ 
      player.sgtg = 7;
    }
    if(player.sgtg >= 41 && player.sgtg <= 50 ){ 
      player.sgtg = 6;
    }
    if(player.sgtg >= 51 && player.sgtg <= 60 ){ 
      player.sgtg = 5;
    }
    if(player.sgtg >= 61 && player.sgtg <= 70 ){ 
      player.sgtg = 4;
    }
    if(player.sgtg >= 71 && player.sgtg <= 80 ){ 
      player.sgtg = 3;
    }
    if(player.sgtg >= 81 && player.sgtg <= 90 ){ 
      player.sgtg = 2;
    }
    if(player.sgtg >= 91 ){ 
      player.sgtg = 1;
    }
   
  });

}
addSgTg()
getWeightedOutput()
console.log(output)

