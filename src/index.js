import Course from "/src/js/Course.js"; 
import velo from "/src/js/velo.js"; 
import natation from "/src/js/natation.js";
import menu from "/src/js/menu.js";
import transition1 from "/src/js/transition1.js";
import accueil_course from "/src/js/accueil_course.js";
import accueil_velo from "/src/js/accueil_velo.js";

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
  scene: [menu,transition1, natation, accueil_course, Course, accueil_velo,velo ] 
  
};

var game = new Phaser.Game(config);
game.scene.start("menu"); 
