import 'phaser';

export class WelcomeScene extends Phaser.Scene {
    title: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: 'WelcomeScene'
        });
    }

    create(): void {
        this.title = this.add.text(100, 200, 'Infection', {font: '100px Arial Bold', fill: '#FBFBAC'});
        var hintText: string = 'Click to start';
        this.hint = this.add.text(300, 350, hintText, {font: '24px Arial Bold', fill: '#FBFBAC'});
        this.input.on('pointerdown', function (/*pointer*/) {
            this.scene.start('GameScene');
        }, this);

        this.add.text(200, 400, 'Убий бацил пробєлом!', {font: '24px Arial Bold', fill: '#FBFBAC'});
        this.add.text(150, 500, 'Use arrow keys to move and SPACE to shoot', {font: '24px Arial Bold', fill: '#FBFBAC'});
        this.add.text(150, 600, 'Protect the body from infection!', {font: '24px Arial Bold', fill: '#FBFBAC'});
    }
}
