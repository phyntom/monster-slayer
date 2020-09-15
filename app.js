new Vue({
   el: '#app',
   data: {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      turns: [],
   },
   methods: {
      startGame: function () {
         this.gameIsRunning = true;
         this.playerHealth = 100;
         this.monsterHealth = 100;
         this.turns = [];
      },
      attack: function () {
         let damage = this.computeDamage(3, 10);
         console.log(damage);
         this.monsterHealth -= damage;
         this.turns.unshift({
            isPlayer: true,
            text: `Player hits Monster for ` + damage,
         });
         if (this.checkWinner()) {
            return;
         }
         this.monsterAttacks();
      },
      heavyAttack: function () {
         let damage = this.computeDamage(10, 20);
         this.monsterHealth -= damage;
         this.turns.unshift({
            isPlayer: true,
            text: `Player hits Monster hard for ` + damage,
         });
         if (this.checkWinner()) {
            return;
         }
         this.monsterAttacks();
      },
      heal: function () {
         if (this.playerHealth <= 10) {
            this.playerHealth += 10;
         } else {
            this.playerHealth = 100;
         }
         this.turns.unshift({
            isPlayer: true,
            text: `Player heals by ` + 10,
         });
         this.monsterAttacks();
      },
      giveUp: function () {
         this.gameIsRunning = false;
         // this.playerHealth = 100;
         // this.monsterHealth = 100;
      },
      monsterAttacks: function () {
         let damage = this.computeDamage(5, 12);
         this.playerHealth -= damage;
         this.turns.unshift({
            isPlayer: false,
            text: `Monster hits Player for ` + damage,
         });
         this.checkWinner();
      },
      computeDamage: function (min, max) {
         let damage = Math.max(Math.floor(Math.random() * max + 1), min);
         return damage;
      },
      checkWinner: function () {
         if (this.monsterHealth <= 0) {
            if (confirm('You won ! Wanna new game ?')) {
               this.startGame();
            } else {
               this.gameIsRunning = false;
            }
            return true;
         }
         if (this.playerHealth <= 0) {
            if (confirm('You lost ! Wanna new game ?')) {
               this.startGame();
            } else {
               this.gameIsRunning = false;
            }
            return true;
         }
         return false;
      },
   },
});
