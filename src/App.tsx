import * as React from 'react';
import startGame from './game/main';

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
            <div className='ribbon-wrapper mobile-remove'>
                <div className='ribbon'>
                    <a>Join Today</a>
                </div>
            </div>
            <div className='nav'>
                <p className='App-intro'>
                { this.state.isShowingGame ? 'MAKE AN IMPACT!' : 'Hacker forum'}
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
            { this.state.isShowingGame && startGame() }
          </div>
        );
    }
}

export default App;
