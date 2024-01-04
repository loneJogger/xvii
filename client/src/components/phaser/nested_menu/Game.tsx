import { useEffect } from 'react'
import Phaser from 'phaser'
import { BootScene } from './BootScene'
import { TitleScene } from './TitleScene'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    width: 480,
    height: 320,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, TitleScene],
}

export const NestedMenuPhaser = () => {

    useEffect(() => {
        const game = new Phaser.Game(config)
    }, [])

    return (
        <div id='phaser-container'></div>
    )
}