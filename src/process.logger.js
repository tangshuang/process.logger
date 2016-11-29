import colors from 'colors/safe'

colors.setTheme({
	ok: 'green',
	success: 'green',
	done: 'green',
	welldone: 'rainbow',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red',
})

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

class Logger {
	constructor() {
		this._color = undefined
		this._style = undefined
		this._background = undefined
		this._timestamp = undefined
		return this.log.bind(this)
	}
	set(key, value) {
		if(key === "background" && value.indexOf("bg") !== 0) {
			value = "bg" + value.substr(0,1).toUpperCase() + value.substr(1)
		}
		this["_" + key] = value
		return this
	}
	get(key) {
		return this["_" + key]
	}
	timestamp(msg) {
		this._timestamp = timestampStr("")
		this.log(msg)
		return this
	}
	done(msg) {
		this._color = "green"
		this.log(msg)
		return this
	}
	success(msg) {
		this._color = "green"
		this.log(msg)
		return this
	}
	ok(msg) {
		this._color = "green"
		this.log(msg)
		return this
	}
	help(msg) {
		this._color = "cyan"
		this.log(msg)
		return this
	}
	warn(msg) {
		this._color = "yellow"
		this.log(msg)
		return this
	}
	debug(msg) {
		this._color = "blue"
		this.log(msg)
		return this
	}
	error(msg) {
		this._color = "red"
		this.log(msg)
		return this
	}
	welldone(msg) {
		this._color = "rainbow"
		this.log(msg)
		return this
	}
	log(msg, ...args) {
		// with out msg
		if(!msg) {
			return this
		}

		// list of object
		if(typeof msg === 'object') {
			var msgs = []
			args = [msg, ...args]
			args.forEach(arg => {
				if(arg.text) {
					let msg = arg.text
					let color = arg._color || color
					let style = arg._style || style
					let background = arg._background || background
					let pipe = colors

					pipe = color && colors[color] ? pipe[color] : pipe
					pipe = style && colors[style] ? pipe[style] : pipe
					pipe = background && colors[background] ? pipe[background] : pipe

					msg = typeof pipe === "function" ? pipe(msg) : msg
					msgs.push(msg)
				}
			})
			
			if(msgs.length > 0) {
				msg = msgs.join(" ")
				msg = timestamp ? timestampStr(msg) : msg
				console.log(msg)
			}
			this.destory()
			return this
		}

		var color = this._color
		var style = this._style
		var background = this._background
		var timestamp = this._timestamp
		var pipe = colors

		pipe = color && colors[color] ? pipe[color] : pipe
		pipe = style && colors[style] ? pipe[style] : pipe
		pipe = background && colors[background] ? pipe[background] : pipe

		msg = timestamp ? timestampStr(msg) : msg

		// only msg, without options
		if(args.length === 0) {
			msg = typeof pipe === "function" ? pipe(msg) : msg
			console.log(msg)
			this.destory()
			return this
		}

		// with options
		args.forEach(arg => {
			pipe = colors[arg] ? pipe[arg] : pipe
		})

		msg = typeof pipe === "function" ? pipe(msg) : msg
		console.log(msg)
		this.destory()
		return this
	}
	destory() {
		this._color = undefined
		this._style = undefined
		this._background = undefined
		this._timestamp = undefined
	}
}

var logger = new Logger()
export default logger
module.exports = logger