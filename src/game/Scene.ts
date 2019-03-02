import * as Phaser from 'phaser';

export default class Scene extends Phaser.Scene {
    public preload() {

    }

    public create() {
        this.cameras.main.setBackgroundColor('#15b502');

    }

    public update() {
        // Update logic
        console.log('asd');
    }
}
