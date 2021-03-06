"use strict";
/**
 * Generated by the Babylon.JS Editor v4.0.0-rc.2
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
/**
 * Requires the nedded scripts for the given nodes array and attach them.
 * @param nodes the array of nodes to attach script (if exists).
 */
function requireScriptForNodes(scriptsMap, nodes) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var initializedNodes = [];
    // Initialize nodes
    for (var _i = 0, _k = nodes; _i < _k.length; _i++) {
        var n = _k[_i];
        if (!n.metadata || !n.metadata.script || !n.metadata.script.name || n.metadata.script.name === "None") {
            continue;
        }
        var exports_1 = scriptsMap[n.metadata.script.name];
        if (!exports_1) {
            continue;
        }
        var scene = n instanceof core_1.Scene ? n : n.getScene();
        // Get prototype.
        var prototype = exports_1.default.prototype;
        // Call constructor
        if (exports_1.IsGraph) {
            exports_1.IsGraphAttached = true;
            prototype.constructor.call(n, scene, n);
        }
        else {
            prototype.constructor.call(n);
        }
        // Add prototype
        do {
            for (var key in prototype) {
                if (!prototype.hasOwnProperty(key) || key === "constructor") {
                    continue;
                }
                n[key] = prototype[key].bind(n);
            }
            prototype = Object.getPrototypeOf(prototype);
        } while (((_a = prototype.constructor) === null || _a === void 0 ? void 0 : _a.IsComponent) === true);
        // Call onInitialize
        (_b = n.onInitialize) === null || _b === void 0 ? void 0 : _b.call(n);
        initializedNodes.push({ node: n, exports: exports_1 });
    }
    var _loop_1 = function (i) {
        var n = i.node;
        var e = i.exports;
        var scene = i.node instanceof core_1.Scene ? i.node : i.node.getScene();
        // Check start
        if (n.onStart) {
            var startObserver_1 = scene.onBeforeRenderObservable.addOnce(function () {
                startObserver_1 = null;
                n.onStart();
            });
            n.onDisposeObservable.addOnce(function () {
                if (startObserver_1) {
                    scene.onBeforeRenderObservable.remove(startObserver_1);
                }
            });
        }
        // Check update
        if (n.onUpdate) {
            var updateObserver_1 = scene.onBeforeRenderObservable.add(function () { return n.onUpdate(); });
            n.onDisposeObservable.addOnce(function () { return scene.onBeforeRenderObservable.remove(updateObserver_1); });
        }
        // Check properties
        var properties = (_c = n.metadata.script.properties) !== null && _c !== void 0 ? _c : {};
        for (var key in properties) {
            var p = properties[key];
            switch (p.type) {
                case "Vector2":
                    n[key] = new core_1.Vector2(p.value.x, p.value.y);
                    break;
                case "Vector3":
                    n[key] = new core_1.Vector3(p.value.x, p.value.y, p.value.z);
                    break;
                case "Vector4":
                    n[key] = new core_1.Vector4(p.value.x, p.value.y, p.value.z, p.value.w);
                    break;
                case "Color3":
                    n[key] = new core_1.Color3(p.value.r, p.value.g, p.value.b);
                    break;
                case "Color4":
                    n[key] = new core_1.Color4(p.value.r, p.value.g, p.value.b, p.value.a);
                    break;
                default:
                    n[key] = p.value;
                    break;
            }
        }
        // Check linked children.
        if (n instanceof core_1.Node) {
            var childrenLinks = (_d = e.default._ChildrenValues) !== null && _d !== void 0 ? _d : [];
            var _loop_2 = function (link) {
                var child = n.getChildren((function (node) { return node.name === link.nodeName; }), true)[0];
                n[link.propertyKey] = child;
            };
            for (var _i = 0, childrenLinks_1 = childrenLinks; _i < childrenLinks_1.length; _i++) {
                var link = childrenLinks_1[_i];
                _loop_2(link);
            }
        }
        // Check linked nodes from scene.
        var sceneLinks = (_e = e.default._SceneValues) !== null && _e !== void 0 ? _e : [];
        for (var _a = 0, sceneLinks_1 = sceneLinks; _a < sceneLinks_1.length; _a++) {
            var link = sceneLinks_1[_a];
            var node = scene.getNodeByName(link.nodeName);
            n[link.propertyKey] = node;
        }
        // Check particle systems
        var particleSystemLinks = (_f = e.default._ParticleSystemValues) !== null && _f !== void 0 ? _f : [];
        var _loop_3 = function (link) {
            var ps = scene.particleSystems.filter(function (ps) { return ps.emitter === n && ps.name === link.particleSystemName; })[0];
            n[link.propertyKey] = ps;
        };
        for (var _b = 0, particleSystemLinks_1 = particleSystemLinks; _b < particleSystemLinks_1.length; _b++) {
            var link = particleSystemLinks_1[_b];
            _loop_3(link);
        }
        // Check pointer events
        var pointerEvents = (_g = e.default._PointerValues) !== null && _g !== void 0 ? _g : [];
        var _loop_4 = function (event_1) {
            scene.onPointerObservable.add(function (e) {
                var _a;
                if (e.type !== event_1.type) {
                    return;
                }
                if (!event_1.onlyWhenMeshPicked) {
                    return n[event_1.propertyKey](e);
                }
                if (((_a = e.pickInfo) === null || _a === void 0 ? void 0 : _a.pickedMesh) === n) {
                    n[event_1.propertyKey](e);
                }
            });
        };
        for (var _c = 0, pointerEvents_1 = pointerEvents; _c < pointerEvents_1.length; _c++) {
            var event_1 = pointerEvents_1[_c];
            _loop_4(event_1);
        }
        // Check keyboard events
        var keyboardEvents = (_h = e.default._KeyboardValues) !== null && _h !== void 0 ? _h : [];
        var _loop_5 = function (event_2) {
            scene.onKeyboardObservable.add(function (e) {
                if (event_2.type && e.type !== event_2.type) {
                    return;
                }
                if (!event_2.keys.length) {
                    return n[event_2.propertyKey](e);
                }
                if (event_2.keys.indexOf(e.event.keyCode) !== -1) {
                    n[event_2.propertyKey](e);
                }
            });
        };
        for (var _d = 0, keyboardEvents_1 = keyboardEvents; _d < keyboardEvents_1.length; _d++) {
            var event_2 = keyboardEvents_1[_d];
            _loop_5(event_2);
        }
        // Retrieve impostors
        if (n instanceof core_1.AbstractMesh && !n.physicsImpostor) {
            n.physicsImpostor = (_j = n._scene.getPhysicsEngine()) === null || _j === void 0 ? void 0 : _j.getImpostorForPhysicsObject(n);
        }
        delete n.metadata.script;
    };
    // Configure initialized nodes
    for (var _l = 0, initializedNodes_1 = initializedNodes; _l < initializedNodes_1.length; _l++) {
        var i = initializedNodes_1[_l];
        _loop_1(i);
    }
}
/**
 * Attaches all available scripts on nodes of the given scene.
 * @param scene the scene reference that contains the nodes to attach scripts.
 */
