var player; //designe le sprite du joueur
var clavier; //pour la gestion du clavier
var groupe_pyrhanas; // contient tous les sprite étoiles
var pyrhana;

export default class natation extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "natation" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }

/***********************************************************************/
/** METHODE PRELOAD 
/***********************************************************************/

/** La fonction preload est appelée une et une seule fois,
 * lors du chargement de la scene dans le jeu.
 * On y trouve surtout le chargement des assets (images, son ..)
 */
preload() {

    this.load.image("img_pyrhana", "src/assets/image_natation/pyrhana.png"); 
    this.load.image("img_livre","src/assets/image_natation/book.png");
    this.load.spritesheet("img_perso", "src/assets/sportif.png", {
      frameWidth: 48,
      frameHeight: 72
    });
    // chargement tuiles de jeu
    this.load.image("Phaser_tuilesdejeu", "src/assets/image_natation/terrain_atlas.png");
    
    
    // chargement de la carte
    this.load.tilemapTiledJSON("carte_natation", "src/assets/image_natation/map_natation.tmj");  
}
  


/***********************************************************************/
/** METHODE CREATE 
/***********************************************************************/

/* La fonction create est appelée lors du lancement de la scene
 * si on relance la scene, elle sera appelée a nouveau
 * on y trouve toutes les instructions permettant de créer la scene
 * placement des peronnages, des sprites, des platesformes, création des animations
 * ainsi que toutes les instructions permettant de planifier des evenements
 */
 create() {

 // chargement de la carte
 const carte_natation = this.add.tilemap("carte_natation");

 // chargement du jeu de tuiles
 const tileset = carte_natation.addTilesetImage("tuile_atlas","Phaser_tuilesdejeu" );  
 
 // chargement du calque calque_background
 const calque_background = carte_natation.createLayer("calque_background",tileset);
 // chargement du calque calque_background_2
 const calque_background2 = carte_natation.createLayer("calque_background2",tileset );
 // chargement du calque calque_plateformes
 const calque_plateforme = carte_natation.createLayer("calque_plateforme",tileset);  

 this.add.image(400,300,"img_livre").bringToTop();

/** CREATION DU PERSONNAGE  ET ENNEMIS **/

groupe_pyrhanas= this.physics.add.group();
groupe_pyrhanas.create(300, 584, "img_pyrhana");
groupe_pyrhanas.create(600, 584, "img_pyrhana"); 
groupe_pyrhanas.create(50, 300, "img_pyrhana");
this.physics.add.overlap( groupe_pyrhanas, deplacementPyrhana, null, this);

// On créée un nouveau personnage : player et on le positionne
player = this.physics.add.sprite(100, 450, "img_perso")
//  propriétées physiqyes de l'objet player :
player.setBounce(0.2); // on donne un petit coefficient de rebond
player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde
player.setDepth(50);



/** ANIMATIONS **/
  // dans cette partie, on crée les animations, à partir des spritesheet
  // chaque animation est une succession de frame à vitesse de défilement défini
  // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
  // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche
      // utilisation de la propriété estSolide
    calque_plateforme.setCollisionByProperty({ estSolide: true });
    
    this.anims.create({
    key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
    frames: this.anims.generateFrameNumbers("img_perso", { start: 15, end: 17 }), // on prend toutes les frames de img perso numerotées de 0 à 3
    frameRate: 10, // vitesse de défilement des frames
    repeat: -1 // nombre de répétitions de l'animation. -1 = infini
  }); 
  this.anims.create({
    key: "anim_tourne_droite", // key est le nom de l'animation : doit etre unique poru la scene.
    frames: this.anims.generateFrameNumbers("img_perso", { start: 27, end: 29 }), // on prend toutes les frames de img perso numerotées de 0 à 3
    frameRate: 10, // vitesse de défilement des frames
    repeat: -1 // nombre de répétitions de l'animation. -1 = infini
  }); 
   // creation de l'animation "anim_tourne_face" qui sera jouée sur le player lorsque ce dernier n'avance pas.
   this.anims.create({
    key: "anim_face",
    frames: [{ key: "img_perso", frame: 4 }],
    frameRate: 20
  });
  
  /** CREATION DU CLAVIER **/  
  clavier = this.input.keyboard.createCursorKeys();

  /** GESTION DES INTERACTIONS ENTRE GROUPES ET ELEMENTS **/  
    // définition des tuiles de plateformes qui sont solides
 
    // ajout d'une collision entre le joueur et le calque plateformes
    this.physics.add.collider(player, calque_plateforme); 
    this.physics.add.collider(groupe_pyrhanas, calque_plateforme);
    
    // redimentionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 3200, 640);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 3200, 640);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(player);  
  
 }
/***********************************************************************/
/** METHODE UPDATE 
/***********************************************************************/

update() {
  /*
    if (gameOver) {
      return;
    }
  */
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
    if (clavier.space.isDown && player.body.onFloor()) {
      player.setVelocityY(-330);
      player.anims.play('anim_face', true);
    }
  
 
  }


}
function deplacementPyrhana(un_pyrahna){
  // Générer un mouvement aléatoire pour la position
  var randomX = Phaser.Math.Between(0, 800);
  var randomY = Phaser.Math.Between(0, 600);

  // Appliquer le mouvement aléatoire à la position de l'objet
  groupe_pyrhanas.x += randomX;
  groupe_pyrhanas.y += randomY;

  // Générer une rotation aléatoire
  var randomRotation = Phaser.Math.Between(-0.02, 0.02);

  // Appliquer la rotation aléatoire à l'objet
  groupe_pyrhanas.rotation += randomRotation;
}
function chocAvecPyrahna(un_player, un_pyrahna) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("anim_face");
    gameOver = true;
  }
