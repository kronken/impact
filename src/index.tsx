import * as React from 'react';
import * as Phaser from 'phaser';
import * as ReactDOM from 'react-dom';

interface IEggParams {
    scene: Phaser.Scene;
    x: number; y: number;
    texture: string;
    frame?: string | number | undefined;
}

class Egg {
    sprite: Phaser.Physics.Arcade.Sprite;
    wasRotated: Date;
    isRotated: boolean;

    constructor(config: IEggParams) {
        this.sprite = config.scene.physics.add.sprite(config.x, config.y, config.texture);
        this.sprite.setScale(.7);
        this.sprite.setBounce(1, 1);
        this.sprite.setCollideWorldBounds(true);
        this.wasRotated = new Date();
        this.isRotated = false;
    }

    public update() {
        const now = new Date();
        if (now.getTime() - this.wasRotated.getTime() > 500) {
            this.sprite.setRotation(this.isRotated ? 0 : 0.3);
            this.isRotated = !this.isRotated;
            this.wasRotated = new Date();
        }
    }

    public setAsPurple() {
        this.sprite.setTexture('purpleEgg');
    }
}

class GameOver extends Phaser.Scene {
    gameOverText: Phaser.GameObjects.Text;
    constructor() {
        super('gameOver');
    }
    public preload() {
        this.gameOverText =
      this.add.text(
          476,
          400,
          'GAME OVER',
          {
              fontFamily: 'sans-serif',
              fontSize: '80px',
              fill: '#fff',
              align: 'center',
          },
      ).setOrigin(0.5);
        this.gameOverText.setDepth(1);
    }

    public create() {
        this.cameras.main.setBackgroundColor('#000000');
    }
}

class Win extends Phaser.Scene {
    winText: Phaser.GameObjects.Text;
    constructor() {
        super('win');
    }
    public preload() {
        this.winText =
      this.add.text(
          476,
          400,
          'YOU WIN!',
          {
              fontFamily: 'sans-serif',
              fontSize: '80px',
              fill: '#fff',
              align: 'center',
          },
      ).setOrigin(0.5);
        this.winText.setDepth(1);
    }

    public create() {
        this.cameras.main.setBackgroundColor('#7473BD');
    }
}

interface ISpriteParams {
    scene: Phaser.Scene;
    x: number; y: number;
    texture: string;
    frame?: string | number | undefined;
    addEgg: (x: number, y: number) => void;
}

class Player {
    keys: Phaser.Input.Keyboard.CursorKeys;
    sprite: Phaser.Physics.Arcade.Sprite;
    scene: Phaser.Scene;
    addEgg: (x: number, y: number) => void;

    constructor(config: ISpriteParams) {
        this.addEgg = config.addEgg;
        this.scene = config.scene;
        this.sprite = config.scene.physics.add.sprite(100, 450, config.texture);

        this.sprite.setCollideWorldBounds(true);
        this.sprite.flipX = true;
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
            this.sprite.flipX = false;
        } else if (this.keys.right!.isDown) {
            this.sprite.body.velocity.x = vel;
            this.sprite.body.velocity.y = 0;
            this.sprite.flipX = true;
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

class Scene extends Phaser.Scene {
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
        if (this.hasWon) {
            this.scene.start('win');
        } else {
            this.scene.start('gameOver');
        }
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

const config = {
    type: Phaser.AUTO,
    width: 992,
    height: 800,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {},
    },
    scene: [Scene, GameOver, Win],
};

let game: Phaser.Game;

function start() {
    game = new Phaser.Game(config);
}

function win() {
    game.scene.getScene('main')['setEggsPurple']();
}

interface IAppProps {}

interface IAppState {
    isShowingGame: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            isShowingGame: false,
        };
    }

    private toggle = () => {
        this.setState({ isShowingGame: !this.state.isShowingGame });
    }

