# process.logger
A simple tool to log message in node console.

github: https://github.com/tangshuang/process.logger

## Installation

```
npm install process.logger
```

## Styles

#### color

* black
* nred
* green
* yellow
* blue
* magenta
* cyan
* white
* gray
* grey
* rainbow
* zebra
* america
* trap
* random

#### style

* reset
* bold
* dim
* italic
* underline
* inverse
* hidden
* strikethrough

#### background

* bgBlack
* bgRed
* bgGreen
* bgYellow
* bgBlue
* bgMagenta
* bgCyan
* bgWhite

**Notice:** these words begin with "bg"

## Usage

1 string arguments

```
logger(msg[, msg, ...])
```

Just like `console.log`, For example:

```
var logger = require("process.logger")
logger("This is a message.")
logger("Another message.")
```

2 object arguments

```
logger(object[, object, ...])
```

You can set attibutions of `text, color, style, background`, not required:

```
object: {
	text: "",
	color: "",
	style: "",
	background: "",
}
```

For example:

```
var logger = require("process.logger");
logger({
	text: "This half is red.",
	color: "red",
}, {
	text: "This half is green.",
	background: "green",
});
```

It will print only one sentence, but different color/background.

## APIs

### set, put, reset, print, log

**.set(key, value)**

Use `set` to set global style of this sentence. e.g.

```
logger.set("color", "red").set("style", "bold").set("background", "white")
```

If you set "color" twice, the last one will be used.

`timestamp` key is special:

```
logger.set("timestamp", {
	color: "red"
}).log("This is a sentence beginning with tiemstamp!")
```

You should try in `preview/index.html` to view different cases.

Sometimes you want to know current settings, you can call `.get()`, e.g.

```
var color = Logger.get("color")
```

**.put(msg[, options])**

Add words into sentence. e.g.

```
logger.set(...).put("This is a").put("PIG", {
	color: "red",
	style: "bold",
}).print()
```

The options will cover settings of `set`.

**.print()**

After you set and put, you should call print to print sentence in console.

```
logger.set(...).put(...).print()
```

**.log(msg[, options])**

With `.print()`, you can not pass parameters, but with `.log()`, you can. In fact, `.log()` do a `put(msg).print()` action.

```
logger.set(...).log("Go away!")
```

*Remember that, you must call `.print()` or `.log()` after `.put()`, or nothing will print.*

**.reset()**

After you `set` and `put`, content was set in cache. If you do not, reset, youwill found it works in next print.

```
logger.set(...)
// do something else
logger.put(...)
// do something else
logger.log(msg)
```

You can see the settings and put content is in the result.

So if you are not sure whether the cache is clean, just reset it before you set and put.

*Howerever, `print` and `log` automaticly do `reset`.*

### done, success, error, warn

To provide a quick way to log special colors messages, some alias name api are provided:

* ok -> green
* success -> green
* done -> green
* welldone -> rainbow
* help -> cyan
* warn -> yellow
* debug -> blue
* error -> red


```
logger.ok("This message is green!")
logger.warn("this message is red")
logger.set("color", "green").warn("It is red permanently!")
logger.set("style", "bold").debug("It is bold.")
logger.debug("It is bold.", {
	"style": "bold"
})
logger.set("timestamp", true).success("Message is green, but timestamp is not.")
```

However, you do not need to `reset` cache after you call this alias apis, because they call `log` inside.

## Development

This package is written by ES6, run

```
npm run babel
```

to build source code.