"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracks = void 0;
var undici_1 = require("undici");
var index_1 = require("./index");
var Tracks = /** @class */ (function () {
    function Tracks(api) {
        var _this = this;
        this.api = api;
        this.resolve = new index_1.Resolve(this.api);
        /**
         * @deprecated Use searchV2
         * Searches for tracks.
         */
        this.search = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/tracks", params)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        }); };
        /**
         * Searches for tracks using the v2 API.
         */
        this.searchV2 = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getV2("search/tracks", params)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        }); };
        /**
         * @deprecated use getV2
         * Fetches a track by URL or ID.
         */
        this.get = function (trackResolvable) { return __awaiter(_this, void 0, void 0, function () {
            var id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolve.get(trackResolvable, true)];
                    case 1:
                        id = _a.sent();
                        if (id.hasOwnProperty("id"))
                            return [2 /*return*/, id];
                        return [4 /*yield*/, this.api.get("/tracks/".concat(id))];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        }); };
        /**
         * Fetches a track from URL or ID using Soundcloud v2 API.
         */
        this.getV2 = function (trackResolvable) { return __awaiter(_this, void 0, void 0, function () {
            var trackID, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolve.getV2(trackResolvable)];
                    case 1:
                        trackID = _a.sent();
                        return [4 /*yield*/, this.api.getV2("/tracks/".concat(trackID))];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        }); };
        /**
         * Fetches tracks from an array of ID using Soundcloud v2 API.
         */
        this.getArrayV2 = function (trackIds) { return __awaiter(_this, void 0, void 0, function () {
            var chunks, i, response, tracks;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (trackIds.length === 0)
                            return [2 /*return*/, []
                                // Max 50 ids per request => split into chunks of 50 ids
                            ];
                        chunks = [];
                        i = 0;
                        while (i < trackIds.length)
                            chunks.push(trackIds.slice(i, (i += 50)));
                        response = [];
                        return [4 /*yield*/, Promise.all(chunks.map(function (chunk) { return _this.api.getV2("/tracks", { ids: chunk.join(",") }); }))];
                    case 1:
                        tracks = _a.sent();
                        return [2 /*return*/, response.concat.apply(response, tracks)];
                }
            });
        }); };
        /**
         * @deprecated
         * Fetches all comments on a track.
         */
        this.comments = function (trackResolvable) { return __awaiter(_this, void 0, void 0, function () {
            var trackID, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolve.get(trackResolvable)];
                    case 1:
                        trackID = _a.sent();
                        return [4 /*yield*/, this.api.get("/tracks/".concat(trackID, "/comments"))];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        }); };
        /**
         * @deprecated
         * Gets a specific comment.
         */
        this.comment = function (trackResolvable, commentID) { return __awaiter(_this, void 0, void 0, function () {
            var trackID, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolve.get(trackResolvable)];
                    case 1:
                        trackID = _a.sent();
                        return [4 /*yield*/, this.api.get("/tracks/".concat(trackID, "/comments/").concat(commentID))];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        }); };
        /**
         * @deprecated
         * Get all users who favorited the track.
         */
        this.favoriters = function (trackResolvable) { return __awaiter(_this, void 0, void 0, function () {
            var trackID, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolve.get(trackResolvable)];
                    case 1:
                        trackID = _a.sent();
                        return [4 /*yield*/, this.api.get("/tracks/".concat(trackID, "/favoriters"))];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        }); };
        /**
         * @deprecated
         * Get a specific favoriter.
         */
        this.favoriter = function (trackResolvable, userResolvable) { return __awaiter(_this, void 0, void 0, function () {
            var trackID, userID, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolve.get(trackResolvable)];
                    case 1:
                        trackID = _a.sent();
                        return [4 /*yield*/, this.resolve.get(userResolvable)];
                    case 2:
                        userID = _a.sent();
                        return [4 /*yield*/, this.api.get("/tracks/".concat(trackID, "/favoriters/").concat(userID))];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        }); };
        /**
         * @deprecated
         * Requires Authentication - Gets the secret token from one of your own tracks.
         */
        this.secretToken = function (trackResolvable) { return __awaiter(_this, void 0, void 0, function () {
            var trackID, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolve.get(trackResolvable)];
                    case 1:
                        trackID = _a.sent();
                        return [4 /*yield*/, this.api.get("/tracks/".concat(trackID, "/secret-token"))
                                .catch(function () { return Promise.reject("Oauth Token is required for this endpoint."); })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        }); };
        /**
         * Searches for tracks (web scraping)
         */
        this.searchAlt = function (query) { return __awaiter(_this, void 0, void 0, function () {
            var html, urls, scrape, i, songHTML, json, track;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, undici_1.request)("https://soundcloud.com/search/sounds?q=".concat(query), { headers: this.api.headers }).then(function (r) { return r.body.text(); })];
                    case 1:
                        html = _b.sent();
                        urls = (_a = html.match(/(?<=<li><h2><a href=")(.*?)(?=">)/gm)) === null || _a === void 0 ? void 0 : _a.map(function (u) { return "https://soundcloud.com".concat(u); });
                        if (!urls)
                            return [2 /*return*/, []];
                        scrape = [];
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < urls.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, undici_1.request)(urls[i], { headers: this.api.headers }).then(function (r) { return r.body.text(); })];
                    case 3:
                        songHTML = _b.sent();
                        json = JSON.parse(songHTML.match(/(\[{)(.*)(?=;)/gm)[0]);
                        track = json[json.length - 1].data;
                        scrape.push(track);
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, scrape];
                }
            });
        }); };
        /**
         * Gets a track by URL (web scraping)
         */
        this.getAlt = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var songHTML, json, track;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!url.startsWith("https://soundcloud.com/"))
                            url = "https://soundcloud.com/".concat(url);
                        return [4 /*yield*/, (0, undici_1.request)(url, { headers: this.api.headers }).then(function (r) { return r.body.text(); })];
                    case 1:
                        songHTML = _a.sent();
                        json = JSON.parse(songHTML.match(/(\[{)(.*)(?=;)/gm)[0]);
                        track = json[json.length - 1].data;
                        return [2 /*return*/, track];
                }
            });
        }); };
        /**
         * Gets all related tracks of a track using the v2 API.
         */
        this.relatedV2 = function (trackResolvable, limit) { return __awaiter(_this, void 0, void 0, function () {
            var trackID, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolve.getV2(trackResolvable)];
                    case 1:
                        trackID = _a.sent();
                        return [4 /*yield*/, this.api.getV2("/tracks/".concat(trackID, "/related"), { limit: limit })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.collection];
                }
            });
        }); };
    }
    return Tracks;
}());
exports.Tracks = Tracks;
