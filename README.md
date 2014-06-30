# link-rel-parser
parse HTTP link headers and HTML links

## usage
```js
var linkRelParser = require('link-rel-parser')
 e.g.
 linkRelParser('http://log.jden.us', function (e, links) {
   console.log(e, links)
 })
```

links is an object like:

```js
  {
    shortcut: ['http://assets.tumblr.com/images/default_avatar/cube_closed_128.png' ],                                                          
    icon: [ 'http://assets.tumblr.com/images/default_avatar/cube_closed_128.png' ],                                                                   
    alternate: [ 'android-app://com.tumblr/tumblr/x-callback-url/blog?blogName=logjdenus' ],                                                          
    stylesheet: [ 'http://assets.tumblr.com/fonts/gibson/stylesheet.css?v=3']
  }                                                                      

```

## installation

    $ npm install link-rel-parser


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>


## license

ISC. (c) MMXIV jden <jason@denizac.org>. See LICENSE.md
