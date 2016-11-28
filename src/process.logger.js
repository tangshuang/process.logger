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
		this.cololr = undefined
		this.style = undefined
		this.background = undefined
		this.timestamp = undefined
		return this.log.bind(this)
	}
	time(msg) {
		this.timestamp = timestampStr("")
		this.log(msg)
		return this
	}
	done(msg) {
		this.color = "green"
		this.log(msg)
		return this
	}
	success(msg) {
		this.color = "green"
		this.log(msg)
		return this
	}
	ok(msg) {
		this.color = "green"
		this.log(msg)
		return this
	}
	help(msg) {
		this.color = "cyan"
		this.log(msg)
		return this
	}
	warn(msg) {
		this.color = "yellow"
		this.log(msg)
		return this
	}
	debug(msg) {
		this.color = "blue"
		this.log(msg)
		return this
	}
	error(msg) {
		this.color = "red"
		this.log(msg)
		return this
	}
	welldone(msg) {
		this.color = "rainbow"
		this.log(msg)
		return this
	}
	log(msg, ...args) {
		// with out msg
		if(!msg) {
			this.destory()
			return this
		}

		// list of object
		if(typeof msg === 'object') {
			var msgs = []
			args = [msg, ...args]
			args.forEach(arg => {
				if(arg.text) {
					let msg = arg.text
					let color = arg.color || color
					let style = arg.style || style
					let background = arg.background || background
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

		var color = this.color
		var style = this.style
		var background = this.background
		var timestamp = this.timestamp
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
		this.color = undefined
		this.style = undefined
		this.background = undefined
		this.timestamp = undefined
	}
}

var logger = new Logger()
export default logger
module.exports = logger