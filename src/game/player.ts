import * as Phaser from 'phaser';

const MOVEMENT_SPEED = 3;

class Player extends Phaser.GameObjects.Sprite {
    keys: Phaser.Input.Keyboard.CursorKeys;

    constructor(config:any) {
        super(config.scene, config.x, config.y, config.texture);
        config.scene.add.existing(this);

        this.keys = config.scene.input.keyboard.createCursorKeys();
    }

    public update() {
        if (this.keys.left!.isDown) {
            this.setX(this.x - MOVEMENT_SPEED);
        } else if (this.keys.right!.isDown) {
            this.setX(this.x + MOVEMENT_SPEED);
        }
        if (this.keys.up!.isDown) {
            this.setY(this.y - MOVEMENT_SPEED);
        } else if (this.keys.down!.isDown) {
            this.setY(this.y + MOVEMENT_SPEED);
        }
    }
}
export default Player;
