import * as Phaser from 'phaser';
import Scene from './Scene';

const config = {
    type: Phaser.AUTO,
    width: 992,
    height: 800,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {},
    },
    scene: Scene,
};

new Phaser.Game(config);
