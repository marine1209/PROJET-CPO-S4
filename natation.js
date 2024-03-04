/***********************************************************************/
/** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/***********************************************************************/

// configuration générale du jeu
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
    scene: {
      // une scene est un écran de jeu. Pour fonctionner il lui faut 3 fonctions  : create, preload, update
      preload: preload, // la phase preload est associée à la fonction preload, du meme nom (on aurait pu avoir un autre nom)
      create: create, // la phase create est associée à la fonction create, du meme nom (on aurait pu avoir un autre nom)
      update: update // la phase update est associée à la fonction update, du meme nom (on aurait pu avoir un autre nom)
    }
  };

  // création et lancement du jeu
new Phaser.Game(config);
/***********************************************************************/
/** FONCTION PRELOAD 
/***********************************************************************/

/** La fonction preload est appelée une et une seule fois,
 * lors du chargement de la scene dans le jeu.
 * On y trouve surtout le chargement des assets (images, son ..)
 */
function preload() {
    this.load.image("img_sky", "src/assets/sky.png");
    this.load.image("img_plateform", "src/assets/platform.png");
    this.load.image("img_etoile", "src/assets/star.png"); 
    this.load.image("img_bombe", "src/assets/bomb.png"); 
    this.load.spritesheet("img_perso", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }


/***********************************************************************/
/** FONCTION CREATE 
/***********************************************************************/

/* La fonction create est appelée lors du lancement de la scene
 * si on relance la scene, elle sera appelée a nouveau
 * on y trouve toutes les instructions permettant de créer la scene
 * placement des peronnages, des sprites, des platesformes, création des animations
 * ainsi que toutes les instructions permettant de planifier des evenements
 */
  function create() {
    clavier = this.input.keyboard.createCursorKeys();
  
     // dans cette partie, on crée les animations, à partir des spritesheet
  // chaque animation est une succession de frame à vitesse de défilement défini
  // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
  // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche
  this.anims.create({
    key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
    frames: this.anims.generateFrameNumbers("img_perso", { start: 0, end: 3 }), // on prend toutes les frames de img perso numerotées de 0 à 3
    frameRate: 10, // vitesse de défilement des frames
    repeat: -1 // nombre de répétitions de l'animation. -1 = infini
  }); 
  this.anims.create({
    key: "anim_tourne_droite", // key est le nom de l'animation : doit etre unique poru la scene.
    frames: this.anims.generateFrameNumbers("img_perso", { start: 5, end: 8 }), // on prend toutes les frames de img perso numerotées de 0 à 3
    frameRate: 10, // vitesse de défilement des frames
    repeat: -1 // nombre de répétitions de l'animation. -1 = infini
  }); 
   // creation de l'animation "anim_tourne_face" qui sera jouée sur le player lorsque ce dernier n'avance pas.
   this.anims.create({
    key: "anim_face",
    frames: [{ key: "img_perso", frame: 4 }],
    frameRate: 20
  });



  /***********************************************************************/
/** FONCTION UPDATE 
/***********************************************************************/

function update() {
    if (gameOver) {
      return;
    }
  
    if (clavier.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('anim_tourne_droite', true);
    }else if (clavier.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('anim_tourne_gauche', true);
    }else {
      player.setVelocityX(0);
      player.anims.play('anim_face', true);
    } 
  
    if (clavier.space.isDown && player.body.touching.down) {
    player.setVelocityY(-330);}
  }


}