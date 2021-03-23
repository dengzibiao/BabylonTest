"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
var gui_1 = require("@babylonjs/gui");
require("@babylonjs/materials");
var scene_1 = require("./scenes/scene");
var scene1_1 = require("./scenes/scene1");
var Game = /** @class */ (function () {
    /**
     * Constructor.
     */
    function Game() {
        /**
         * Defines the scene used to store and draw elements in the canvas.
         */
        this.scenes = new Array();
        this.clicks = 0;
        this.showScene = 0;
        this.engine = new core_1.Engine(document.getElementById("renderCanvas"), true);
        this._bindEvents();
        this._load();
    }
    /**
     * Loads the first scene.
     */
    Game.prototype._load = function () {
        var _this = this;
        var scene = new core_1.Scene(this.engine);
        var rootUrl = "./scenes/scene/";
        core_1.SceneLoader.Append(rootUrl, "scene.babylon", scene, function () {
            scene.executeWhenReady(function () {
                // Attach camera.
                if (!scene.activeCamera) {
                    throw new Error("No camera defined in the scene. Please add at least one camera in the project or create one yourself in the code.");
                }
                scene.activeCamera.attachControl(_this.engine.getRenderingCanvas(), false);
                scene.meshes.forEach(function (m) { return m.checkCollisions = true; });
                scene_1.runScene(scene, rootUrl);
                _this.scenes.push(scene);
                var scene1 = new core_1.Scene(_this.engine);
                rootUrl = "./scenes/scene1/";
                core_1.SceneLoader.Append(rootUrl, "scene.babylon", scene1, function () {
                    scene1.executeWhenReady(function () {
                        // Attach camera.
                        if (!scene1.activeCamera) {
                            throw new Error("No camera defined in the scene. Please add at least one camera in the project or create one yourself in the code.");
                        }
                        scene1.activeCamera.attachControl(_this.engine.getRenderingCanvas(), false);
                        scene1.meshes.forEach(function (m) { return m.checkCollisions = true; });
                        scene1_1.runScene(scene1, rootUrl);
                        _this.scenes.push(scene1);
                        _this._createGUI();
                        var scene = _this.scenes[_this.showScene];
                        _this.engine.runRenderLoop(function () {
                            var _showScene = _this.showScene;
                            if (_this.showScene != (_this.clicks % 2)) {
                                _this.showScene = _this.clicks % 2;
                            }
                            if (_showScene != _this.showScene) {
                                // this.engine.stopRenderLoop();
                                _this.advancedTexture.dispose();
                                _this._createGUI();
                            }
                            var scene = _this.scenes[_this.showScene];
                            scene.render();
                        });
                    });
                }, undefined, function (_, message) {
                    console.error(message);
                }, "babylon");
            });
        }, undefined, function (_, message) {
            console.error(message);
        }, "babylon");
    };
    Game.prototype._createGUI = function () {
        var _this = this;
        var scene = this.scenes[this.showScene];
        this.advancedTexture = gui_1.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
        var button = gui_1.Button.CreateSimpleButton("but", "Scene " + ((this.clicks + 1) % 2));
        button.width = 0.2;
        button.height = "40px";
        button.color = "white";
        button.background = "green";
        button.verticalAlignment = gui_1.Control.VERTICAL_ALIGNMENT_TOP;
        this.advancedTexture.addControl(button);
        button.onPointerClickObservable.add(function () {
            _this.clicks++;
        });
    };
    /**
     * Binds the required events for a full experience.
     */
    Game.prototype._bindEvents = function () {
        var _this = this;
        window.addEventListener("resize", function () { return _this.engine.resize(); });
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=index.js.map