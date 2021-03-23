import { Engine, Scene, SceneLoader, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui";
import "@babylonjs/materials";

import { runScene } from "./scenes/scene";
import { runScene as runScene1 } from "./scenes/scene1";

export class Game {
    /**
     * Defines the engine used to draw the game using Babylon.JS and WebGL
     */
    public engine: Engine;
    /**
     * Defines the scene used to store and draw elements in the canvas.
     */
    private scenes: Scene[] = new Array();
    private clicks:number  = 0;
    private showScene:number = 0;
    private advancedTexture:any;

    /**
     * Constructor.
     */
    public constructor() {
        this.engine = new Engine(document.getElementById("renderCanvas") as HTMLCanvasElement, true);

        this._bindEvents();
        this._load();
    }

    /**
     * Loads the first scene.
     */
    private _load(): void {
        var scene = new Scene(this.engine);
        var rootUrl = "./scenes/scene/";

        SceneLoader.Append(rootUrl, "scene.babylon", scene, () => {
            scene.executeWhenReady(() => {
                // Attach camera.
                if (!scene.activeCamera) {
                    throw new Error("No camera defined in the scene. Please add at least one camera in the project or create one yourself in the code.");
                }
                scene.activeCamera.attachControl(this.engine.getRenderingCanvas(), false);
                scene.meshes.forEach((m) => m.checkCollisions = true);
                runScene(scene, rootUrl);
                this.scenes.push(scene);

                var scene1 = new Scene(this.engine);
                rootUrl = "./scenes/scene1/";
                SceneLoader.Append(rootUrl, "scene.babylon", scene1, () => {
                    scene1.executeWhenReady(() => {
                        // Attach camera.
                        if (!scene1.activeCamera) {
                            throw new Error("No camera defined in the scene. Please add at least one camera in the project or create one yourself in the code.");
                        }
                        scene1.activeCamera.attachControl(this.engine.getRenderingCanvas(), false);
                        scene1.meshes.forEach((m) => m.checkCollisions = true);
                        runScene1(scene1, rootUrl);
                        this.scenes.push(scene1);
                        this._createGUI();
                        var scene = this.scenes[this.showScene];
                        this.engine.runRenderLoop(() => {
                            var _showScene = this.showScene;
                            if(this.showScene != (this.clicks % 2)){
                                this.showScene = this.clicks % 2;
                            }
                            if (_showScene != this.showScene) {
                                // this.engine.stopRenderLoop();
                                this.advancedTexture.dispose();
                                this._createGUI();
                            }
                            var scene = this.scenes[this.showScene];
                            scene.render();
                        });
                    });
                }, undefined, (_, message) => {
                    console.error(message);
                }, "babylon");
            });
        }, undefined, (_, message) => {
            console.error(message);
        }, "babylon");
    }

    private _createGUI(): void {
        var scene = this.scenes[this.showScene];
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

        var button = Button.CreateSimpleButton("but", "Scene " + ((this.clicks + 1) % 2));
        button.width = 0.2;
        button.height = "40px";
        button.color = "white";
        button.background = "green";
        button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.advancedTexture.addControl(button);

        button.onPointerClickObservable.add(()=> {
            this.clicks++;
        });
    }

    /**
     * Binds the required events for a full experience.
     */
    private _bindEvents(): void {
        window.addEventListener("resize", () => this.engine.resize());
    }
}
