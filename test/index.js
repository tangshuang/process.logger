import logger from "../src/process.logger"

logger("I am a pig!")
logger("You are so smart!", "red", "bold")
logger("Dont touch me!", "rainbow")

logger().error("Dont be like this!")
logger().done("Just do it!")
logger().warn("You need help!")
logger().done().error("There is only one color.")

logger().time("You should do it right now!")

logger({
	style: "help",
	text: "Help!",
}, {
	text: "Look at my feet!",
})