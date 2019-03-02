import * as Phaser from 'phaser';

interface ISpriteParams {
    scene: Phaser.Scene;
    x: number; y: number;
    texture: string;
    frame?: string | number | undefined;
}

export default class Egg {
    sprite: Phaser.Physics.Arcade.Sprite;

    constructor(config: ISpriteParams) {
        this.sprite = config.scene.physics.add.sprite(config.x, config.y, config.texture);
        this.sprite.setScale(.7);
        this.sprite.setBounce(1, 1);
        this.sprite.setCollideWorldBounds(true);
    }

    public update() {

    }
}
