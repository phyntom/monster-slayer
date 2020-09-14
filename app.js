new Vue({
   el: '#app',
   data: {
      playerHealth: 80,
      monsterHealth: 80,
      gameIsRunning: false,
   },
   methods: {
      startGame() {
         this.gameIsRunning = true;
         this.playerHealth = 100;
         this.monsterHealth = 100;
      },
   },
});
