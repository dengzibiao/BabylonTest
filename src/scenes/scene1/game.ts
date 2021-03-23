import { Scene } from "@babylonjs/core/scene";
import { AdvancedDynamicTexture, TextBlock, Control, Image, StackPanel } from "@babylonjs/gui";

export default class GameComponent extends Scene {
    /**
     * Defines the reference to the GUI advanced texture.
     */
    public gui: AdvancedDynamicTexture = null;

    private _gameMessageControl: TextBlock = null;

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {

        this.gui = AdvancedDynamicTexture.CreateFullscreenUI("ui", true, this);

        // Create start game text
        this._gameMessageControl = new TextBlock("gameTips", "这是第二个场景");
        this._gameMessageControl.color = "white";
        this._gameMessageControl.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this._gameMessageControl.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this._gameMessageControl.paddingTop = 20;
        this._gameMessageControl.fontFamily ="Viga";
        this.gui.addControl(this._gameMessageControl);
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        // ...
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...
    }

    /**
     * Called on a message has been received and sent from a graph.
     * @param message defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    public onMessage(name: string, data: any, sender: any): void {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    }
}
