import { Engine } from "@babylonjs/core";
import "@babylonjs/materials";
export declare class Game {
    /**
     * Defines the engine used to draw the game using Babylon.JS and WebGL
     */
    engine: Engine;
    /**
     * Defines the scene used to store and draw elements in the canvas.
     */
    private scenes;
    private clicks;
    private showScene;
    private advancedTexture;
    /**
     * Constructor.
     */
    constructor();
    /**
     * Loads the first scene.
     */
    private _load;
    private _createGUI;
    /**
     * Binds the required events for a full experience.
     */
    private _bindEvents;
}
