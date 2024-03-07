
var player; //designe le sprite du joueur
var clavier; //pour la gestion du clavier
var groupe_buissons;
var bouton_disparaitre;
var bouton;
var bouton2;
var score=0;
var musique_de_fond;
var bruit_de_click;
var plateforme_descendante;
var plateforme_mobile;;
var zone_texte_score;
var tween_mouvement;
var tween_mouvement2;
var levier;
var fin;
var mouvStone;
var boutonNext;
var plateforme3; 
var boutonPlateforme;
export default class velo extends Phaser.Scene {

  constructor() {
    super({
      key: "velo"
    });
  }

  preload() {
    //chargement des images
    this.load.image("level_completed", "src/assets/finished_line.png");
    this.load.audio('musique_velo', 'src/assets/musique/music_bike.mp3');  
    this.load.audio('click_sound', 'src/assets/musique/zipclick.flac');
    this.load.image("img_levierOn", "src/assets/image_velo/levier_on.png");
    this.load.image("img_levierOff", "src/assets/image_velo/levier_off.png");
    this.load.image("img_bouton", "src/assets/image_velo/bouton_rose.png");
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
    this.load.image('img_bouton', "src/assets/bouton_rose.png")
    this.load.image("level_completed", "src/assets/finished_line.png")
    this.load.image('img_fin', "src/assets/image_fin.png")

  }

