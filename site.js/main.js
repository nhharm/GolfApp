var owgrDataRaw = require('./owgrdata.json'); //(with path)
var nextTournament = require('./sandersonfarms.json'); //(with path)

let stringTournament = JSON.stringify(nextTournament);
let tournamentObjects = JSON.parse(stringTournament);

let stringOWGR = JSON.stringify(owgrDataRaw);
let owgrObjects = JSON.parse(stringOWGR);

const posTrendOWGR = []
const negTrendOWGR = []


function tournamentParticipants(){
  tournListtNames = [];

  tournamentObjects.forEach(fieldName => { 
    tournListtNames.push(fieldName.name);
  });

  const owgrField = owgrObjects.filter(player => tournListtNames.includes(player.name));

  console.log(owgrField)
}

owgrObjects.forEach(player => { 
    if (player.ranking - player.lastWeek >= 10){
      posTrendOWGR.push(player)
    }
    if (player.ranking - player.lastWeek <= -10){
      negTrendOWGR.push(player)
    }
});

