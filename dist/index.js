"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _colorStr = require("./utils/colorStr");

var _getTime = require("./utils/getTime");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// -----------------------------------------------------------------------------------------

var _attributions = {
	color: undefined,
	style: undefined,
	background: undefined,
	timestamp: undefined
};
var _messages = [];

function Logger(msg) {
	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	if (!msg) {
		return;
	}

	Logger.reset();

	args = [msg].concat(_toConsumableArray(args));
	args.forEach(function (arg) {
		Logger.put(arg);
	});

	Logger.print();
}

Logger.set = function (key, value) {
	_attributions[key] = value;
	return Logger;
};

Logger.get = function (key) {
	return key !== 0 && !key ? _attributions : _attributions[key];
};

Logger.put = function (msg) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	// msg object list
	if ((typeof msg === "undefined" ? "undefined" : _typeof(msg)) === "object" && msg.text) {
		_messages.push(msg);
	}
	// only one option
	else if (typeof options === "string") {
			_messages.push({
				text: msg,
				color: options
			});
		}
		// normal
		else {
				_messages.push({
					text: msg,
					color: options.color || Logger.get("color"),
					style: options.style || Logger.get("style"),
					background: options.background || Logger.get("background")
				});
			}

	return Logger;
};

Logger.reset = function () {
	_attributions = {
		color: undefined,
		style: undefined,
		background: undefined,
		timestamp: undefined
	};
	_messages = [];

	return Logger;
};

Logger.print = function () {
	var timestamp = Logger.get("timestamp");
	if (timestamp) {
		var stamp = (0, _getTime.getTime)();
		if ((typeof timestamp === "undefined" ? "undefined" : _typeof(timestamp)) !== "object") {
			timestamp = {};
		}

		_messages.unshift({
			text: stamp,
			color: timestamp.color,
			style: timestamp.style,
			background: timestamp.background
		});
	}

	var msg = (0, _colorStr.createMsg)(_messages);

	console.log(msg);

	Logger.reset();
};

Logger.log = function (msg, options) {
	Logger.put(msg, options).print();
};

// ------------------------------------------------------------------------

var themes = {
	ok: "green",
	success: "green",
	done: "green",
	welldone: "rainbow",
	help: "cyan",
	warn: "yellow",
	debug: "blue",
	error: "red"
};

var _loop = function _loop(prop) {
	var theme = themes[prop];
	Logger[prop] = function (msg) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		if ((typeof msg === "undefined" ? "undefined" : _typeof(msg)) === "object") {
			msg.color = theme;
			Logger.log(msg, options);
			return;
		}

		if ((typeof options === "undefined" ? "undefined" : _typeof(options)) !== "object") {
			options = {};
		}
		options.color = theme;
		Logger.log(msg, options);
	};
};

for (var prop in themes) {
	_loop(prop);
}

// -----------------------------------------------------

exports.default = Logger;

module.exports = Logger;