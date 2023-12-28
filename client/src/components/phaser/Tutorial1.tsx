import { useEffect } from 'react'
import Phaser from 'phaser'

class GameInstance extends Phaser.Scene {

    gameOver: boolean = false
    player: any = {}
    platforms: any = []
    stars: any = []
    bombs: any = []
    cursors: any = {}
    score: number = 0
    scoreText: any = {}

    collectStar(_player: any, star: any) {
        star.disableBody(true, true)
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score)
        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child: any) {
                child.enableBody(true, child.x, 0, true, true)
            })
            const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
            const bomb = this.bombs.create(x, 16, 'bomb')
            bomb.setBounce(1)
            bomb.setCollideWorldBounds(true)
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)

        }
    }

    hitBomb(player: any, bomb: any) {
        this.physics.pause()
        player.setTint(0xff0000)
        player.anims.play('turn')
        this.gameOver = true
    }

    preload() {
        this.load.image('sky', 'assets/sky.png')
        this.load.image('ground', 'assets/platform.png')
        this.load.image('star', 'assets/star.png')
        this.load.image('bomb', 'assets/bomb.png')
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
    }
    create() {
        this.add.image(400, 300, 'sky')

        // physics objects
        this.player = this.physics.add.sprite(100, 450, 'dude')
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)
        this.player.body.setGravityY(300)

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()
        this.platforms.create(600, 400, 'ground')
        this.platforms.create(50, 250, 'ground')
        this.platforms.create(750, 220, 'ground')

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        })
        this.stars.children.iterate(function (child: any) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })

        this.bombs = this.physics.add.group()


        // physics interactions

        // player
        this.physics.add.collider(this.player, this.platforms)

        // stars
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.overlap(this.player, this.stars, this.collectStar, () => {}, this)

        // bombs
        this.physics.add.collider(this.bombs, this.platforms)
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, () => {}, this)

        // animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        })     
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        // inputs
        this.cursors = this.input?.keyboard?.createCursorKeys()

        // hud
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px' })
    }
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)
            this.player.anims.play('left', true)
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160)
            this.player.anims.play('right', true)
        } else {
            this.player.setVelocityX(0)
            this.player.anims.play('turn')
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-500)
        }
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [GameInstance],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
}

const Game = () => {

    useEffect(() => {
        const game = new Phaser.Game(config)
    }, [])

    return (
        <div id='phaser-container'></div>
    )
}

export default Game