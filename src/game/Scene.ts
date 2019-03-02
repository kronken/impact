import * as Phaser from 'phaser';
import Player from './player';

export default class Scene extends Phaser.Scene {
    player: Player;

    public preload() {
        this.load.tilemapTiledJSON('terrain', '/tilemap.json');
        this.load.image('tiles', '/images/OutdoorsTileset.png');
        this.load.image('player', '/images/mario.png');
    }

    public create() {
        this.cameras.main.setBackgroundColor('#15b502');

        // Setting background tilesets
        const map = this.make.tilemap({ key: 'terrain', tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage('OutdoorsTileset', 'tiles');
        map.createStaticLayer('Tile Layer 1', tileset, 0, 0).setScale(2);
        map.createStaticLayer('Tile Layer 2', tileset, 0, 0).setScale(2);
        map.createStaticLayer('Tile Layer 3', tileset, 0, 0).setScale(2);

        this.player = new Player({
            scene: this,
            x: 400,
            y: 300,
            texture: 'player',
        });
        this.player.setScale(.1);

    }

    public update() {
        this.player.update();
    }
}
