"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.soundcloud = void 0;
var soundcloud_1 = require("../soundcloud");
require("dotenv").config();
var soundcloud = new soundcloud_1.default(process.env.SOUNDCLOUD_CLIENT_ID, process.env.SOUNDCLOUD_OAUTH_TOKEN);
exports.soundcloud = soundcloud;
