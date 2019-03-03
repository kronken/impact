import * as Phaser from 'phaser';
import Player from './Player';
import Egg from './Egg';

export default class Scene extends Phaser.Scene {
    player: Player;
    eggs: Egg[] = [];
    song: Phaser.Sound.BaseSound;
    timerText: Phaser.GameObjects.Text;
    gameEndTime: Date;
    eggTexture: string;
    hasWon: boolean;

    constructor() {
        super('main');
        this.eggTexture = 'blackEgg';
        this.hasWon = false;
    }

    public preload() {
        this.load.tilemapTiledJSON('terrain', '/tilemap.json');
        this.load.image('tiles', '/images/OutdoorsTileset.png');
        this.load.image('purpleEgg', '/images/purple-egg.png');
        this.load.image('blackEgg', '/images/black-egg.png');
        this.load.spritesheet(
            'player',
            '/images/duck-sprite.png',
            {
                frameWidth: 64,
                frameHeight: 64,
            },
        );
        this.load.audio('theme', '/sounds/After-the-Invasion.mp3');
        this.timerText = this.add.text(20, 20, '')
            .setFontSize(40)
            .setFontFamily('sans-serif')
            .setColor('red')
            .setOrigin(0);
        this.timerText.setDepth(2);
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

        this.song = this.sound.add('theme');
        this.song.play();
        const timerDuration = this.song.totalDuration * 1000;
        this.gameEndTime = new Date();
        this.gameEndTime.setTime(this.gameEndTime.getTime() + timerDuration);
    }

    public update() {
        this.player.update();
        this.eggs.forEach(egg => egg.update());

        if (this.song.isPlaying) {
            const timeUntilEnd = this.gameEndTime.getTime() - (new Date()).getTime();
            const secondsUntilEnd = Math.floor(timeUntilEnd / 1000);
            this.timerText.setText(this.secondsToMinutesAndSeconds(secondsUntilEnd));
        } else {
            this.gameOver();
        }
    }

    public addEgg = (x: number, y: number) => {
        const egg = new Egg({
            x,
            y,
            scene: this,
            texture: this.eggTexture,
        });
        this.physics.add.collider(this.player.sprite, egg.sprite);
        this.eggs.push(egg);
    }

    public gameOver = () => {
        this.scene.start('gameOver');
    }

    public setEggsPurple = () => {
        this.eggTexture = 'purpleEgg';
        this.hasWon = true;
        this.eggs.forEach(egg => egg.setAsPurple());
    }

    secondsToMinutesAndSeconds = (seconds:integer) => {
        const remainderSeconds = seconds % 60;
        return (seconds - remainderSeconds)
        / 60 + (9 < remainderSeconds ? ':' : ':0') + remainderSeconds;
    }
}