  create() {
 console.log("begin create")
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
    this.fin =this.physics.add.staticSprite(3000,580,"level_completed");

    //creation des colisions 
    calque2.setCollisionByProperty({ estSolide: true });
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
    this.physics.add.collider(player, calque2);
    /** CREATION DU CLAVIER **/
    clavier = this.input.keyboard.createCursorKeys();

    // création groupe_vélo 

    this.groupe_velo = this.physics.add.group();
    const selle = this.groupe_velo.create(160, 0, "img_selle");
    const roueAV = this.groupe_velo.create(1300, 0, "img_roueAV");
    const roueAR = this.groupe_velo.create(2000, 0, "img_roueAR");
    const guidon = this.groupe_velo.create(2600, 0, "img_guidon");
    const pedale = this.groupe_velo.create(1430, 0, 'img_pedale');
    this.physics.add.collider(this.groupe_velo, calque2);
    
    //création des éléments qui cachent le vélo 
    this.groupe_buissons = this.physics.add.group()
    const buisson1 = this.groupe_buissons.create(160, 95, "buisson1");
    const pierre1 = this.groupe_buissons.create(1300, 0, "pierre");
    const pierre2 = this.groupe_buissons.create(10000, 0, "pierre");
    const buisson2 = this.groupe_buissons.create(2000, 0, "buisson1");
    const pierre3 = this.groupe_buissons.create(1430, 0, "pierre");
    this.physics.add.collider(this.groupe_buissons, calque2);
    this.physics.add.collider(player, this.groupe_buissons);
    this.groupe_buissons.children.iterate(buisson => {
      buisson.body.immovable = true;
  });

    //création bouton rose et du score
    bouton2 = this.physics.add.staticSprite(1200, 382, "img_bouton");
    this.physics.add.collider(bouton2, calque2);

    bouton2.active = false;

    zone_texte_score = this.add.text(550, 16, score.toString() + "/5", { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
    // overlap eau
    
    calque2.setTileIndexCallback([ 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72], this.gameOver, this);
    this.physics.add.overlap(player, calque2);
    this.physics.add.overlap(player, this.groupe_velo, this.ramasserVelo, null, this);


    plateforme3 = this.physics.add.image(2500, 200, "tuile_terre2");
    this.physics.add.collider(player, plateforme3);
    plateforme3.body.allowGravity = false;
   
    plateforme_descendante = this.physics.add.sprite(1200, 100, "tuile_terre2");
    this.physics.add.collider(player, plateforme_descendante);
    plateforme_descendante.body.allowGravity = false;
    plateforme_descendante.body.immovable = true;
    tween_mouvement2 = this.tweens.add({
      targets: [plateforme_descendante],  // on applique le tween sur platefprme_mobile
      paused: true, // de base le tween est en pause
      ease: "Linear",  // concerne la vitesse de mouvement : linéaire ici 
      duration: 2000,  // durée de l'animation pour monter 
      yoyo: true,   // mode yoyo : une fois terminé on "rembobine" le déplacement 
      y: "+=300",   // on va déplacer la plateforme de 300 pixel vers le haut par rapport a sa position
      delay: 0,     // délai avant le début du tween une fois ce dernier activé
      hold: 1000,   // délai avant le yoyo : temps qeu al plate-forme reste en haut
      repeatDelay: 1000, // deléi avant la répétition : temps que la plate-forme reste en bas
      repeat: -1 // répétition infinie 
    });
    this.physics.add.collider(player, plateforme_descendante);
    bouton = this.physics.add.staticSprite(2600, 500, "img_bouton");
    bouton.active = false;
    this.physics.add.collider(bouton, calque2);

    plateforme_mobile = this.physics.add.sprite(400, 450, "tuile_terre2");
    this.physics.add.collider(player, plateforme_mobile);
    plateforme_mobile.body.allowGravity = false;
    plateforme_mobile.body.immovable = true;

    tween_mouvement = this.tweens.add({
      targets: [plateforme_mobile],  // on applique le tween sur platefprme_mobile
      paused: true, // de base le tween est en pause
      ease: "Linear",  // concerne la vitesse de mouvement : linéaire ici 
      duration: 2000,  // durée de l'animation pour monter 
      yoyo: true,   // mode yoyo : une fois terminé on "rembobine" le déplacement 
      y: "-=300",   // on va déplacer la plateforme de 300 pixel vers le haut par rapport a sa position
      delay: 0,     // délai avant le début du tween une fois ce dernier activé
      hold: 1000,   // délai avant le yoyo : temps qeu al plate-forme reste en haut
      repeatDelay: 1000, // deléi avant la répétition : temps que la plate-forme reste en bas
      repeat: -1 // répétition infinie 
    });

    levier = this.physics.add.staticSprite(700, 538, "img_levier");
    levier.active = false;
    this.physics.add.collider(levier, calque2);
    
    //boutons associés à des touches pour activer le levier et les boutons
    boutonNext=this.input.keyboard.addKey('A'); //bouton pour franchir la ligne d'arriver
    boutonPlateforme=this.input.keyboard.addKey('S');// bouton pour activer la plateforme descendante
    
    musique_de_fond = this.sound.add('musique_velo'); 
    musique_de_fond.play();
    bruit_de_click=this.sound.add("click_sound");


    //on ajoute un bouton de musique
    var bouton_musiqueOn = this.add.image(700, 100, "imageMusiqueOn").setDepth(1).setScrollFactor(0);
    bouton_musiqueOn.setInteractive();


    //paramétrage du bouton musiqueON
    bouton_musiqueOn.on("pointerover", () => {
      bouton_musiqueOn.setScale(1.2);
      //bouton_musiqueOff.setVisible(false);
    });
    bouton_musiqueOn.on('pointerout', ()=> {
      bouton_musiqueOn.setScale(1);
    });
    bouton_musiqueOn.on("pointerup", () => {
      bruit_de_click.play();
      if (bouton_musiqueOn.texture.key === "imageMusiqueOn") {
        bouton_musiqueOn.setTexture("imageMusiqueOff");
        musique_de_fond.stop(); 
    } else if (bouton_musiqueOn.texture.key === "imageMusiqueOff") {
        bouton_musiqueOn.setTexture("imageMusiqueOn");
        
        musique_de_fond.play(); 
    }
    });

  }


  update() {


    if (clavier.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('anim_tourne_droite', true);
    } else if (clavier.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('anim_tourne_gauche', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('anim_face', true);
    }
    if (clavier.up.isDown && player.body.onFloor()) {
      player.setVelocityY(-400);
      player.anims.play('anim_face', true);
    }
    
    if((Phaser.Input.Keyboard.JustDown(boutonNext))&&(this.physics.overlap(player, this.fin))){
      musique_de_fond.stop();
      this.scene.start("accueil_victoire");
      this.score=0;
    } 


    // activation du levier de la plateforme mobile : on est dessus et on appuie sur espace
     if (
      Phaser.Input.Keyboard.JustDown(boutonPlateforme) == true &&
      this.physics.overlap(player, levier) == true
    ) {
      // si le levier etait activé, on le désactive et stoppe la plateforme
      if (levier.active == true) {
        levier.active = false; // on désactive le levier
        levier.flipX = false; // permet d'inverser l'image
        tween_mouvement.pause();  // on stoppe le tween
      }
      // sinon :  on l'active et stoppe la plateforme
      else {
        levier.active = true; // on active le levier 
        levier.flipX = true; // on tourne l'image du levier
        tween_mouvement.resume();  // on relance le tween
      }
    
    }

    if (
      Phaser.Input.Keyboard.JustDown(clavier.space) == true &&
      this.physics.overlap(player, bouton) == true
    ) {
      // si le levier etait activé, on le désactive et stoppe la plateforme
      if (bouton.active == true) {
        bouton.active = false; // on désactive le levier
        bouton.flipX = false; // permet d'inverser l'image
        tween_mouvement2.pause();  // on stoppe le tween
      }
      // sinon :  on l'active et stoppe la plateforme
      else {
        bouton.active = true; // on active le levier 
        bouton.flipX = true; // on tourne l'image du levier
        tween_mouvement2.resume();  // on relance le tween
      }

    }
    
    if ((clavier.down.isDown) && (this.physics.overlap(player, bouton2) == true)) {
      console.log("bouton")
      if (bouton2.active == true) {
        bouton2.active = false; // on désactive le levier
        bouton2.flipX = false; // permet d'inverser l'image
        this.groupe_buissons.children.iterate(buisson => {
          buisson.disableBody(true, true);
      });
      this.appuyerSurBouton(player, this.groupe_buissons);
      }
      // sinon :  on l'active et stoppe la plateforme
      else {
        bouton2.active = true; // on active le levier 
        bouton2.flipX = true; // on tourne l'image du levier
      }
      //this.appuyerSurBouton(player, groupe_buissons);
    }

    /*if (this.score==5) {
      this.finDeJeu();
    }*/
  }

  gameOver() {
    // Afficher l'image de game over
    const gameOverImage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'img_gameOver').setScrollFactor(0);
    gameOverImage.setOrigin(0.5);
    this.scene.pause();
  }

  appuyerSurBouton(joueur, buissons) {
    //buissons.disableBody(true, true);
buissons.setVisible(false);

  }

  ramasserVelo(une_player, un_velo) {
    un_velo.disableBody(true, true);
    score += 1; // Augmente le score
    zone_texte_score.setText(score.toString()+ "/5"); // Met à jour le texte du score
}

  finDeJeu() {
    const gagner = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'img_fin').setScrollFactor(0);
    gagner.setOrigin(0.5);
    this.scene.pause();
  }

}


