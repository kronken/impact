import * as Phaser from 'phaser';

export default class Win extends Phaser.Scene {
    winText: Phaser.GameObjects.Text;
    constructor() {
        super('win');
    }
    public preload() {
        this.winText =
        this.add.text(
            476,
            400,
            'YOU WIN!',
            {
                fontFamily: 'sans-serif',
                fontSize: '80px',
                fill: '#fff',
                align: 'center',
            },
        ).setOrigin(0.5);
        this.winText.setDepth(1);
    }

    public create() {
        this.cameras.main.setBackgroundColor('#7473BD');
    }
}
