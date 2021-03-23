"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var scene_1 = require("@babylonjs/core/scene");
var gui_1 = require("@babylonjs/gui");
var GameComponent = /** @class */ (function (_super) {
    __extends(GameComponent, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function GameComponent() {
        var _this = this;
        /**
         * Defines the reference to the GUI advanced texture.
         */
        _this.gui = null;
        _this._gameMessageControl = null;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    GameComponent.prototype.onInitialize = function () {
        this.gui = gui_1.AdvancedDynamicTexture.CreateFullscreenUI("ui", true, this);
        // Create start game text
        this._gameMessageControl = new gui_1.TextBlock("gameTips", "点击场景中任意模型查看");
        this._gameMessageControl.color = "white";
        this._gameMessageControl.fontSize = 40;
        this._gameMessageControl.fontFamily = "Viga";
        this.gui.addControl(this._gameMessageControl);
    };
    /**
     * Called on the scene starts.
     */
    GameComponent.prototype.onStart = function () {
        // ...
    };
    /**
     * Called each frame.
     */
    GameComponent.prototype.onUpdate = function () {
        // ...
    };
    /**
     * Called on a message has been received and sent from a graph.
     * @param message defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    GameComponent.prototype.onMessage = function (name, data, sender) {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    };
    return GameComponent;
}(scene_1.Scene));
exports.default = GameComponent;
//# sourceMappingURL=game.ts.js.map