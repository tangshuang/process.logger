import colors from "colors/safe"

export function createMsg(messages) {
	var msgs = [];
	messages.filter(msg => msg.text).forEach(msg => {
		let text = msg.text
		let color = msg.color
		let style = msg.style
		let background = msg.background
		let pipe = colors

		if(background && background.indexOf("bg") !== 0) {
			background = "bg" + background.substr(0,1).toUpperCase() + background.substr(1)
		}

		pipe = color && colors[color] ? pipe[color] : pipe
		pipe = style && colors[style] ? pipe[style] : pipe
		pipe = background && colors[background] ? pipe[background] : pipe

		text = typeof pipe === "function" ? pipe(text) : text
		msgs.push(text)
	})

	return msgs.join(" ")
}