import Course from "/src/js/selection.js"; 
import natation from "/src/js/niveau1.js";
import menu from "/src/js/menu.js";

var config = {
  type: Phaser.AUTO,
  width: 800, // largeur en pixels
  height: 600, // hauteur en pixels
  physics: {
    // définition des parametres physiques
    default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
    arcade: {
      // parametres du mode arcade
      gravity: {
        y: 300 // gravité verticale : acceleration ddes corps en pixels par seconde
      },
      debug: false // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  
  },
  scene: [menu, natation, Course] 
  
};

var game = new Phaser.Game(config);
game.scene.start("course"); 
