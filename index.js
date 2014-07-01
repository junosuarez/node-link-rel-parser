var request = require('request')
var htmlParser = require('htmlparser2').Parser
var parseHeader = require('http-link').parse
var map = require('through2-map')
var url = require('url')

function linkRelParser (resourceUrl, cb) {
  
  var links = {}

  request({url: resourceUrl}, end)
    .pipe(map(function (x) {
      return x.toString()
    }))
    .pipe(new htmlParser({
      onopentag: function (name, attribs) {
        if (name !== 'a' && name !== 'link' || !attribs.rel || !attribs.href) { return }
        
        var rels = attribs.rel.split(' ')

        rels.forEach(function (rel) {
          if (!links[rel]) {
            links[rel] = []
          }

          // resolve relative links
          var link = url.resolve(resourceUrl, attribs.href)

          links[rel].push(link)
        })
        
      }
    }))



  function end(e, res) {

    if (e) {
      return cb(e)
    }

    if (res.headers.link){
      parseHeader(res.headers.link).forEach(function (link) {
        // header links should take precedence over html links for security - overwrite completely
        links[link.rel] = [link.href]
      })
    }

    cb(e, links)
  }

}

module.exports = linkRelParser

// e.g.
// linkRelParser('http://log.jden.us', function (e, links) {
//   console.log(e, links)
// })
//
// links:
//  {
//    shortcut: ['http://assets.tumblr.com/images/default_avatar/cube_closed_128.png' ],                                                          
//    icon: [ 'http://assets.tumblr.com/images/default_avatar/cube_closed_128.png' ],                                                                   
//    alternate: [ 'android-app://com.tumblr/tumblr/x-callback-url/blog?blogName=logjdenus' ],                                                          
//    stylesheet: [ 'http://assets.tumblr.com/fonts/gibson/stylesheet.css?v=3']
//  }                                                                      
