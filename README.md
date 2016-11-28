# process.logger
A simple tool to log message in node console.

github: https://github.com/tangshuang/process.logger

## Installation

```
npm install process.logger
```

## color

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

## style

* reset
* bold
* dim
* italic
* underline
* inverse
* hidden
* strikethrough

## background

* bgBlack
* bgRed
* bgGreen
* bgYellow
* bgBlue
* bgMagenta
* bgCyan
* bgWhite

## extras

* rainbow
* zebra
* america
* trap
* random

-----------

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
	color:'green'
});
```

## API

* logger().done(msg), logger.success(msg), logger.ok(msg)
* logger().error(msg)
* logger().warn(msg)
* logger().help(msg)
* logger().debug(msg)
* logger().welldone(msg)

In fact, api is based on basic function. And all of them can be rewritten.

**Notice:** use `logger().` not `logger.`!

For example:

```
logger.done('Oh! My god!');
logger.welldone('This is so bueatiful.');
```

## Development

This package is written by ES6, run

```
npm run babel
```

to build source code.