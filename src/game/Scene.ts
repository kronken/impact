import * as Phaser from 'phaser';
import Player from './Player';
import Egg from './Egg';

export default class Scene extends Phaser.Scene {
    player: Player;
    eggs: Egg[] = [];

    public preload() {
        this.load.tilemapTiledJSON('terrain', '/tilemap.json');
        this.load.image('tiles', '/images/OutdoorsTileset.png');
        this.load.image('egg', '/images/purple-egg.png');
        this.load.spritesheet(
            'player',
            '/images/duck-sprite.png',
            {
                frameWidth: 64,
                frameHeight: 64,
            },
        );
    }

    public create() {
        this.cameras.main.setBackgroundColor('#15b502');

        // Setting background tilesets
        const map = this.make.tilemap({ key: 'terrain', tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage('OutdoorsTileset', 'tiles');
        map.createStaticLayer('Tile Layer 1', tileset, 0, 0).setScale(2);
        map.createStaticLayer('Tile Layer 2', tileset, 0, 0).setScale(2);
        map.createStaticLayer('Tile Layer 3', tileset, 0, 0).setScale(2);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 11 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1,
        });

        this.player = new Player({
            scene: this,
            x: 400,
            y: 300,
            texture: 'player',
            addEgg: this.addEgg,
        });
    }

    public update() {
        this.player.update();
        this.eggs.forEach(egg => egg.update());
    }

    public addEgg = (x: number, y: number) => {
        const egg = new Egg({
            x,
            y,
            scene: this,
            texture: 'egg',
        });
        this.physics.add.collider(this.player.sprite, egg.sprite);
        this.eggs.push(egg);
    }
}
