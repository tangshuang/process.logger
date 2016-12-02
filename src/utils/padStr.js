export function padLeft(str, len = 2) {
	str = str.toString()
	if(str.length >= len) {
		return str
	}
	else {
		return padLeft("0" + str, len)
	}
}