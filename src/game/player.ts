import * as Phaser from 'phaser';
import Egg from './Egg';

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config:any) {
        super(config.scene, config.x, config.y, config.texture);
        config.scene.add.existing(this);
        this.setDepth(1);
    }

    update = (keys:Phaser.Input.Keyboard.CursorKeys, velocity:integer) => {
        if (keys.left!.isDown) {
            this.setX(this.x - velocity);
        } else if (keys.right!.isDown) {
            this.setX(this.x + velocity);
        }
        if (keys.up!.isDown) {
            this.setY(this.y - velocity);
        } else if (keys.down!.isDown) {
            this.setY(this.y + velocity);
        }
        if (Phaser.Input.Keyboard.JustDown(keys.space!)) {
            this.layEgg();
        }
    }

    layEgg = () => {
        new Egg({
            scene: this.scene,
            x: this.x,
            y: this.y,
            texture: 'egg',
        });
    }
}
