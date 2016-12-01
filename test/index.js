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
logger.set("color", "red").set("style", "bold").set("background", "yellow").put("This", {color: "green"}).put("is", {style: "default"}).put("cool!").print()

logger.set("color", "red").set("style", "bold").set("background", "white").put("You are so smart!").print()
logger.set("tiemstamp", true).put("You", {
	color: "red"
}).put({
	text: "are",
	color: "blue"
}).put("cute!").print()
logger.set("style", "bold").log("Look at this!", "blue")

// use alias
logger.success("OK!")
logger.warn("go! go!", {
	background: "white"
})
logger.error({
	text: "You get an error!",
	style: "bold"
})
logger.set("tiemstamp", true).help("You get it!")