import * as Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
    gameOverText: Phaser.GameObjects.Text;
    constructor() {
        super('gameOver');
    }
    public preload() {
        this.gameOverText =
        this.add.text(
            476,
            400,
            'GAME OVER',
            {
                fontFamily: 'sans-serif',
                fontSize: '80px',
                fill: '#fff',
                align: 'center',
            },
        ).setOrigin(0.5);
        this.gameOverText.setDepth(1);
    }

    public create() {
        this.cameras.main.setBackgroundColor('#15b502');
    }
}
