import {createMsg} from "./utils/colorStr"
import {getTime} from "./utils/getTime"

// -----------------------------------------------------------------------------------------

var _attributions = {
	color: undefined,
	style: undefined,
	background: undefined,
	timestamp: undefined,
}
var _messages = []

function Logger(msg, ...args) {
	if(!msg) {
		return
	}

	Logger.reset()

	args = [msg, ...args]
	args.forEach(arg => {
		Logger.put(arg)
	})

	Logger.print()
}

Logger.set = function(key, value) {
	_attributions[key] = value
	return Logger
}

Logger.get = function(key) {
	return key !== 0 && !key ? _attributions : _attributions[key]
}

Logger.put = function(msg, options = {}) {
	// msg object list
	if(typeof msg === "object" && msg.text) {
		_messages.push(msg)
	}
	// only one option
	else if(typeof options === "string") {
		_messages.push({
			text: msg,
			color: options
		})
	}
	// normal
	else {
		_messages.push({
			text: msg,
			color: options.color || Logger.get("color"),
			style: options.style || Logger.get("style"),
			background: options.background || Logger.get("background"),
		})
	}
	
	return Logger
}

Logger.reset = function() {
	_attributions = {
		color: undefined,
		style: undefined,
		background: undefined,
		timestamp: undefined,
	}
	_messages = []

	return Logger
}

Logger.print = function() {
	var timestamp = Logger.get("timestamp")
	if(timestamp) {
		let stamp = getTime();
		if(typeof timestamp !== "object") {
			timestamp = {}
		}

		_messages.unshift({
			text: stamp,
			color: timestamp.color,
			style: timestamp.style,
			background: timestamp.background
		})
	}

	var msg = createMsg(_messages);

	console.log(msg)

	Logger.reset()
}

Logger.log = function(msg, options) {
	Logger.put(msg, options).print()
}

// ------------------------------------------------------------------------

const themes = {
	ok: "green",
	success: "green",
	done: "green",
	welldone: "rainbow",
	help: "cyan",
	warn: "yellow",
	debug: "blue",
	error: "red",
}
for(let prop in themes) {
	let theme = themes[prop]
	Logger[prop] = function(msg, options = {}) {
		if(typeof msg === "object") {
			msg.color = theme
			Logger.log(msg, options)
			return
		}
		
		if(typeof options !== "object") {
			options = {}
		}
		options.color = theme
		Logger.log(msg, options)
	}
}

// -----------------------------------------------------

export default Logger
module.exports = Logger