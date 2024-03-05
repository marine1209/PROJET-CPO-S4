var player; //designe le sprite du joueur
var clavier; //pour la gestion du clavier
var groupe_pyrhanas; // contient tous les sprite étoiles
var pyrhana;
var vies = 3; //pour la gestion des vies du joueur
var coeur1;
var coeur2;
var coeur3;
var monTimer;
var groupe_bouteilles;
var gameOver = false;
var looser;

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
    this.load.image("img_coeur_plein", "src/assets/coeur_plein.png")
    this.load.image("img_coeur_vide", "src/assets/coeur_vide.png")
    this.load.image('bouteille', "src/assets/Water Bottle.png")
    this.load.image ('img_gameOver', "src/assets/game_over.png")
    this.load.image("img_boutonFerme", "src/assets/image_natation/closed_button.png"); 
    this.load.image("img_pyrhana", "src/assets/image_natation/pyrhana.png"); 
    this.load.image("img_livre","src/assets/image_natation/book.png");
    this.load.spritesheet("img_perso", "src/assets/sportif.png", {
      frameWidth: 48,
      frameHeight: 72
    });
    // chargement tuiles de jeu
    this.load.image("tuile_atlas", "src/assets/image_natation/tuile_atlas.png");
    
    
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
 const tileset = carte_natation.addTilesetImage("tuile_atlas", "tuile_atlas");  
 
 // chargement du calque calque_background
 const calque_background = carte_natation.createLayer("calque_background",tileset);
 // chargement du calque calque_background_2
 const calque_background2 = carte_natation.createLayer("calque_background2",tileset );
 // chargement du calque calque_plateformes
 const calque_plateforme = carte_natation.createLayer("calque_plateforme",tileset);  

 calque_plateforme.setCollisionByProperty({ estSolide: true });
 
 var imageOn=this.add.image(400,300,"img_livre");
 var buttonOn=this.add.image(750,500,"img_boutonFerme");
 buttonOn.setInteractive();
 buttonOn.on('pointerdown', () => {
  // Faire disparaître l'image
  buttonOn.setScale(1.2);
  buttonOn.visible = false;
  imageOn.visible=false;

});

/** ANIMATIONS **/
  // dans cette partie, on crée les animations, à partir des spritesheet
  // chaque animation est une succession de frame à vitesse de défilement défini
  // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
  // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche
  // utilisation de la propriété estSolide

groupe_bouteilles = this.physics.add.group();
  this.physics.add.collider(groupe_bouteilles, calque_plateforme);
  calque_plateforme.forEachTile(tile => { // Parcours de chaque tuile de la couche "ravataillements"
    if (tile.properties.ravitaillement == true) {// Vérifier si la tuile a la propriété "ravitaillement" définie
      const coord = calque_plateforme.tileToWorldXY(tile.x, tile.y); // Position de la tuile sur la map
      groupe_bouteilles.create(coord.x + 50, coord.y + 50, 'bouteille'); // Ajout de l'image à cet emplacement
    }
  });    
/** CREATION DU PERSONNAGE  ET ENNEMIS **/

// On créée un nouveau personnage : player et on le positionne
player = this.physics.add.sprite(100, 450, "img_perso")
//  propriétées physiqyes de l'objet player :
player.setBounce(0.2); // on donne un petit coefficient de rebond
player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde
player.setDepth(50);
groupe_pyrhanas= this.physics.add.group();
this.physics.add.collider(player, calque_plateforme);
//this.physics.add.collider(player, calque_plateforme); 

//ajout des bouteilles d'eau sur les endroits où il y a la propriété ravitaillement 

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
  

