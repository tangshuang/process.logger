"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getTime = getTime;

var _padStr = require("./padStr");

function getTime() {
	var date = new Date();
	var year = date.getFullYear();
	var month = (0, _padStr.padLeft)(date.getMonth() + 1);
	var day = (0, _padStr.padLeft)(date.getDate());
	var hour = (0, _padStr.padLeft)(date.getHours());
	var minute = (0, _padStr.padLeft)(date.getMinutes());
	var second = (0, _padStr.padLeft)(date.getSeconds());
	return "[" + year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "]";
}