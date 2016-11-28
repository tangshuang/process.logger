'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_safe2.default.setTheme({
	ok: 'green',
	success: 'green',
	done: 'green',
	welldone: 'rainbow',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

function padLeft(str) {
	var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

	if (str.length >= len) {
		return str;
	} else {
		return padLeft("0" + str, len);
	}
}

function timestampStr(text) {
	var date = new Date();
	var year = date.getFullYear();
	var month = padLeft(date.getMonth() + 1);
	var day = padLeft(date.getDate());
	var hour = padLeft(date.getHours());
	var minute = padLeft(date.getMinutes());
	var second = padLeft(date.getSeconds());
	return '[' + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + '] ' + text;
}

var Logger = function () {
	function Logger() {
		_classCallCheck(this, Logger);

		this.cololr = undefined;
		this.style = undefined;
		this.background = undefined;
		this.timestamp = undefined;
		return this.log.bind(this);
	}

	_createClass(Logger, [{
		key: 'time',
		value: function time(msg) {
			this.timestamp = timestampStr("");
			this.log(msg);
			return this;
		}
	}, {
		key: 'done',
		value: function done(msg) {
			this.color = "green";
			this.log(msg);
			return this;
		}
	}, {
		key: 'success',
		value: function success(msg) {
			this.color = "green";
			this.log(msg);
			return this;
		}
	}, {
		key: 'ok',
		value: function ok(msg) {
			this.color = "green";
			this.log(msg);
			return this;
		}
	}, {
		key: 'help',
		value: function help(msg) {
			this.color = "cyan";
			this.log(msg);
			return this;
		}
	}, {
		key: 'warn',
		value: function warn(msg) {
			this.color = "yellow";
			this.log(msg);
			return this;
		}
	}, {
		key: 'debug',
		value: function debug(msg) {
			this.color = "blue";
			this.log(msg);
			return this;
		}
	}, {
		key: 'error',
		value: function error(msg) {
			this.color = "red";
			this.log(msg);
			return this;
		}
	}, {
		key: 'welldone',
		value: function welldone(msg) {
			this.color = "rainbow";
			this.log(msg);
			return this;
		}
	}, {
		key: 'log',
		value: function log(msg) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			// with out msg
			if (!msg) {
				this.destory();
				return this;
			}

			// list of object
			if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
				var msgs = [];
				args = [msg].concat(_toConsumableArray(args));
				args.forEach(function (arg) {
					if (arg.text) {
						var _msg = arg.text;
						var _color = arg.color || _color;
						var _style = arg.style || _style;
						var _background = arg.background || _background;
						var _pipe = _safe2.default;

						_pipe = _color && _safe2.default[_color] ? _pipe[_color] : _pipe;
						_pipe = _style && _safe2.default[_style] ? _pipe[_style] : _pipe;
						_pipe = _background && _safe2.default[_background] ? _pipe[_background] : _pipe;

						_msg = typeof _pipe === "function" ? _pipe(_msg) : _msg;
						msgs.push(_msg);
					}
				});

				if (msgs.length > 0) {
					msg = msgs.join(" ");
					msg = timestamp ? timestampStr(msg) : msg;
					console.log(msg);
				}
				this.destory();
				return this;
			}

			var color = this.color;
			var style = this.style;
			var background = this.background;
			var timestamp = this.timestamp;
			var pipe = _safe2.default;

			pipe = color && _safe2.default[color] ? pipe[color] : pipe;
			pipe = style && _safe2.default[style] ? pipe[style] : pipe;
			pipe = background && _safe2.default[background] ? pipe[background] : pipe;

			msg = timestamp ? timestampStr(msg) : msg;

			// only msg, without options
			if (args.length === 0) {
				msg = typeof pipe === "function" ? pipe(msg) : msg;
				console.log(msg);
				this.destory();
				return this;
			}

			// with options
			args.forEach(function (arg) {
				pipe = _safe2.default[arg] ? pipe[arg] : pipe;
			});

			msg = typeof pipe === "function" ? pipe(msg) : msg;
			console.log(msg);
			this.destory();
			return this;
		}
	}, {
		key: 'destory',
		value: function destory() {
			this.color = undefined;
			this.style = undefined;
			this.background = undefined;
			this.timestamp = undefined;
		}
	}]);

	return Logger;
}();

var logger = new Logger();
exports.default = logger;

module.exports = logger;