for (var i=0;i<3; i++){
  var coordX=Phaser.Math.Between(0,3200);
  var coordY=Phaser.Math.Between(0,640);
  var un_pyrhana=groupe_pyrhanas.create(coordX, coordY, "img_pyrhana");
  this.physics.add.collider(groupe_pyrhanas,calque_plateforme);
  un_pyrhana.setBounce(1);
  un_pyrhana.setCollideWorldBounds(true);
  groupe_pyrhanas.setVelocity(Phaser.Math.Between(-200, 200), 20);
  un_pyrhana.allowGravity = false;
}
this.physics.add.collider(groupe_pyrhanas,calque_plateforme);

 /** CREATION DU CLAVIER **/  
  clavier = this.input.keyboard.createCursorKeys();

/** GESTION DES INTERACTIONS ENTRE GROUPES ET ELEMENTS **/  
  // définition des tuiles de plateformes qui sont solides

  // ajout d'une collision entre le joueur et le calque plateformes
  
  
  // redimentionnement du monde avec les dimensions calculées via tiled
  this.physics.world.setBounds(0, 0, 3200, 640);
  //  ajout du champs de la caméra de taille identique à celle du monde
  this.cameras.main.setBounds(0, 0, 3200, 640);
  // ancrage de la caméra sur le joueur
  this.cameras.main.startFollow(player);  
  

  //creation des vies 
  coeur1 = this.add.image(40, 70, 'img_coeur_plein');
  coeur2 = this.add.image(120, 70, 'img_coeur_plein');
  coeur3 = this.add.image(200, 70, 'img_coeur_plein');
  looser=this.add.image("img_gameOver");
  
 }
/***********************************************************************/
/** METHODE UPDATE 
/***********************************************************************/

update() {
  // Mettre à jour la position des cœurs par rapport à la caméra
  const cameraScrollX = this.cameras.main.scrollX;
  const cameraScrollY = this.cameras.main.scrollY;

  // Positionner les cœurs sur l'écran en fonction des coordonnées de la caméra
  coeur1.x = cameraScrollX + 40;
  coeur1.y = cameraScrollY + 70;
  coeur2.x = cameraScrollX + 120;
  coeur2.y = cameraScrollY + 70;
  coeur3.x = cameraScrollX + 200;
  coeur3.y = cameraScrollY + 70;

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
    if (clavier.up.isDown && player.body.onFloor()) {
      player.setVelocityY(-300);
      player.anims.play('anim_face', true);
    }
  //timer pour les coeurs 
  this.physics.add.overlap(player, groupe_bouteilles, this.ramasserBouteille, null, this);
  this.physics.add.overlap(player, groupe_pyrhanas, this.chocAvecPyrahna, null, this);

  if (vies==0) {
    return looser;
  }
 
}


chocAvecBombe(un_player, une_bombe) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play("anim_face");
  gameOver = true;
}

chocAvecPyrahna(player, pyrahna) {
  pyrahna.disableBody(true, true);
  this.perdreUneVie();
  }

perdreUneVie() {
   // console.log(this.monTimer)
    if (vies > 0) {
      vies -= 1;
      if (vies == 2) {
        coeur3.setTexture('img_coeur_vide');
      } else if (vies == 1) {
        coeur2.setTexture('img_coeur_vide');
      } else if (vies == 0) {
        coeur1.setTexture('img_coeur_vide');
        
      }
    }
  }


  ramasserBouteille(un_player, une_bouteille) {
    une_bouteille.disableBody(true, true);
    this.GagnerUneVie();
    var x;
    if (player.x < 400) {
      x = Phaser.Math.Between(400, 800);
    } else {
      x = Phaser.Math.Between(0, 400);
    }

    var une_bombe = groupe_bombes.create(x, 16, "img_bombe");
    une_bombe.setBounce(1);
    une_bombe.setCollideWorldBounds(true);
    une_bombe.setVelocity(Phaser.Math.Between(-200, 200), 20);
    une_bombe.allowGravity = false;
  }

  GagnerUneVie() {
    if (vies > 0 && vies < 3) {
      vies += 1;
      if (vies == 3) {
        coeur3.setTexture('img_coeur_plein');
      } else if (vies == 2) {
        coeur2.setTexture('img_coeur_plein');
      }
    }
  }
}
