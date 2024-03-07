
var bruit_de_click;
var bruit_de_fond;

export default class accueil_victoire extends Phaser.Scene{
    constructor() {
        super({ key: "accueil_victoire" });

      }

    preload (){
      this.load.audio('musique_win', 'src/assets/musique/music_win.ogg'); 
      this.load.image ("img_victoire", "src/assets/imageVictoire.png")
      this.load.image("img_boutonFerme", "src/assets/image_natation/closed_button.png");  
      this.load.audio('click_sound', 'src/assets/musique/zipclick.flac');
    }
    
     create (){
        
        
        bruit_de_fond=this.sound.add("musique_win");
        bruit_de_fond.play();
        bruit_de_click=this.sound.add("click_sound");
        var imageOn=this.add.image(400,300,"img_victoire");
        var buttonFerme=this.add.image(750,500,"img_boutonFerme");
        buttonFerme.setInteractive();
        buttonFerme.on('pointerdown', () => {
          
          bruit_de_click.play();
        this.scene.start("menu");
        
       });
       //bruit_de_fond.stop();*/
     }
    
     
     

}