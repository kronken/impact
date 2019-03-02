import * as Phaser from 'phaser';

class Player extends Phaser.GameObjects.Sprite {
    constructor(config:any) {
        super(config.scene, config.x, config.y, config.texture);
        config.scene.add.existing(this);
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
    }
}
export default Player;
