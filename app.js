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
         this.playerAttacks(3, 10, false);
         if (this.checkWinner()) {
            return;
         }
         this.monsterAttacks();
      },
      heavyAttack: function () {
         this.playerAttacks(10, 20, true);
         if (this.checkWinner()) {
            return;
         }
         this.monsterAttacks();
      },
      heal: function () {
         if (this.playerHealth <= 90) {
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
      playerAttacks: function (min, max, isHeavy) {
         let damage = this.computeDamage(min, max);
         this.monsterHealth -= damage;
         let text = isHeavy
            ? `Player hits Monster hard for ` + damage
            : `Player hits Monster for ` + damage;
         this.turns.unshift({
            isPlayer: true,
            text,
         });
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
