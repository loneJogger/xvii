import Phaser from 'phaser'

const TEXT_STYLE = { color: '#ffffff', align: 'left', fontSize: 16}

type OptionData = {
    text: string,
    emitCode: string,
    args?: any[]
}

export class Menu extends Phaser.GameObjects.Container {

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        optionsData?: OptionData[]
    ) {
        super(scene, x, y)
        this.index = 0
        this.options = []
        const box = this.scene.add.image(240,28, 'dialogueBox')
        this.add(box)
        this.scrollSound = this.scene.sound.add('menu_scroll')
        this.selectSound = this.scene.sound.add('menu_select')
        if (optionsData) {
            for (let i = 0; i < optionsData.length; i++) {
                const option = new MenuOption(
                    this.scene, 
                    208, 
                    i * 20, optionsData[i].text,
                    optionsData[i].emitCode,
                    optionsData[i].args
                )
                this.options.push(option)
                this.add(option)
            }
            this.options[this.index].focus()
        }
    }

    public options: MenuOption[]
    public index: number
    public scrollSound
    public selectSound

    moveChoiceUp () {
        this.scrollSound.play()
        this.options[this.index].unfocus()
        this.index--
        if (this.index < 0) {
            this.index = this.options.length - 1
        }
        this.options[this.index].focus()
    }

    moveChoiceDown () {
        this.scrollSound.play()
        this.options[this.index].unfocus()
        this.index++
        if (this.index >= this.options.length) {
            this.index = 0
        }
        this.options[this.index].focus()
    }

    resetMenu () {
        this.index = 0
        for (let i = 0; i < this.options.length; i++) {
            this.options[i].unfocus()
        }
        this.options[this.index].focus()
    }

    hideMenu () {
        this.visible = false
        this.active = false
    }

    showMenu () {
        this.visible = true
        this.active = true
    }

    select () {
        this.selectSound.play()
        if (this.options[this.index].args.length > 0) {
            this.scene.events.emit(this.options[this.index].emitCode, this.options[this.index].args)
        } else {
            this.scene.events.emit(this.options[this.index].emitCode)
        }
    }
}

export class MenuOption extends Phaser.GameObjects.Text {

    constructor(
        scene: Phaser.Scene, 
        x: number,
        y: number,
        text: string,
        emitCode: string,
        args?: any[]
    ) {
        super(scene, x, y, text, TEXT_STYLE)
        this.emitCode = emitCode
        this.args = args || []
        // this.setFont('"Anon"')
    }

    public emitCode: string
    public args: any[]

    focus () {
        this.setColor('#eab4d5')
    }

    unfocus () {
        this.setColor('#fceef2')
    }
}