import Phaser from 'phaser'
import { Menu } from './Menu'

const mainMenuOptions = [
    {
        text: 'New Game',
        emitCode: 'SELECT_NEW_GAME',
    },
    {
        text: 'Continue',
        emitCode: 'SELECT_CONTINUE',
    },
    {
        text: 'Settings',
        emitCode: 'SELECT_SETTINGS'
    }
]

const newGameOptions = [
    {
        text: 'Easy',
        emitCode: 'START_NEW_EASY'
    },
    {
        text: 'Normal',
        emitCode: 'START_NEW_NORMAL'
    },
    {
        text: 'Hard',
        emitCode: 'START_NEW_HARD'
    }
]

export class TitleScene extends Phaser.Scene {

    constructor() {
        super({ key: 'titleScene' })
        this.menus = {} as Phaser.GameObjects.Container
        this.currentMenu = {} as Menu
        this.menuHistory = []
        this.mainMenu = {} as Menu
        this.newGameMenu = {} as Menu
    }

    public menus: Phaser.GameObjects.Container
    public currentMenu: Menu
    public menuHistory: Menu[]
    public mainMenu: Menu
    public newGameMenu: Menu
    public deselectSound?: any

    create () {
        // draw background
        this.cameras.main.setBackgroundColor('#110307')

        // menus
        this.menus = this.add.container()
        this.mainMenu = new Menu(this, 0, 240, mainMenuOptions)
        this.newGameMenu = new Menu(this, 0, 240, newGameOptions)

        this.newGameMenu.hideMenu()
        this.currentMenu = this.mainMenu
        this.menuHistory.push(this.mainMenu)

        this.menus.add(this.mainMenu)
        this.menus.add(this.newGameMenu)

        // keyboard input
        this.input.keyboard?.on('keydown', this.onKeyInput, this)

        // events
        this.events.on('SELECT_NEW_GAME', this.goToNewGameMenu, this)

        // sound effects
        this.deselectSound = this.sound.add('menu_deselect')
    }

    goToPreviousMenu () {
        if (this.menuHistory.length > 1) {
            this.deselectSound.play()
            const cancelledMenu = this.menuHistory.pop()
            const previousMenu = this.menuHistory[this.menuHistory.length - 1]
            cancelledMenu?.resetMenu()
            cancelledMenu?.hideMenu()
            this.currentMenu = previousMenu
            previousMenu.showMenu()
        }
    }

    onKeyInput (keyEvent: KeyboardEvent) {
        if (keyEvent.code === 'ArrowUp') {
            this.currentMenu.moveChoiceUp()
        } else if (keyEvent.code === 'ArrowDown') {
            this.currentMenu.moveChoiceDown()
        } else if (keyEvent.code === 'KeyZ') {
            this.currentMenu.select()
        } else if (keyEvent.code === 'KeyX') {
            this.goToPreviousMenu()
        }
    }

    goToNewGameMenu () {
        this.menuHistory.push(this.newGameMenu)
        this.currentMenu = this.newGameMenu
        this.newGameMenu.showMenu()
        this.mainMenu.hideMenu()
    }
}