    public render() {
        return (
          <div className='App'>
<style>
{`
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: black;
  background-image: url("/images/matrix.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
}

html {
  width: 100vw;
  height: 100vh;
}

.App-intro {
  background-color: black;
  margin: 0;
  padding: 12px;
  color: green;
  text-align: center;
  font-weight: 900;
  font-size: 20px;
}

#game {
  position: fixed;
  margin-left: -500px;
  left: 50%;
  top: 67px;
}

canvas {
}

.images {
  margin: 0 auto;
  width: 680px;
}

.images > img {
  margin: 20px;
}

.content {
  width: 1000px;
  margin: 0 auto;
  background-color: #7b8e01;
  padding: 35px;
  box-sizing: border-box;
  border-radius: 18px;
  box-shadow: 0px 0px 15px black;
}

.header {


}

.code {
  background-color: wheat;
  padding: 10px;
  border-radius: 4px;
  margin: 12px;
  color: black;
  white-space: pre;
}

.buttons {
  text-align: right;
}

.card {
  padding: 10px;
  background-color: black;
  border-radius: 4px;
  color: #8cdd0c;
  margin-bottom: 10px;
}

.ribbon-wrapper {
  width: 110px;
  height: 120px;
  overflow: hidden;
  position: absolute;
  top: -3px;
  right: -3px;
}

.ribbon {
  font: bold 15px Sans-Serif;
  color: #333;
  text-align: center;
  text-shadow: rgba(255,255,255,0.5) 0px 1px 0px;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  position: relative;
  padding: 15px 0;
  left: -5px;
  top: 15px;
  width: 160px;
  background-color: #fff;
  background-image: -webkit-linear-gradient(top, #36d900, #00b360);
  background-image: -moz-linear-gradient(top, #36d900, #00b360);
  background-image: -ms-linear-gradient(top, #36d900, #00b360);
  background-image: -o-linear-gradient(top, #36d900, #00b360);
  color: #fff;
  -webkit-box-shadow: 0px 0px 3px rgba(0,0,0,0.3);
  -moz-box-shadow: 0px 0px 3px rgba(0,0,0,0.3);
  box-shadow: 0px 0px 3px rgba(0,0,0,0.3);
}

.credits {
  height: 50px;
  width: 200px;
  position: fixed;
  right: 0;
  font-size: 17px;
  color: #ff002d;
  bottom: 0;
  font-weight: 900;
}
`}
</style>
            <div className='ribbon-wrapper mobile-remove'>
                <div className='ribbon'>
                    <a>Join Today</a>
                </div>
            </div>
            <div className='nav'>
                <p className='App-intro'>
                { this.state.isShowingGame
                    ? <span onClick={win}>Make an Impact!</span> : 'Hacker forum'}
                </p>
            </div>
            <div className='images'>
                <img src='https://hackforums.net/uploads/mam/14.gif'/>
                <img src='https://hackforums.net/uploads/mam/39.gif'/>
            </div>
            <div className='content'>
                <div className='card'>
                    <div className='header'>
                        Hanne committed, 2.3.2019
                    </div>
                    <div className='code'>
{`
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
);

`}
                    </div>
                    <div className='buttons'>
                        <button onClick={this.toggle}>Comment</button>
                    </div>
                </div>
                <div className='card'>
                    <div className='header'>
                        Joakim committed, 2.3.2019
                    </div>
                    <div className='code'>
{`
import * as Phaser from 'phaser';

interface ISpriteParams {
    scene: Phaser.Scene;
    x: number; y: number;
    texture: string;
    frame?: string | number | undefined;
}

export default class Egg {
    sprite: Phaser.Physics.Arcade.Sprite;
    wasRotated: Date;
    isRotated: boolean;

    constructor(config: ISpriteParams) {
        this.sprite = config.scene.physics.add.sprite(config.x, config.y, config.texture);
        this.sprite.setScale(.7);
        this.sprite.setBounce(1, 1);
        this.sprite.setCollideWorldBounds(true);
        this.wasRotated = new Date();
        this.isRotated = false;
    }

    public update() {
        const now = new Date();
        if (now.getTime() - this.wasRotated.getTime() > 500) {
            this.sprite.setRotation(this.isRotated ? 0 : 0.3);
            this.isRotated = !this.isRotated;
            this.wasRotated = new Date();
        }
    }
}
`}
                    </div>
                    <div className='buttons'>
                        <button onClick={this.toggle}>Comment</button>
                    </div>
                </div>
                <div className='card'>
                    <div className='header'>
                        Hanne committed, 2.3.2019
                    </div>
                    <div className='code'>
{`
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
        this.sprite.flipX = true;
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
            this.sprite.flipX = false;
        } else if (this.keys.right!.isDown) {
            this.sprite.body.velocity.x = vel;
            this.sprite.body.velocity.y = 0;
            this.sprite.flipX = true;
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
`}
                    </div>
                    <div className='buttons'>
                        <button onClick={this.toggle}>Comment</button>
                    </div>
                </div>
                <div className='card'>
                    <div className='header'>
                        Joakim committed, 2.3.2019
                    </div>
                    <div className='code'>
{`
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

`}
                    </div>
                    <div className='buttons'>
                        <button onClick={this.toggle}>Comment</button>
                    </div>
                </div>
            </div>
            <div id='game' className='' />
            { this.state.isShowingGame && start() }
            <div className='credits'>
              Music by Eric Matyas
              www.soundimage.org
            </div>
          </div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
);