function attachScripts(scriptsMap, scene) {
    requireScriptForNodes(scriptsMap, scene.meshes);
    requireScriptForNodes(scriptsMap, scene.lights);
    requireScriptForNodes(scriptsMap, scene.cameras);
    requireScriptForNodes(scriptsMap, scene.transformNodes);
    requireScriptForNodes(scriptsMap, [scene]);
    var _loop_6 = function (scriptKey) {
        var script = scriptsMap[scriptKey];
        if (script.IsGraph && !script.IsGraphAttached) {
            var instance_1 = new script.default(scene);
            scene.executeWhenReady(function () { return instance_1["onStart"](); });
            scene.onBeforeRenderObservable.add(function () { return instance_1["onUpdate"](); });
        }
    };
    // Graphs
    for (var scriptKey in scriptsMap) {
        _loop_6(scriptKey);
    }
}
exports.attachScripts = attachScripts;
/**
 * Setups the rendering groups for meshes in the given scene.
 * @param scene defines the scene containing the meshes to configure their rendering group Ids.
 */
function setupRenderingGroups(scene) {
    scene.meshes.forEach(function (m) {
        var _a;
        if (!m.metadata || !(m instanceof core_1.Mesh)) {
            return;
        }
        m.renderingGroupId = (_a = m.metadata.renderingGroupId) !== null && _a !== void 0 ? _a : m.renderingGroupId;
    });
}
exports.setupRenderingGroups = setupRenderingGroups;
/**
 * Attaches the given script (according to its path in the given script map) to the given object.
 * @param scriptsMap defines the map containing all exported scripts of an Editor project.
 * @param scriptsKey defines the key in the scripts map of the script to attach to the given object.
 * @param object defines the reference to the object that the script must be attached to.
 */
