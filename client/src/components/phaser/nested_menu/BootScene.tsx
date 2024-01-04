import Phaser from 'phaser'
export class BootScene extends Phaser.Scene {

    constructor() {
        super({ key: 'bootScene' })
    }

    // load resources
    preload() {
        // sound effects
        this.load.audio('menu_scroll', '/assets/nested_menu/SCROLL.ogg')
        this.load.audio('menu_select', '/assets/nested_menu/SELECT.ogg')
        this.load.audio('menu_deselect', '/assets/nested_menu/DESELECT.ogg')

        // dialogue box
        this.load.image('dialogueBox', '/assets/nested_menu/dialogueBox.png')
    }

    create() {
        // start title scene
        this.scene.start('titleScene')
    }


}