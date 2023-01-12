var owgrDataRaw = require('./owgr011222.json'); //(with path)
var nextTournament = require('./SonyOpenField.json'); //(with path)
var sgTeeGreenRaw = require('./sgtg011222.json'); //(with path)

let stringTournament = JSON.stringify(nextTournament);
let tournamentObjects = JSON.parse(stringTournament);

let stringOWGR = JSON.stringify(owgrDataRaw);
let owgrObjects = JSON.parse(stringOWGR);

let sgtegString = JSON.stringify(sgTeeGreenRaw);
let sgTeeGreenObjects = JSON.parse(sgtegString);


/**Sets World Golf Rankings Positive or Negative Trends */
function rankingTrendSetter(){
owgrObjects.forEach(player => { 
  const findRankingChange = player.lastWeek - player.ranking
  /**Finds players who have moved greater then 10 up or down the rankings versus previous week in rankings */
  if (findRankingChange >= 5 || findRankingChange<= -5 ){
    player.lastWeek = findRankingChange
  }else{
    player.lastWeek = 0
  }
  
});
}

/**Determines who is playing in this weeks tournament from the World Golf Rankings top 300*/
function tournamentParticipants(){
  tournListtNames = [];
  const owgrField = [];

  /**push the tournament participants from json data to global array and removes dirty data*/
  tournamentObjects.forEach(fieldName => { 
    tournListtNames.push(fieldName.name);
  });
  /**compares OWGRObjects (owgr top 300 list) and filters out anyone who is in the tournament field (tournListNames) and creates new global array*/
  fieldNoStats = owgrField.concat(owgrObjects.filter(player => tournListtNames.includes(player.name)));
}

/**Adds additional shots gained tee to green to this weeks tournament field and creates a new global array*/
function addSgTg(){
 thisWeeksTournamentField = fieldNoStats.reduce((a, p) => {
  const uP = sgTeeGreenObjects.find(u => u.name === p.name);
  if (uP) a.push({...p, sgtg:uP.rank});
  return a;
}, []);
}

/**Creates weighted averages and  for each property for each golfer in the tournament field*/

function getWeightedthisWeeksTournamentField(){
  /**establishes  baseline for owgr ranking*/

  thisWeeksTournamentField.forEach(player => { 
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

  /**shots gained tee to green*/
  thisWeeksTournamentField.forEach(player => { 
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

    /**sets points for positive OWGR Changes*/
    
  thisWeeksTournamentField.forEach(player => { 
      if(player.lastWeek === 5 ){ 
        player.lastWeek = 1;
      }
      if(player.lastWeek === 6 ){ 
        player.lastWeek = 2;
      }
      if(player.lastWeek === 7 ){ 
        player.lastWeek = 3;
      }
      if(player.lastWeek === 8 ){ 
        player.lastWeek = 4;
      }
      if(player.lastWeek === 9 ){ 
        player.lastWeek = 5;
      }
      if(player.lastWeek === 10 ){ 
        player.lastWeek = 6;
      }
      if(player.lastWeek === 11 ){ 
        player.lastWeek = 7;
      }
      if(player.lastWeek === 12 ){ 
        player.lastWeek = 8;
      }
      if(player.lastWeek === 13 ){ 
        player.lastWeek = 9;
      }
      if(player.lastWeek >= 14 ){ 
        player.lastWeek = 10;
      }    
    });

    /**sets points for negative OWGR Changes*/
    thisWeeksTournamentField.forEach(player => { 
      if(player.lastWeek === -5 ){ 
        player.lastWeek = -1;
      }
      if(player.lastWeek === -6 ){ 
        player.lastWeek = -2;
      }
      if(player.lastWeek === -7 ){ 
        player.lastWeek = -3;
      }
      if(player.lastWeek === -8 ){ 
        player.lastWeek = -4;
      }
      if(player.lastWeek === -9 ){ 
        player.lastWeek = -5;
      }
      if(player.lastWeek === -10 ){ 
        player.lastWeek = -6;
      }
      if(player.lastWeek === -11 ){ 
        player.lastWeek = -7;
      }
      if(player.lastWeek === -12 ){ 
        player.lastWeek = -8;
      }
      if(player.lastWeek === -13 ){ 
        player.lastWeek = -9;
      }
      if(player.lastWeek <= -14 ){ 
        player.lastWeek = -10;
      }    
    });
   
}

function calculateFinalRankings(){
  thisWeeksTournamentField.forEach(function (element) {
    element.finalRanking = element.ranking * 0.70 + element.sgtg * 0.20 + element.lastWeek *0.10
  });
  weeklyRankingsOutput = thisWeeksTournamentField.map(player => ({ playerRating: player.finalRanking, Name: player.name }));
  weeklyRankingsOutput.sort(({playerRating:a}, {playerRating:b}) => b-a);
 

};



tournamentParticipants()
rankingTrendSetter()
addSgTg()
getWeightedthisWeeksTournamentField()
calculateFinalRankings()
const WeeklyTop10 = weeklyRankingsOutput.slice(0, 10);
console.log(WeeklyTop10)
