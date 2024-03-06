var bruit_de_click
export default class transition1 extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
        super({
        key: "transition1" //  ici on précise le nom de la classe en tant qu'identifiant
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
    
    this.load.image("img_accueilNatation", "src/assets/image_natation/accueil_natation.png")
    this.load.image("img_boutonFerme", "src/assets/image_natation/closed_button.png");  
    this.load.audio('click_sound', 'src/assets/musique/zipclick.flac');
    
    }

    create (){
        bruit_de_click=this.sound.add("click_sound");
        var imageOn=this.add.image(400,300,"img_accueilNatation");
        var buttonFerme=this.add.image(750,500,"img_boutonFerme");
        buttonFerme.setInteractive();
        buttonFerme.on('pointerdown', () => {
            bruit_de_click.play();
        this.scene.start("natation");
        
       });
     }

     update(){

     }
}