/*This ask the user for their robots name and also establishes variables for healt and attack*/
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//This is the enemy's robot
var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//This is the main fight function
var fight = function(enemyName)  {
    window.alert("Welcome to Robot Gladiators");
    var promptFight = window.prompt("Would you like to Fight or Skip this battle");
    console.log(promptFight);
    //If playeer chooses to fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
         //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemyHealth = enemyHealth - playerAttack;
        //Log a resulting message to the console so we know that it worked.
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        // Check enemy's health
        if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
        }
        else  {
        window.alert(enemyName + " still has " + enemyHealth + " health left!");
        }
        //Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth = playerHealth - enemyAttack;
        //Log a resulting message to the console so we know that it worked.
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

        // check player's health
        if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
        } 
        else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
    //If player chooses to skip
    else if (promptFight === "skip" || promptFight === "SKIP")  {
        //confirm skip
        var confirmSkip = window.confirm("Are you sure you want to quit?");
        //if yes (true), leave game
        if (confirmSkip) {
            window.alert(playerName + " has chosen to skip the fight! Goodbye");
        // apply penalty to money by subtracting 2
        playerMoney = playerMoney - 2;
        console.log(playerMoney);
        }
        //if no re-run fight
        else    {
            fight();
        }
    }
    else    {
        window.alert("You need to choose a valid option. Try again!   ")
    }
}
for(var i = 0; i < enemyNames.length; i++) {
    fight(enemyNames[i]);
  }
