import { Scene } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui";
export default class GameComponent extends Scene {
    /**
     * Defines the reference to the GUI advanced texture.
     */
    gui: AdvancedDynamicTexture;
    private _gameMessageControl;
    /**
     * Defines the scene used to store and draw elements in the canvas.
     */
    scene: Scene;
    /**
     * Override constructor.
     * @warn do not fill.
     */
    protected constructor();
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    onInitialize(): void;
}
