new Vue({
   el: '#app',
   data: {
      playerHealth: 80,
      monsterHealth: 80,
      gameIsRunning: false,
   },
   methods: {
      startGame: function () {
         this.gameIsRunning = true;
         this.playerHealth = 100;
         this.monsterHealth = 100;
      },
      attack: function () {
         this.monsterHealth -= this.computeDamage(3, 10);
         if (this.checkWinner()) {
            return;
         }
         this.playerHealth -= this.computeDamage(5, 12);
         this.checkWinner();
      },
      heavyAttack: function () {},
      heal: function () {
         this.playerHealth += 5;
      },
      giveUp: function () {
         this.gameIsRunning = false;
         this.playerHealth = 100;
         this.monsterHealth = 100;
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
