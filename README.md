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

**Notice:* these words begin with "bg"

#### alias

* ok -> green
* success -> green
* done -> green
* welldone -> rainbow
* help -> cyan
* warn -> yellow
* debug -> blue
* error -> red

## Usage

1) string arguments

```
logger(msg[,color,style,backgound])
```

The order of [color,style,backgound] can be changed and not required.

For example:

```
var logger = require('process.logger');
logger('This is a message.','green','bold');
```

Only one color, style, background will be set

2) object arguments

```
logger(object[,object,...])
```

```
object: {
	text: '',
	color: '',
	style: '',
	background: ''
}
```

Each of `text, color, background` is not required.

For example:

```
var logger = require('process.logger');
logger({
	text:'This half is red.',
	color:'red'
},{
	text:'This half is green.',
	background:'green'
});
```

## API

**Notice:** use `logger().` not `logger.`!

#### log()

```
logger().log(msg...)
```

In fact, `logger()` constructor returns `log()`, so they have same usage. Why has `log()`, you can use like:

```
logger().set("color", "red").set("style", "bold").log(...)
```

Then you can use `set()` easily.

#### alias

* logger().done(msg)
* logger().success(msg)
* logger().ok(msg)
* logger().error(msg)
* logger().warn(msg)
* logger().help(msg)
* logger().debug(msg)
* logger().welldone(msg)

In fact, api is based on basic function. And all of them can be rewritten.

For example:

```
logger().done('Oh! My god!');
logger().welldone('This is so bueatiful.');
```

#### get(), set()

**set(key, value)**

```
logger().set("color", "red")
```

When you set background without beginning with "bg", e.g. `set("background", "green")`

**get(key)**

```
var time = logger().timestamp().get("timestamp")
```

#### timestamp()

```
logger().timestamp("There will be a timestamp before this msg")
logger().timestamp().done("The same!")
```

## Development

This package is written by ES6, run

```
npm run babel
```

to build source code.