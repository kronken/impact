import * as Phaser from 'phaser';
import Player from './player';

class MyScene extends Phaser.Scene {
    player: Phaser.GameObjects.Image;
    keys: Phaser.Input.Keyboard.CursorKeys;

    preload = () => {
        this.load.setPath('images/');
        this.load.image('player', 'mario.png');
    }

    create = () => {
        this.player = new Player({
            scene: this,
            x: 400,
            y: 300,
            texture: 'player',
        });
        this.player.setScale(.2);

        this.keys = this.input.keyboard.createCursorKeys();
    }

    update = () => {
        this.player.update(this.keys, 3);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: MyScene,
};

new Phaser.Game(config);