function attachScriptToNodeAtRumtine(scriptsMap, scriptsKey, object) {
    var _a, _b;
    object.metadata = (_a = object.metadata) !== null && _a !== void 0 ? _a : {};
    object.metadata.script = (_b = object.metadata.script) !== null && _b !== void 0 ? _b : {};
    object.metadata.script.name = scriptsKey;
    requireScriptForNodes(scriptsMap, [object]);
}
exports.attachScriptToNodeAtRumtine = attachScriptToNodeAtRumtine;
/**
 * Defines the reference to the SSAO2 rendering pipeline.
 */
exports.ssao2RenderingPipelineRef = null;
/**
 * Defines the reference to the SSR post-process.
 */
exports.screenSpaceReflectionPostProcessRef = null;
/**
 * Defines the reference to the default rendering pipeline.
 */
exports.defaultRenderingPipelineRef = null;
/**
 * Defines the reference to the motion blur post-process.
 */
exports.motionBlurPostProcessRef = null;
/**
 * Configures and attaches the post-processes of the given scene.
 * @param scene the scene where to create the post-processes and attach to its cameras.
 * @param rootUrl the root Url where to find extra assets used by pipelines. Should be the same as the scene.
 */
function configurePostProcesses(scene, rootUrl) {
    if (rootUrl === void 0) { rootUrl = null; }
    var _a, _b, _c;
    if (rootUrl === null || !((_a = scene.metadata) === null || _a === void 0 ? void 0 : _a.postProcesses)) {
        return;
    }
    // Load  post-processes configuration
    var data = scene.metadata.postProcesses;
    if (data.ssao && !exports.ssao2RenderingPipelineRef) {
        exports.ssao2RenderingPipelineRef = core_1.SSAO2RenderingPipeline.Parse(data.ssao.json, scene, rootUrl);
        if (data.ssao.enabled) {
            scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(exports.ssao2RenderingPipelineRef.name, scene.cameras);
        }
    }
    if (((_b = data.screenSpaceReflections) === null || _b === void 0 ? void 0 : _b.json) && !exports.screenSpaceReflectionPostProcessRef) {
        exports.screenSpaceReflectionPostProcessRef = core_1.ScreenSpaceReflectionPostProcess._Parse(data.screenSpaceReflections.json, scene.activeCamera, scene, "");
    }
    if (data.default && !exports.defaultRenderingPipelineRef) {
        exports.defaultRenderingPipelineRef = core_1.DefaultRenderingPipeline.Parse(data.default.json, scene, rootUrl);
        if (!data.default.enabled) {
            scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline(exports.defaultRenderingPipelineRef.name, scene.cameras);
        }
    }
    if ((_c = data.motionBlur) === null || _c === void 0 ? void 0 : _c.json) {
        exports.motionBlurPostProcessRef = core_1.MotionBlurPostProcess._Parse(data.motionBlur.json, scene.activeCamera, scene, "");
    }
    scene.onDisposeObservable.addOnce(function () {
        exports.ssao2RenderingPipelineRef = null;
        exports.screenSpaceReflectionPostProcessRef = null;
        exports.defaultRenderingPipelineRef = null;
        exports.motionBlurPostProcessRef = null;
    });
}
exports.configurePostProcesses = configurePostProcesses;
/**
 * Overrides the texture parser.
 */
(function overrideTextureParser() {
    var textureParser = core_1.SerializationHelper._TextureParser;
    core_1.SerializationHelper._TextureParser = function (sourceProperty, scene, rootUrl) {
        var _a;
        if (sourceProperty.isCube && !sourceProperty.isRenderTarget && sourceProperty.files && ((_a = sourceProperty.metadata) === null || _a === void 0 ? void 0 : _a.isPureCube)) {
            sourceProperty.files.forEach(function (f, index) {
                sourceProperty.files[index] = rootUrl + f;
            });
        }
        var texture = textureParser.call(core_1.SerializationHelper, sourceProperty, scene, rootUrl);
        if (sourceProperty.url) {
            texture.url = rootUrl + sourceProperty.url;
        }
        return texture;
    };
})();
/**
 * @deprecated will be moved to "./decorators.ts".
 */
__export(require("./decorators"));
//# sourceMappingURL=tools.js.map