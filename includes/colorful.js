// ==UserScript==
// @name           colorful_favstar
// @namespace      http://looxu.blogspot.com/
// @description    Change favstar text like fabotter.
// @version        1.1
// @include        http://favstar.fm/*
// @include        http://ja.favstar.fm/*
// @include        http://de.favstar.fm/*
// @include        http://es.favstar.fm/*
// ==/UserScript==
(function (_d,_w) {

	function insertCSS(){

		var path = 'styles/favstarlike.css';
		var onCSS = function(event) {
			var message = event.data;

			// Check this is the correct message and path from the background script.
			if (message.topic === 'LoadedInjectedCSS' && message.data.path === path) {
				// Remove the message listener so it doesn't get called again.
				opera.extension.removeEventListener('message', onCSS, false);

				var css = message.data.css;

				if( !widget.preferences.adsSelector ){
					widget.preferences.adsSelector = "#bonusFeatureCallout,#signInCallout, .friends_with_bonus";
				}
				css += widget.preferences.adsSelector + " { display: none !important; }";


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


	}

	function init(){
		var tweetNodes = _d.querySelectorAll('.theTweet');
		for (var i=tweetNodes.length; i-- > 0; ){
			var pnode = tweetNodes[i].parentNode.parentNode.parentNode;	//.tweetWithStats
			var favNode = pnode.querySelector(".count");
			var fav = parseInt(favNode.innerHTML, 10);
			if (!isNaN(fav) && fav >= 1) {
				if( fav > 5 ){
					fav = 5;
				}
				tweetNodes[i].className += ' cofav'+fav;
			}
		}
	}

	insertCSS();

	_w.addEventListener('DOMContentLoaded', init, false );
})(document, window);
