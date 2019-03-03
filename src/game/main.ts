import * as Phaser from 'phaser';
import MainScene from './Scene';
import GameOver from './GameOver';
import Win from './Win';

const config = {
    type: Phaser.AUTO,
    width: 992,
    height: 800,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {},
    },
    scene: [MainScene, GameOver, Win],
};

let game: Phaser.Game;

function start() {
    game = new Phaser.Game(config);
}

function win() {
    game.scene.getScene('main')['setEggsPurple']();
}

export {
    start,
    win,
};
