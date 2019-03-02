import * as Phaser from 'phaser';
import Player from './Player';

export default class Scene extends Phaser.Scene {
    player: Phaser.GameObjects.Image;

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
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1,
        });

        this.player = new Player({
            scene: this,
            x: 400,
            y: 300,
            texture: 'player',
        });
    }

    public update() {
        this.player.update();
    }
}
