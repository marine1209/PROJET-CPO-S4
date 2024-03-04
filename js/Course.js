export default class Course extends Phaser.scene {
    constructor(){
        super ({
            key : "course"
        });
    }

preload (){
   this.preload.image ("tuile_terre1", "src/assets/image_course/1.png");
   this.preload.image ("tuile_terre2", "src/assets/image_course/2.png");
   this.preload.image ("tuile_terre3", "src/assets/image_course/3.png");
   this.preload.image ("tuile_terre5", "src/assets/image_course/5.png");
   this.preload.image ("tuile_terre13", "src/assets/image_course/13.png");
   this.preload.image ("tuile_terre14", "src/assets/image_course/14.png");
   this.preload.image ("tuile_terre15", "src/assets/image_course/15.png");
   this.preload.image ("eau", "src/assets/image_course/17.png");
   this.preload.image ("background", "src/assets/image_course/BG.png");
   this.preload.image ("buisson1", "src/assets/image_course/Bush (1).png");
   this.preload.image ("pierre", "src/assets/image_course/Stone.png");
   this.preload.image ("arbre1", "src/assets/image_course/Tree_2.png");
   this.preload.tilemapTiledJSON ("carte_course", "src/assets/image_course/MAP COURSE.tmj");
   this.preload.image("img_perso", "src/assets/sportifs.png");
}

create(){
    //création de la map
    const map = this.add.tilemap("carte_course") ; 
    const tileset1 = map.addTilesetImage ("13", "tuile_terre13");
    const tileset2 = map.addTilesetImage ("15", "tuile_terre15");
    const tileset3 = map.addTilesetImage ("BG", "background");
    const tileset4 = map.addTilesetImage ("Bush(1)", "buisson1");
    const tileset5 = map.addTilesetImage ("eau", "eau");
    const tileset6 = map.addTilesetImage ("Stone", "pierre");
    const tileset7 = map.addTilesetImage ("terre", "tuile_terre2");
    const tileset8 = map.addTilesetImage ("terre1", "tuile_terre1");
    const tileset9 = map.addTilesetImage ("terre2", "tuile_terre2");
    const tileset10 = map.addTilesetImage ("terre3", "tuile_terre3");
    const tileset11 = map.addTilesetImage ("Tree_2", "arbre1");
    const calque1 = map.createDynamicLayer("arrière plan", [tileset3]);
    const calque2 = map.createDynamicLayer("terre", [tileset1,tileset7,tileset8,tileset9,tileset10,tileset2]);
    const calque3 = map.createDynamicLayer("ravaitaillements", [tileset6]);
    const calque4 = map.createDynamicLayer ("arbres et buissons", [tilset11, tileset4]);
    //creation des animations pour le personnage
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

   
}
update (){

}

}