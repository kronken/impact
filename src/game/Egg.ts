import * as Phaser from 'phaser';

interface ISpriteParams {
    scene: Phaser.Scene;
    x: number; y: number;
    texture: string;
    frame?: string | number | undefined;
}

export default class Egg {
    sprite: Phaser.Physics.Arcade.Sprite;
    wasRotated: Date;
    isRotated: boolean;

    constructor(config: ISpriteParams) {
        this.sprite = config.scene.physics.add.sprite(config.x, config.y, config.texture);
        this.sprite.setScale(.7);
        this.sprite.setBounce(1, 1);
        this.sprite.setCollideWorldBounds(true);
        this.wasRotated = new Date();
        this.isRotated = false;
    }

    public update() {
        const now = new Date();
        if (now.getTime() - this.wasRotated.getTime() > 500) {
            this.sprite.setRotation(this.isRotated ? 0 : 0.3);
            this.isRotated = !this.isRotated;
            this.wasRotated = new Date();
        }
    }
}
