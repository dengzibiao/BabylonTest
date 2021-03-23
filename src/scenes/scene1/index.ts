/**
 * Generated by the Babylon.JS Editor v${editor-version}
 */

import { Node, Scene } from "@babylonjs/core";
import {
    attachScripts, attachScriptToNodeAtRumtine,
    configurePostProcesses, setupRenderingGroups,
} from "../tools";

import { scriptsMap } from "../scripts-map";

/**
 * Works as an helper, this will:
 * = attach scripts on objects.
 * @param scene the scene to attach scripts, etc.
 */
export async function runScene(scene: Scene, rootUrl?: string): Promise<void> {
    // Attach scripts to objects in scene.
    attachScripts(scriptsMap, scene);

    // Configure post-processes
    configurePostProcesses(scene, rootUrl);

    // Rendering groups
    setupRenderingGroups(scene);
}

/**
 * Attaches the a script at runtime to the given node according to the given script's path.
 * @param scriptPath defines the path to the script to attach (available as a key in the exported "scriptsMap" map).
 * @param object defines the reference to the object (node or scene) to attach the script to.
 */
export function attachScriptToObjectImmediately(scriptPath: string, object: Node | Scene): void {
    attachScriptToNodeAtRumtine(scriptsMap, scriptPath, object);
}
