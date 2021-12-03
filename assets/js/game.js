//Game COde

//random number generation
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() *(max - min + 1) + min);
  return value;
};

var fightOrSkip = function() {
  // ask player if they'd like to fight or run
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // validate prompt answer
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    // use return to call it again and stop the rest of this function from running
    return fightOrSkip();
  }

  // convert promptFight to all lowercase so we can check with less options
  promptFight = promptFight.toLowerCase();

  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping, but don't let them go into the negative
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      // stop while() loop using break; and enter next fight

      // return true if player wants to leave
      return true;
    }
  }
  return false;
};

//This is the main fight function
var fight = function(enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;

  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      // remove enemy's health by subtracting the amount we set in the damage variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          " now has " +
          enemy.health +
          " health remaining."
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
      // player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      // remove enemy's health by subtracting the amount we set in the damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          ". " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

// fight each enemy-robot by looping over them and fighting them one at a time
var startGame = function () {
  //reseet player stats by calling object method reset()
  playerInfo.reset();
  
  //fight loop based on players health
for (var i = 0; i < enemyInfo.length; i++) {
  // if player is still alive, keep fighting
  if (playerInfo.health > 0) {
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
    window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
        
    // pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyObj = enemyInfo[i];

    // reset enemyHealth before starting new fight to between 40 or 60 using randomNumber() function
    pickedEnemyObj.health = randomNumber(40, 60);

    // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyObj);

    //if we're not at the last enemy in the array
    if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
      //ask if player will like to use the store before next round
      var confirStore = window.confirm("You won that round, will you like to visit the store before your next round?");
      //if player choses yes
      if (confirStore)  {
        shop();
      }
    }
  }
  // if player isn't alive, stop the game
  else {
    window.alert('You have lost your robot in battle! Game Over!');
    break;
  }
}
//play again
endGame();
};
// function to end the entire game
var endGame = function() {
if (playerInfo.health > 0) {
window.alert("Great job, you've survived the game! You now have a score")
}
else {
window.alert("You've lost your robot in battle!");
}

//ask player if they will like to play again
var playAgainConfirm = window.confirm("Would you like to play again?")

if (playAgainConfirm) {
startGame();
}
else{
window.alert("Thank you for playing Robot Gladiators! Come back soon!");
}
};

// go to shop between battles function
var shop = function() {
  // ask player what they'd like to do
  var shopOption = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );

// convert answer from prompt to an actual number
shopOption = parseInt(shopOption);

//using a switch to carry out action
switch (shopOption) {
case 1:
playerInfo.refillHealth();
break;

case 2:
playerInfo.upgradeAttack();
break;

case 3:
window.alert("Leaving the store.");

//do nothing,so funtion will end
break;

default:
window.alert("You did not pick valid option. Try again!");

shop();
break;
}
};

//Get Robot Name
var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
};
/*This is an object that stores playerInfo i.e. robots name and also establishes values for player's health, attack and money */
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.attack = 10;
    this.money = 10;
  }, //commma not semi-colon : will break code
  refillHealth: function()  {
    if (this.money >= 7)  {
      window.alert("Refilling palyers health by 20HP for $7.00");
      this.health += 20;
    this.moeny -= 7;
    }
    else  {
      window.alert("You don't have enough money")
    }
  },//commma not semi-colon : will break code
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6AP for $7.00 dollars.");
      this.attack += 6;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  }//no commma needed for last item in object
};

//This is the enemy's robot Info stored in an object
var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];


//Start the game when the page loads
startGame();