var cutoff = 5;
var scoreObject = {};
var scoreArray = [[]];
//------REACT Functions---------------
// Obtain the root 
    const rootElement = document.getElementById('scoreTable')
// Create a ES6 class component    
    class ScoreList extends React.Component { 
  //  getScores()
   //     {
        //    GetScores();
         //   this.forceUpdate();
       // }
       
// Use the render function to return JSX component      
    render() { 
       
     
        var tableitems = []
        var i = 0;
        for (var player in scoreArray)
        {
            console.log(player);
            //tableitems  
            if (i > 0)
                {
            tableitems.push(<tr><td>{i}</td><td>{scoreArray[player][0]}</td><td class="scoreText">{scoreArray[player][1]}</td></tr>)
                }
            i++;
        }
        return (
        <div>
        <table class="table">{tableitems}</table>
        </div>
      );
            
       
    }
        
     
    }
// Create a function to wrap up your component
function App()
        {
  return(
  <div>
      
   <ScoreList name="aName"/>
     
  </div> 
  )
};



// Use the ReactDOM.render to show your component on the browser
    ReactDOM.render(
      <App />,
      rootElement
    )


//SIMBA FUNCTIONS

function GetScores(){
    scoreObject = {};
    scoreArray = [[]];
    
     axios.get('https://api.simbachain.com/v1/shootthatbird/Highscore/?score_gte=' + String(cutoff),{
        headers: {
                'APIKEY' : 'dbeabeb2ea87cf2a6306d9e6579a3f1b5fb516dfba3071aee3848cc08f10fe04'
            }})
            .then(function (response) {
  console.log(response);   
        console.log(response.data["count"]);
         
         if (response.data["count"] > 100)
             {
                 cutoff += Math.floor(cutoff/5)
                 console.log(cutoff);
                 GetScores();
             }
         else
             {
                 var scores = response.data.results;
                 console.log(scores);
                 scores.sort((a,b) => parseFloat(a.payload.inputs.score) - parseFloat(b.payload.inputs.score));
                 
                 for (var obj in scores)
                     {
                         console.log(scores[obj].payload.inputs.score);
                        
                         scoreObject[scores[obj].payload.inputs.useraddress] = scores[obj].payload.inputs.score;
                             
                       
                     }
                 
              
                 
                 for (var obj in scoreObject)
                     {
                         var localscorearray = [obj,scoreObject[obj]];
                        scoreArray.push(localscorearray)
                        
                     }
                    scoreArray.sort((a,b) => parseFloat(b[1]) - parseFloat(a[1]));
                     scoreArray.length = 26;
                 console.log(scoreArray);
                 ReactDOM.render(
                        <App />,
                    rootElement
                    )
             }
 })
}

GetScores();
setInterval(GetScores, 15000);
