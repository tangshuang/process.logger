"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createMsg = createMsg;

var _safe = require("colors/safe");

var _safe2 = _interopRequireDefault(_safe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMsg(messages) {
	var msgs = [];
	messages.filter(function (msg) {
		return msg.text;
	}).forEach(function (msg) {
		var text = msg.text;
		var color = msg.color;
		var style = msg.style;
		var background = msg.background;
		var pipe = _safe2.default;

		if (background && background.indexOf("bg") !== 0) {
			background = "bg" + background.substr(0, 1).toUpperCase() + background.substr(1);
		}

		pipe = color && _safe2.default[color] ? pipe[color] : pipe;
		pipe = style && _safe2.default[style] ? pipe[style] : pipe;
		pipe = background && _safe2.default[background] ? pipe[background] : pipe;

		text = typeof pipe === "function" ? pipe(text) : text;
		msgs.push(text);
	});

	return msgs.join(" ");
}