import * as Phaser from 'phaser';
import MainScene from './Scene';
import GameOver from './GameOver';

const config = {
    type: Phaser.AUTO,
    width: 992,
    height: 800,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {},
    },
    scene: [MainScene, GameOver],
};

export default function start() {
    new Phaser.Game(config);
}
