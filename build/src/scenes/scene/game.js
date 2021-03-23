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
var core_1 = require("@babylonjs/core");
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
    return GameComponent;
}(core_1.Scene));
exports.default = GameComponent;
//# sourceMappingURL=game.js.map