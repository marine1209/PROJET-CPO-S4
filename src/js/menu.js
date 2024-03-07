
var musique_de_fond;
var clav;
var bruit_de_click;
import velo from "/src/js/velo.js"; 
export default class menu extends Phaser.Scene {
    constructor() {
      super({ key: "menu" });
    }
    //on charge les images
    preload() {
      this.load.audio('musique_menu', 'src/assets/musique/musiqueIntro.OGG');  
      this.load.audio('click_sound', 'src/assets/musique/zipclick.flac');  
      this.load.image("menu_fond", "src/assets/menu_paris.jpg");
      this.load.image("logo","src/assets/image menu/logo.png");
      this.load.image("img_clavier", "src/assets/image menu/keyboard.png");
      this.load.image("imageBoutonPlay", "src/assets/image menu/black_play.png");
      this.load.image("imageMusiqueOn", "src/assets/image menu/black_musicOn.png");
      this.load.image("imageMusiqueOff", "src/assets/image menu/black_MusicOff.png");
      this.load.image("imageBoutonSetting", "src/assets/image menu/settings_button.png");
      
    }
  
    create() {
     // on place les éléments de fond
      this.add
        .image(0, 0, "menu_fond")
        .setOrigin(0)
        .setDepth(0);
      this.add.image(400,200,"logo");
      musique_de_fond = this.sound.add('musique_menu'); 
      musique_de_fond.play();
      bruit_de_click=this.sound.add("click_sound");
      //on ajoute un bouton de clic, nommé bouton_play
      var bouton_play = this.add.image(400, 300, "imageBoutonPlay").setDepth(1);
      var bouton_musiqueOff = this.add.image(550, 300, "imageMusiqueOff").setDepth(1);
      var bouton_reglage = this.add.image(250, 300, "imageBoutonSetting").setDepth(1);
      
      
      
      //=========================================================
      //on rend le bouton interratif
      bouton_play.setInteractive();
      bouton_musiqueOff.setInteractive();
      bouton_reglage.setInteractive();

      //paramétrage du bouton play
      //Cas ou la souris passe sur le bouton play
      bouton_play.on("pointerover", () => {
        bouton_play.setScale(1.2); 
      });
      bouton_play.on("pointerout", () => {
      bouton_play.setScale(1);
      });
      //Cas ou la souris clique sur le bouton play :
      bouton_play.on("pointerup", () => {
        bruit_de_click.play();
        this.scene.start("transition1");
        musique_de_fond.stop();
      });

      musique_de_fond.stop();

      //paramétrage du bouton musiqueON
      bouton_musiqueOff.on("pointerover", () => {
        bouton_musiqueOff.setScale(1.2);
        //bouton_musiqueOff.setVisible(false);
      });
      bouton_musiqueOff.on('pointerout', ()=> {
        bouton_musiqueOff.setScale(1);
      });
      bouton_musiqueOff.on("pointerup", () => {
        bruit_de_click.play();
        if (bouton_musiqueOff.texture.key === "imageMusiqueOff") {
          bouton_musiqueOff.setTexture("imageMusiqueOn");
          musique_de_fond.play(); 
          
      } else if (bouton_musiqueOff.texture.key === "imageMusiqueOn") {
          bouton_musiqueOff.setTexture("imageMusiqueOff");
          
          musique_de_fond.stop(); 
      }
      });

      //paramétrage bouton reglage
      bouton_reglage.on("pointerover", () => {
        bouton_reglage.setScale(1.2);
      });
      bouton_reglage.on("pointerup", () => {
        bruit_de_click.play()
        // Si l'image du clavier est déjà affichée, la cacher
        if (clav) {
            clav.destroy();
            clav = undefined; // Réinitialiser la variable
        } else {
            // Si l'image du clavier n'est pas affichée, l'afficher
            clav = this.add.image(400, 500, "img_clavier");
        }
    });

    }
  } 