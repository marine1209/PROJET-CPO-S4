var player; //designe le sprite du joueur
var clavier; //pour la gestion du clavier
var groupe_pyrahnas; // contient tous les sprite étoiles

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

    this.load.image("img_pyrhana", "src/assets/pyrahna.png"); 
    this.load.spritesheet("img_perso", "src/assets/sportif.png", {
      frameWidth: 48,
      frameHeight: 72
    });

    // chargement tuiles de jeu
    this.load.image("tuiles_natation", "src/assets/image_natation/terrain_atlas.png");
    this.load.image("tuiles_natation2", "src/assets/image_natation/base_out_atlas.png");

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

/** CREATION DU PERSONNAGE  ET ENNEMIS **/
// On créée un nouveau personnage : player et on le positionne
player = this.physics.add.sprite(100, 450, "img_perso")
//  propriétées physiqyes de l'objet player :
this.player.setBounce(0.2); // on donne un petit coefficient de rebond
this.player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde
this.player.setDepth(50);

this.add.image(800,500,"img_pyrahna");
groupe_pyrahnas=this.physics.add.groupe();
this.physics.add.collider(groupe_pyrahnas, calque_plateforme);

this.physics.add.collider(player, groupe_pyrahnas, chocAvecPyrahna, null, this);
var un_pyrahna = groupe_pyrahnas.create(x, 16, "img_pyrhana");
    un_pyrahna.setBounce(1);
    un_pyrahna.setCollideWorldBounds(true);
    un_pyrahna.setVelocity(Phaser.Math.Between(-200, 200), 20);
    un_pyrahna.allowGravity = false;
/*for (var i = 0; i < 3; i++) {
    var coordX = 70 + 70 * i;
    groupe_pyrahnas.create(coordX, 10, "img_etoile");
    this.physics.add.collider(groupe_pyrahnas, calque_plateforme); 
  } 
  */
/** ANIMATIONS **/
  // dans cette partie, on crée les animations, à partir des spritesheet
  // chaque animation est une succession de frame à vitesse de défilement défini
  // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
  // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche
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
  // chargement de la carte
  const carteDuNiveau = this.add.tilemap("carte_natation");


  // chargement du jeu de tuiles
  const tileset = carte_natation.addTilesetImage(
        "tuiles_atlas2",  
        "tuiles_natation",
          //"tuiles_natation2",
          
        );  
  // chargement du calque calque_background
  const calque_background = carte_natation.createLayer(
    "calque_background",
    tileset
  );
    // chargement du calque calque_background_2
    const Calque_Tuiles1 = carte_natation.createLayer(
    "calque_background2",
    tileset
    );

    // chargement du calque calque_plateformes
    const calque_plateforme = carte_natation.createLayer(
        "claque_plateforme",
        tileset
      );  
    // définition des tuiles de plateformes qui sont solides
    // utilisation de la propriété estSolide
    claque_plateforme.setCollisionByProperty({ estSolide: true }); 
    // ajout d'une collision entre le joueur et le calque plateformes
    this.physics.add.collider(player, claque_plateforme); 

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

function chocAvecPyrahna(un_player, un_pyrahna) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("anim_face");
    gameOver = true;
  }
