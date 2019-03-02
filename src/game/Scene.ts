import * as Phaser from 'phaser';

export default class Scene extends Phaser.Scene {
    public preload() {
        this.load.tilemapTiledJSON('terrain', '/tilemap.json');
        this.load.image('tiles', '/images/OutdoorsTileset.png');
    }

    public create() {
        this.cameras.main.setBackgroundColor('#15b502');

        // Setting background tilesets
        const map = this.make.tilemap({ key: 'terrain', tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage('OutdoorsTileset', 'tiles');
        map.createStaticLayer('Tile Layer 1', tileset, 0, 0).setScale(2);
        map.createStaticLayer('Tile Layer 2', tileset, 0, 0).setScale(2);
        map.createStaticLayer('Tile Layer 3', tileset, 0, 0).setScale(2);
    }

    public update() {
        // Update logic
    }
}
