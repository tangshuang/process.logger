import {padLeft} from "./padStr"

export function getTime() {
	var date = new Date()
	var year = date.getFullYear()
	var month = padLeft(date.getMonth() + 1)
	var day = padLeft(date.getDate())
	var hour = padLeft(date.getHours())
	var minute = padLeft(date.getMinutes())
	var second = padLeft(date.getSeconds())
	return `[${year}-${month}-${day} ${hour}:${minute}:${second}]`
}