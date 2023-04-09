"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = require("./API");
var index_1 = require("./entities/index");
/**
 * The main class for interacting with the Soundcloud API.
 */
var Soundcloud = /** @class */ (function () {
    function Soundcloud(clientID, oauthToken, options) {
        if (clientID) {
            Soundcloud.clientID = clientID;
            if (oauthToken)
                Soundcloud.oauthToken = oauthToken;
        }
        if (options === null || options === void 0 ? void 0 : options.proxy)
            Soundcloud.proxy = options.proxy;
        this.api = new API_1.default(Soundcloud.clientID, Soundcloud.oauthToken, Soundcloud.proxy);
        this.tracks = new index_1.Tracks(this.api);
        this.users = new index_1.Users(this.api);
        this.playlists = new index_1.Playlists(this.api);
        this.oembed = new index_1.Oembed(this.api);
        this.resolve = new index_1.Resolve(this.api);
        this.me = new index_1.Me(this.api);
        this.comments = new index_1.Comments(this.api);
        this.apps = new index_1.Apps(this.api);
        this.util = new index_1.Util(this.api);
    }
    return Soundcloud;
}());
exports.default = Soundcloud;
module.exports.default = Soundcloud;
__exportStar(require("./entities/index"), exports);
__exportStar(require("./types/index"), exports);
