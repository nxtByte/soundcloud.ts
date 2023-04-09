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
var undici_1 = require("undici");
var apiURL = "https://api.soundcloud.com";
var apiV2URL = "https://api-v2.soundcloud.com";
var webURL = "https://soundcloud.com";
(0, undici_1.setGlobalDispatcher)(new undici_1.Agent({ pipelining: 50 }));
var API = /** @class */ (function () {
    function API(clientID, oauthToken, proxy) {
        var _this = this;
        this.clientID = clientID;
        this.oauthToken = oauthToken;
        this.api = new undici_1.Pool(apiURL);
        this.apiV2 = new undici_1.Pool(apiV2URL);
        this.web = new undici_1.Pool(webURL);
        /**
         * Gets an endpoint from the Soundcloud API.
         */
        this.get = function (endpoint, params) {
            return _this.makeGet(_this.api, apiURL, endpoint, params);
        };
        /**
         * Gets an endpoint from the Soundcloud V2 API.
         */
        this.getV2 = function (endpoint, params) {
            return _this.makeGet(_this.apiV2, apiV2URL, endpoint, params);
        };
        /**
         * Some endpoints use the main website as the URL.
         */
        this.getWebsite = function (endpoint, params) {
            return _this.makeGet(_this.web, webURL, endpoint, params);
        };
        /**
         * Gets a URL, such as download, stream, attachment, etc.
         */
        this.getURL = function (URI, params) {
            if (_this.proxy)
                return _this.makeRequest(_this.proxy, _this.buildOptions(URI, "GET", params));
            var options = {
                query: params || {},
                headers: API.headers,
                maxRedirections: 5
            };
            if (_this.clientID)
                options.query.client_id = _this.clientID;
            if (_this.oauthToken)
                options.query.oauth_token = _this.oauthToken;
            return (0, undici_1.request)(URI, options).then(function (r) {
                if (r.statusCode.toString().startsWith("2")) {
                    if (r.headers["content-type"] === "application/json")
                        return r.body.json();
                    return r.body.text();
                }
                throw new Error("Status code " + r.statusCode);
            });
        };
        this.makeGet = function (pool, origin, endpoint, params) { return __awaiter(_this, void 0, void 0, function () {
            var options, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.clientID) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getClientID()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (endpoint.startsWith("/"))
                            endpoint = endpoint.slice(1);
                        options = this.buildOptions("".concat(this.proxy ? origin : "", "/").concat(endpoint), "GET", params);
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 7]);
                        return [4 /*yield*/, this.makeRequest(this.proxy || pool, options)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5:
                        _a = _b.sent();
                        return [4 /*yield*/, this.getClientID(true)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, this.makeRequest(this.proxy || pool, options)];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.post = function (endpoint, params) { return __awaiter(_this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.clientID) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getClientID()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (endpoint.startsWith("/"))
                            endpoint = endpoint.slice(1);
                        options = this.buildOptions("".concat(this.proxy ? origin : "", "/").concat(endpoint), "POST", params);
                        return [2 /*return*/, this.makeRequest(this.proxy || this.api, options)];
                }
            });
        }); };
        this.getClientID = function (reset) { return __awaiter(_this, void 0, void 0, function () {
            var response, urls, script;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!this.clientID || reset)) return [3 /*break*/, 6];
                        return [4 /*yield*/, (this.proxy
                                ? this.proxy.request(this.buildOptions(webURL))
                                : this.web.request(this.buildOptions("/"))).then(function (r) { return r.body.text(); })];
                    case 1:
                        response = _b.sent();
                        urls = response.match(/(?!<script crossorigin src=")https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*\.js)(?=">)/g);
                        if (urls.length === 0)
                            throw new Error("Could not find client ID");
                        script = void 0;
                        _b.label = 2;
                    case 2: return [4 /*yield*/, (0, undici_1.request)(urls.pop()).then(function (r) { return r.body.text(); })];
                    case 3:
                        script = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!script.includes(",client_id:\"") && urls.length > 0) return [3 /*break*/, 2];
                        _b.label = 5;
                    case 5:
                        this.clientID = (_a = script.match(/,client_id:"(\w+)"/)) === null || _a === void 0 ? void 0 : _a[1];
                        if (!this.clientID)
                            throw new Error("Could not find client ID");
                        _b.label = 6;
                    case 6: return [2 /*return*/, this.clientID];
                }
            });
        }); };
        this.buildOptions = function (path, method, params) {
            if (method === void 0) { method = "GET"; }
            var options = {
                query: (method == "GET" && params) || {},
                headers: API.headers,
                method: method,
                path: path,
                maxRedirections: 5
            };
            if (method === "POST" && params)
                options.body = JSON.stringify(params);
            if (_this.clientID)
                options.query.client_id = _this.clientID;
            if (_this.oauthToken)
                options.query.oauth_token = _this.oauthToken;
            return options;
        };
        this.makeRequest = function (pool, options) {
            return pool.request(options).then(function (r) {
                if (r.statusCode.toString().startsWith("2")) {
                    if (r.headers["content-type"].includes("application/json"))
                        return r.body.json();
                    return r.body.text();
                }
                throw new Error("Status code " + r.statusCode);
            });
        };
        if (proxy)
            this.proxy = new undici_1.Pool(proxy);
        if (oauthToken)
            API.headers.Authorization = "OAuth ".concat(oauthToken);
    }
    Object.defineProperty(API.prototype, "headers", {
        get: function () {
            return API.headers;
        },
        enumerable: false,
        configurable: true
    });
    API.headers = {
        "referer": "soundcloud.com",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36"
    };
    return API;
}());
exports.default = API;
