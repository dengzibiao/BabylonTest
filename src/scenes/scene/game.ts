import { Engine, Scene, SceneLoader, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock, Button, Control } from "@babylonjs/gui";


import { runScene } from "../../scenes/scene1";

export default class GameComponent extends Scene {
    /**
     * Defines the reference to the GUI advanced texture.
     */
    public gui: AdvancedDynamicTexture = null;

    private _gameMessageControl: TextBlock = null;

    /**
     * Defines the scene used to store and draw elements in the canvas.
     */
     public scene: Scene;

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
        this._gameMessageControl = new TextBlock("gameTips", "点击场景中任意模型查看");
        this._gameMessageControl.color = "white";
        this._gameMessageControl.fontSize = 40;
        this._gameMessageControl.fontFamily ="Viga";
        this.gui.addControl(this._gameMessageControl);
    }
}
