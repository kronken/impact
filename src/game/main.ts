import * as Phaser from 'phaser';
import Scene from './Scene';

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
    scene: Scene,
};

new Phaser.Game(config);
