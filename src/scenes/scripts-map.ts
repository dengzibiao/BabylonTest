import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap extends ScriptMap {
	"src/scenes/scene/game.ts": any;
	"src/scenes/scene/player.ts": any;
	"src/scenes/scene/playerCamera.ts": any;
	"src/scenes/scene1/game.ts": any;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/scene/game.ts": require("./scene/game"),
	"src/scenes/scene/player.ts": require("./scene/player"),
	"src/scenes/scene/playerCamera.ts": require("./scene/playerCamera"),
	"src/scenes/scene1/game.ts": require("./scene1/game"),
}
