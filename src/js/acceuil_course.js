
export default class acceuilCourse extends Phaser.Scene{
    constructor() {
        super({ key: "acceuilCourse" });

      }

    preload (){
        this.load.image ("img_acceuil", "src/assets/image_course/img_acceuil.png")
    this.load.image("img_boutonFerme", "src/assets/image_natation/closed_button.png");  
    }
    
     create (){
        var imageOn=this.add.image(400,300,"img_acceuil");
        var buttonFerme=this.add.image(750,500,"img_boutonFerme");
        buttonFerme.setInteractive();
        buttonFerme.on('pointerdown', () => {
        this.scene.start("course");
        
       });
     }
     
     

}