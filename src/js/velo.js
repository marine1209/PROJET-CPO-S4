
var player; //designe le sprite du joueur
var clavier; //pour la gestion du clavier
var boutonChercher;
var groupe_buissons
export default class velo extends Phaser.Scene {

    constructor(){
        super ({
            key : "velo"
        });
    }

preload (){
  //chargement des images
  this.load.image("img_BluePlatform", "src/assets/image_velo/blue_platform.png");
  this.load.image("img_levier", "src/assets/image_velo/levier.png");
  this.load.image("img_selle", "src/assets/image_velo/selle.png");
  this.load.image("img_guidon", "src/assets/image_velo/guidon.png");
  this.load.image("img_roueAR", "src/assets/image_velo/roue_arriere.png");
  this.load.image("img_roueAV", "src/assets/image_velo/roue_avant.png");
  this.load.image("img_pedale", "src/assets/image_velo/pedale.png");
  this.load.image("tuile_terre1", "src/assets/image_course/1.png");
  this.load.image("tuile_terre2", "src/assets/image_course/2.png");
  this.load.image("tuile_terre3", "src/assets/image_course/3.png");
  this.load.image("tuile_terre5", "src/assets/image_course/5.png");
  this.load.image("tuile_terre13", "src/assets/image_course/13.png");
  this.load.image("tuile_terre14", "src/assets/image_course/14.png");
  this.load.image("tuile_terre15", "src/assets/image_course/15.png");
  this.load.image("eau", "src/assets/image_course/17.png");
  this.load.image("background", "src/assets/image_course/BG.png");
  this.load.image("buisson1", "src/assets/image_course/Bush.png");
  this.load.image("pierre", "src/assets/image_course/Stone.png");
  this.load.image("arbre1", "src/assets/image_course/Tree_2.png");
  this.load.tilemapTiledJSON("carte_velo", "src/assets/image_velo/MAP VELO.tmj");
  this.load.spritesheet("img_perso", "src/assets/sportif.png", {
    frameWidth: 48,
    frameHeight: 72
  });
  this.load.image("img_coeur_plein", "src/assets/coeur_plein.png")
  this.load.image("img_coeur_vide", "src/assets/coeur_vide.png")
  this.load.image('bouteille', "src/assets/Water Bottle.png")
  this.load.image('img_gameOver', "src/assets/game_over.png")

}

create(){

    //création de la map
    const map = this.add.tilemap("carte_velo");
    const tileset1 = map.addTilesetImage("13", "tuile_terre13");
    const tileset2 = map.addTilesetImage("15", "tuile_terre15");
    const tileset3 = map.addTilesetImage("BG", "background");
    const tileset5 = map.addTilesetImage("eau", "eau");
    const tileset7 = map.addTilesetImage("terre", "tuile_terre2");
    const tileset8 = map.addTilesetImage("terre1", "tuile_terre1");
    const tileset9 = map.addTilesetImage("terre2", "tuile_terre3");
    const tileset10 = map.addTilesetImage("terre3", "tuile_terre5");
    const calque1 = map.createLayer("arrière plan", [tileset3]);
    const calque2 = map.createLayer("terre", [tileset1, tileset7, tileset8, tileset9, tileset10, tileset2, tileset5]);

    //creation des colisions 
    calque2.setCollisionByProperty({estSolide : true});
    //creation des animations pour le personnage
    player = this.physics.add.sprite(100, 450, "img_perso");
    player.setCollideWorldBounds(true);
    player.body.onWorldBounds = true;
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
      this.physics.add.collider(player, calque2);
      // redimentionnement du monde avec les dimensions calculées via tiled
      this.physics.world.setBounds(0, 0, 3200, 640);
      //  ajout du champs de la caméra de taille identique à celle du monde
      this.cameras.main.setBounds(0, 0, 3200, 640);
      // ancrage de la caméra sur le joueur
      this.cameras.main.startFollow(player);
      this.physics.add.collider (player, calque2);
     /** CREATION DU CLAVIER **/  
  clavier = this.input.keyboard.createCursorKeys();

  boutonChercher = this.input.keyboard.addKey('A'); 
  groupe_buissons = this.add.image(400,600, "buisson1");
}
update (){
  
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
    player.setVelocityY(-400);
    player.anims.play('anim_face', true);
  }
  if ( Phaser.Input.Keyboard.JustDown(boutonChercher)) {
    tirer(player);
  } 

}
tirer(player) {
  // mesasge d'alerte affichant les attributs de player
alert ("joueur en position"+player.x + ","+player.y ) ; 
} 
/*
chercher(){
  
}
*/
}

