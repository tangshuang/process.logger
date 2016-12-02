"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.padLeft = padLeft;
function padLeft(str) {
	var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

	str = str.toString();
	if (str.length >= len) {
		return str;
	} else {
		return padLeft("0" + str, len);
	}
}