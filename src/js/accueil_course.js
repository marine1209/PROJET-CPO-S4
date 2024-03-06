import Course from "/src/js/Course.js";
var bruit_de_click;
export default class accueil_course extends Phaser.Scene{
    constructor() {
        super({ key: "accueil_course" });

      }

    preload (){
      this.load.image ("img_accueil", "src/assets/image_course/img_acceuil.png")
      this.load.image("img_boutonFerme", "src/assets/image_natation/closed_button.png");  
      this.load.audio('click_sound', 'src/assets/musique/zipclick.flac');
    }
    
     create (){
        bruit_de_click=this.sound.add("click_sound");
        var imageOn=this.add.image(400,300,"img_accueil");
        var buttonFerme=this.add.image(750,500,"img_boutonFerme");
        buttonFerme.setInteractive();
        buttonFerme.on('pointerdown', () => {
          bruit_de_click.play();
        this.scene.start("course");
        
       });
     }
     
     

}