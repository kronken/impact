import * as Phaser from 'phaser';
import Egg from './Egg';

const MOVEMENT_SPEED = 3;

export default class Player extends Phaser.GameObjects.Sprite {
    keys: Phaser.Input.Keyboard.CursorKeys;

    constructor(config:any) {
        super(config.scene, config.x, config.y, config.texture);
        config.scene.add.existing(this);
        this.setDepth(1);

        this.keys = config.scene.input.keyboard.createCursorKeys();
    }

    public update() {
        if (this.keys.left!.isDown) {
            this.setX(this.x - MOVEMENT_SPEED);
            this.anims.play('walk');
        } else if (this.keys.right!.isDown) {
            this.setX(this.x + MOVEMENT_SPEED);
            this.anims.play('walk');
        }
        if (this.keys.up!.isDown) {
            this.setY(this.y - MOVEMENT_SPEED);
            this.anims.play('walk');
        } else if (this.keys.down!.isDown) {
            this.setY(this.y + MOVEMENT_SPEED);
            this.anims.play('walk');
        }
        if (Phaser.Input.Keyboard.JustDown(this.keys.space!)) {
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
