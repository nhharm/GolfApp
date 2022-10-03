var owgrDataRaw = require('./owgrdata.json'); //(with path)
var nextTournament = require('./sandersonfarms.json'); //(with path)
var sgTeeGreenRaw = require('./sgtg.json'); //(with path)

let stringTournament = JSON.stringify(nextTournament);
let tournamentObjects = JSON.parse(stringTournament);

let stringOWGR = JSON.stringify(owgrDataRaw);
let owgrObjects = JSON.parse(stringOWGR);

let sgtegString = JSON.stringify(sgTeeGreenRaw);
let sgTeeGreenObjects = JSON.parse(sgtegString);

const posTrendOWGR = [];
const negTrendOWGR = [];




owgrObjects.forEach(player => { 
  if (player.ranking - player.lastWeek >= 10){
    posTrendOWGR.push(player)
  }
  if (player.ranking - player.lastWeek <= -10){
    negTrendOWGR.push(player)
  }
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
/**if(final.filter(({ name: id1 }) => !sgTeeGreenObjects.some(({ name: id2 }) => id2 === id1))){
  console.log(true)
 myArrayFiltered = final.filter((el) => {
  return sgTeeGreenObjects.some((f) => {
    return f.name === el.name ;
  });
});**/
 output = final.reduce((a, p) => {
  const uP = sgTeeGreenObjects.find(u => u.name === p.name);
  if (uP) a.push({...p, sgtg:uP.rank});
  return a;
}, []);
console.log(output)
}

tournamentParticipants()
addSgTg()
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
    let owgrVal = player.rank;
    let shotsGainedVal = player.sgtg;
  });
}
