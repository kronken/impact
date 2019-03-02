import * as Phaser from 'phaser';

export default class Egg extends Phaser.GameObjects.Sprite {
    constructor(config:any) {
        super(config.scene, config.x, config.y, config.texture);
        config.scene.add.existing(this);
        this.setScale(.7);
    }
}
