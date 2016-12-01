import colors from "colors/safe"

const themes = {
	ok: "green",
	success: "green",
	done: "green",
	welldone: "rainbow",
	help: "cyan",
	warn: "yellow",
	debug: "blue",
	error: "red",
	log: "default",
}

colors.setTheme(themes)

function padLeft(str, len = 2) {
	str = str.toString()
	if(str.length >= len) {
		return str
	}
	else {
		return padLeft("0" + str, len)
	}
}

function timestampStr(text) {
	var date = new Date()
	var year = date.getFullYear()
	var month = padLeft(date.getMonth() + 1)
	var day = padLeft(date.getDate())
	var hour = padLeft(date.getHours())
	var minute = padLeft(date.getMinutes())
	var second = padLeft(date.getSeconds())
	return `[${year}-${month}-${day} ${hour}:${minute}:${second}] ${text}`
}

function message(messages) {
	messages.filter(msg => msg.text).map(msg => {
		let text = msg.text
		let color = msg.color
		let style = msg.style
		let background = msg.background
		let pipe = colors

		pipe = color && colors[color] ? pipe[color] : pipe
		pipe = style && colors[style] ? pipe[style] : pipe
		pipe = background && colors[background] ? pipe[background] : pipe

		msg = typeof pipe === "function" ? pipe(msg) : msg
		return msg
	})
	return messages.join(" ")
}

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

Logger.put = function(msg, options) {
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

Logger.print = function() {
	var msg = message(_messages);
	var timestamp = Logger.get("timestamp")

	msg = timestamp ? timestampStr(msg) : msg
	console.log(msg)

	Logger.reset()
}

// Logger.set("color", "red").put("You").put("are", {color: "grey"}).put("gay!").print()

for(prop in themes) {
	let theme = themes[prop]
	Logger[prop] = function(msg, options) {
		options.color = theme
		Logger.reset().put(msg, options).print()
	}
}

export default Logger
module.exports = Logger