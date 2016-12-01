import logger from "../src/process.logger"

// use like console.log
logger("I am a pig!")
logger("Dont", "touch", "me!")

// use object list
logger({
	text: "You are so smart!",
	color: "red",
	style: "bold",
})
logger({
	text: "You",
	color: "blue",
}, {
	text: "are",
}, {
	text: "bitch",
	color: "black",
	background: "white",
})

// use set, put, print
logger.set("color", "red").set("style", "bold").set("background", "yellow")
logger("Test a word!") // use settingss
logger.put("This", {color: "green"}).put("is", {style: "default"}).put("cool!").print() // cover settings

logger.reset().set("color", "red").set("style", "bold").set("background", "white").put("You are so smart!").print().reset()
logger.reset().set("tiemstamp", true).put("You", {
	color: "red"
}).put({
	text: "are",
	color: "blue"
}).put("cute!").print().reset()

// use alias
logger.success("OK!")
logger.log("Look at this!", "blue")
logger.warn("go! go!", {
	background: "yellow"
})
logger.error({
	text: "You get an error!",
	style: "bold"
})
logger.set("tiemstamp", true).help("You get it!")


