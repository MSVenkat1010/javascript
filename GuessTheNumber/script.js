'use strict';
//Math.trunc(Math.random()*20)+1
const secretNumber = 50

function objectMatch(emoji="?",desc="Start guessing..."){
    return {emotion:emoji,description:desc}
}

//document.querySelector(".message").textContent = "Correct number!";
      
document.querySelector(".check").addEventListener('click', ()=>{
   let guess = Number(document.querySelector(".guess").value)
   let range={};
   if(!guess){
    console.log("⛔️ No Number!")
    range=objectMatch()
   }else{
    let guessRange = Math.abs(secretNumber - guess)
    range = guessRange === 0 ? objectMatch("😀","Found it")
    : guessRange <5 ? objectMatch("🔥","Hotter")
    : guessRange <10 ? objectMatch("🥵","Hot")
    : guessRange <20 ? objectMatch("😶‍🌫️","warmer")
    : guessRange <30? objectMatch("🤧","cold")
    : guessRange <40 ? objectMatch("🥶","colder")
    :objectMatch("☃️","coldest")
    console.log("Guess=>",guess,secretNumber,guessRange)
       }
       console.log(range)
    document.querySelector(".emoji").textContent = range.emotion
    document.querySelector(".message").textContent = range.description


})
/**
 

             50 Hotter 55 Hot 60 warmer 70 cold 80 colder 90> coldest
                  5          10       20      30      40          50
               

 */
