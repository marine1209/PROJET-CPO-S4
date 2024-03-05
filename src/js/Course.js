var player; //designe le sprite du joueur
var clavier; //pour la gestion du clavier
var vies = 3; //pour la gestion des vies du joueur
var coeur1;
var coeur2;
var coeur3;
var monTimer;
var groupe_bouteilles; 
var gameOver = false;
export default class Course extends Phaser.Scene {
   
    constructor(){
        super ({
            key : "course"
        });
    }

preload (){
  //chargement des images
   this.load.image ("tuile_terre1", "src/assets/image_course/1.png");
   this.load.image ("tuile_terre2", "src/assets/image_course/2.png");
   this.load.image ("tuile_terre3", "src/assets/image_course/3.png");
   this.load.image ("tuile_terre5", "src/assets/image_course/5.png");
   this.load.image ("tuile_terre13", "src/assets/image_course/13.png");
   this.load.image ("tuile_terre14", "src/assets/image_course/14.png");
   this.load.image ("tuile_terre15", "src/assets/image_course/15.png");
   this.load.image ("eau", "src/assets/image_course/17.png");
   this.load.image ("background", "src/assets/image_course/BG.png");
   this.load.image ("buisson1", "src/assets/image_course/Bush.png");
   this.load.image ("pierre", "src/assets/image_course/Stone.png");
   this.load.image ("arbre1", "src/assets/image_course/Tree_2.png");
   this.load.tilemapTiledJSON ("carte_course", "src/assets/image_course/MAP COURSE.tmj");
   this.load.spritesheet("img_perso", "src/assets/sportif.png", {
    frameWidth: 48,
    frameHeight: 72
   });
  this.load.image("img_coeur_plein", "src/assets/coeur_plein.png")
  this.load.image("img_coeur_vide", "src/assets/coeur_vide.png")
  this.load.image('bouteille', "src/assets/Water Bottle.png")
}

create(){
    //création de la map
    const map = this.add.tilemap("carte_course") ; 
    const tileset1 = map.addTilesetImage ("13", "tuile_terre13");
    const tileset2 = map.addTilesetImage ("15", "tuile_terre15");
    const tileset3 = map.addTilesetImage ("BG", "background");
    const tileset4 = map.addTilesetImage ("Bush", "buisson1");
    const tileset5 = map.addTilesetImage ("eau", "eau");
    const tileset6 = map.addTilesetImage ("Stone", "pierre");
    const tileset7 = map.addTilesetImage ("terre", "tuile_terre2");
    const tileset8 = map.addTilesetImage ("terre1", "tuile_terre1");
    const tileset9 = map.addTilesetImage ("terre2", "tuile_terre3");
    const tileset10 = map.addTilesetImage ("terre3", "tuile_terre5");
    const tileset11 = map.addTilesetImage ("Tree_2", "arbre1");
    const calque1 = map.createLayer("arrière plan", [tileset3]);
    const calque2 = map.createLayer("terre", [tileset1,tileset7,tileset8,tileset9,tileset10,tileset2,tileset5]);
    const calque3 = map.createLayer ("arbres et buissons", [tileset11, tileset4, tileset6]);

    //creation des colisions 
    calque2.setCollisionByProperty({estSolide : true});

    //ajout des bouteilles d'eau sur les endroits où il y a la propriété ravitaillement 
    groupe_bouteilles = this.physics.add.group();
    this.physics.add.collider (groupe_bouteilles, calque2);
     calque3.forEachTile(tile => { // Parcours de chaque tuile de la couche "ravataillements"
      if (tile.properties.ravitaillement==true) {// Vérifier si la tuile a la propriété "ravitaillement" définie
          const coord = calque3.tileToWorldXY(tile.x, tile.y); // Position de la tuile sur la map
          groupe_bouteilles.create(coord.x + 50, coord.y + 50, 'bouteille'); // Ajout de l'image à cet emplacement
      }
  });


    //creation des animations pour le personnage
    player = this.physics.add.sprite(100, 450, "img_perso");
    this.anims.create({
        key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 15, end: 17 }), // on prend toutes les frames de img perso numerotées de 15 à 17
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      }); 
      this.anims.create({
        key: "anim_tourne_droite", // key est le nom de l'animation : doit etre unique poru la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 27, end: 29 }), // on prend toutes les frames de img perso numerotées de 27 à 29
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      }); 
       // creation de l'animation "anim_tourne_face" qui sera jouée sur le player lorsque ce dernier n'avance pas.
       this.anims.create({
        key: "anim_face",
        frames: [{ key: "img_perso", frame: 4 }],
        frameRate: 20
      });
   this.physics.add.collider (player, calque2);
   // redimentionnement du monde avec les dimensions calculées via tiled
   this.physics.world.setBounds(0, 0, 3200, 640);
   //  ajout du champs de la caméra de taille identique à celle du monde
   this.cameras.main.setBounds(0, 0, 3200, 640);
   // ancrage de la caméra sur le joueur
   this.cameras.main.startFollow(player); 

     /** CREATION DU CLAVIER **/  
  clavier = this.input.keyboard.createCursorKeys();

  //creation des vies 
  coeur1 = this.add.image(40, 90, 'img_coeur_plein');
  coeur2 = this.add.image(120, 90, 'img_coeur_plein');
  coeur3 = this.add.image(200, 90, 'img_coeur_plein');

}
update (){
 // Mettre à jour la position des cœurs par rapport à la caméra
  const cameraScrollX = this.cameras.main.scrollX;
  const cameraScrollY = this.cameras.main.scrollY;
      
      // Positionner les cœurs sur l'écran en fonction des coordonnées de la caméra
  coeur1.x = cameraScrollX + 40;
  coeur1.y = cameraScrollY + 90;
  coeur2.x = cameraScrollX + 120;
  coeur2.y = cameraScrollY + 90;
  coeur3.x = cameraScrollX + 200;
  coeur3.y = cameraScrollY + 90;
  
  //position du joueur en fonction des touches cliquées
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
  if (clavier.up.isDown && player.body.blocked.down) {
  player.setVelocityY(-500);
}
 //timer pour les coeurs 
  this.monTimer = this.time.addEvent({ delay: 5000, callback: this.perdreUneVie, callbackScope: this, repeat : -1 });
  this.physics.add.overlap(player, groupe_bouteilles, this.ramasserBouteille, null, this);

  if (gameOver){
    return;
  }

}

perdreUneVie(){
  
    if (vies >0){
      vies -= 1; 
        if (vies == 2){
            coeur3.setTexture('img_coeur_vide');
        } else if (vies == 1){
            coeur2.setTexture('img_coeur_vide');
        } else if (vies == 0){
            gameOver= true;
        }
    }
}

ramasserBouteille(un_player, une_bouteille){
  une_bouteille.disableBody(true, true);
}

GagnerUneVie(){
  if (vies >0){
    vies += 1; 
      if (vies == 2){
          coeur3.setTexture('img_coeur_plein');
      } else if (vies == 1){
          coeur2.setTexture('img_coeur_plein');
      } else if (vies == 0){
          gameOver= true;
      }
  }
}

}

