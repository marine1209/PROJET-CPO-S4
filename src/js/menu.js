
export default class menu extends Phaser.Scene {
    constructor() {
      super({ key: "menu" });
    }
    //on charge les images
    preload() {
      this.load.image("menu_fond", "src/assets/image menu/menu_fond_2.jpg");
      this.load.image("imageBoutonPlay", "src/assets/image menu/black_play.png");
      //this.load.image("imageBoutonConfig", "src/assets/image menu/black_config.png"); 
      this.load.image("imageMusiqueOn", "src/assets/image menu/black_musicOn.png");
      this.load.image("imageMusiqueOff", "src/assets/image menu/black_MusicOff.png");
      this.load.image("imageBoutonSetting", "src/assets/image menu/settings_button.png");
      this.load.image("img_livre","src/assets/image menu/book.png");
    }
  
    create() {
     // on place les éléments de fond
      this.add
        .image(0, 0, "menu_fond")
        .setOrigin(0)
        .setDepth(0);
  
      //on ajoute un bouton de clic, nommé bouton_play
      var bouton_play = this.add.image(400, 300, "imageBoutonPlay").setDepth(1);
      var bouton_musiqueOn = this.add.image(550, 300, "imageMusiqueOn").setDepth(1);
      var bouton_reglage = this.add.image(250, 300, "imageBoutonSetting").setDepth(1);
      
      
      //=========================================================
      //on rend le bouton interratif
      bouton_play.setInteractive();
      bouton_musiqueOn.setInteractive();
      bouton_reglage.setInteractive();
      //Cas ou la souris passe sur le bouton play
      bouton_play.on("pointerover", () => {
        bouton_play.setScale(1.2); 
      });
      bouton_musiqueOn.on("pointerover", () => {
        bouton_musiqueOn.setScale(1.2);
        
       
      });
      bouton_reglage.on("pointerover", () => {
        bouton_reglage.setScale(1.2);
      });
      //Cas ou la sourris clique sur le bouton play :
      // on lance le niveau 1
      bouton_play.on("pointerup", () => {
        this.scene.start("natation");
      });
      //Cas ou la sourris clique sur le bouton play :
      // on lance le niveau 1
      bouton_musiqueOn.on("pointerup", () => {
        bouton_musiqueOn.setTexture("imageMusiqueOff");
          
      });
    
      //Cas ou la souris ne passe plus sur le bouton play
      bouton_play.on("pointerout", () => {
      bouton_play.setScale(1);
      });
      
  
  
      //Cas ou la sourris clique sur le bouton play :
      // on lance le niveau 1
      bouton_play.on("pointerup", () => {
        
        this.scene.start("natation");
      });
    }
  } 