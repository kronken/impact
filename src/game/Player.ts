interface ISpriteParams {
    scene: Phaser.Scene;
    x: number; y: number;
    texture: string;
    frame?: string | number | undefined;
    addEgg: (x: number, y: number) => void;
}

export default class Player {
    keys: Phaser.Input.Keyboard.CursorKeys;
    sprite: Phaser.Physics.Arcade.Sprite;
    scene: Phaser.Scene;
    addEgg: (x: number, y: number) => void;

    constructor(config: ISpriteParams) {
        this.addEgg = config.addEgg;
        this.scene = config.scene;
        this.sprite = config.scene.physics.add.sprite(100, 450, config.texture);

        this.sprite.setCollideWorldBounds(true);
        this.sprite.setDepth(1);

        this.keys = config.scene.input.keyboard.createCursorKeys();
    }

    public update() {
        const vel = 100;

        if (this.keys.down!.isDown) {
            this.sprite.body.velocity.y = vel;
            this.sprite.body.velocity.x = 0;
        } else if (this.keys.up!.isDown) {
            this.sprite.body.velocity.y = -vel;
            this.sprite.body.velocity.x = 0;
        } else if (this.keys.left!.isDown) {
            this.sprite.body.velocity.x = -vel;
            this.sprite.body.velocity.y = 0;
        } else if (this.keys.right!.isDown) {
            this.sprite.body.velocity.x = vel;
            this.sprite.body.velocity.y = 0;
        } else {
            this.sprite.body.velocity.y = 0;
            this.sprite.body.velocity.x = 0;
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.up!)
            || Phaser.Input.Keyboard.JustDown(this.keys.down!)
            || Phaser.Input.Keyboard.JustDown(this.keys.left!)
            || Phaser.Input.Keyboard.JustDown(this.keys.right!)) {
            this.sprite.anims.play('walk');
        }

        if (Phaser.Input.Keyboard.JustUp(this.keys.up!)
        || Phaser.Input.Keyboard.JustUp(this.keys.down!)
        || Phaser.Input.Keyboard.JustUp(this.keys.left!)
        || Phaser.Input.Keyboard.JustUp(this.keys.right!)) {
            this.sprite.anims.play('idle');
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.space!)) {
            this.addEgg(this.sprite.x, this.sprite.y);
        }
    }
}
