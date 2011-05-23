// ==UserScript==
// @name           colorful_favstar
// @namespace      http://looxu.blogspot.com/
// @description    Change favstar text like fabotter.
// @version        2.0
// @include        http://favstar.fm/*
// @include        http://ja.favstar.fm/*
// @include        http://de.favstar.fm/*
// @include        http://es.favstar.fm/*
// ==/UserScript==
(function (_d,_w) {
  function init(){

    var path = 'styles/favstarlike.css';
    var onCSS = function(event) {
        var message = event.data;

        // Check this is the correct message and path from the background script.
        if (message.topic === 'LoadedInjectedCSS' && message.data.path === path) {
            // Remove the message listener so it doesn't get called again.
            opera.extension.removeEventListener('message', onCSS, false);

            var css = message.data.css;

            // Create a <style> element and add it to the <head> element of the current page.
            // Insert the contents of the stylesheet into the <style> element.
            var style = _d.createElement('style');
            style.setAttribute('type', 'text/css');
            style.appendChild(_d.createTextNode(css));
            _d.getElementsByTagName('head')[0].appendChild(style);
        }
    }

    // On receipt of a message from the background script, execute onCSS().
    opera.extension.addEventListener('message', onCSS, false);

    // Send the stylesheet path to the background script to get the CSS.
    opera.extension.postMessage({
        topic: 'LoadInjectedCSS',
        data: path
    });

    var favCounts = _d.querySelectorAll('.count');
    for (var i=favCounts.length; i-- > 0; ){
      var fav = parseInt(favCounts[i].innerHTML, 10);
      var pnode = favCounts[i].parentNode;
      while(pnode){
        if( pnode.className.indexOf('tweetWithStats') >= 0 ){
          break;
        }
        pnode = pnode.parentNode;
      }
      if (!isNaN(fav) && fav >= 1 && pnode ) {
        setColorfulClass(fav, pnode);
      }
    }
  }

  function setColorfulClass (favCount, node) {
    if (node.className !== 'tweetWithStats') {return;}
    var tweet = node.querySelector('.theTweet');
    if (favCount <= 4) {
      tweet.className += ' cofav'+favCount;
    } else if (favCount >= 5) {
      tweet.className += ' cofav5';
    }
  }

  _d.addEventListener('DOMContentLoaded', function(){ init(); }, false );
})(document, window);
