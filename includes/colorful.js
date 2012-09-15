// ==UserScript==
// @name           colorful_favstar
// @namespace      http://looxu.blogspot.com/
// @description    Change favstar text like fabotter.
// @version        1.3
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
					widget.preferences.adsSelector = '#bonusFeatureCallout,#signInCallout, .friends_with_bonus';
				}
				css += widget.preferences.adsSelector + ' { display: none !important; }';


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

		//Change simple logic.
		var pnodeSelector = '.fs-tweet',
			countSelector = '.fs-total',
			tweetSelector = '.fs-tweet-text',
			pnodes = _d.querySelectorAll(pnodeSelector),
			i = 0,
			iz = pnodes.length,
			pnode,
			favNode,
			tweetNode;

		for (; i < iz; i++ ){
			pnode = pnodes[i];
			favNode = pnode.querySelector(countSelector);
			fav = parseInt(favNode.textContent, 10);
			if (!isNaN(fav) && fav >= 1) {
				tweetNode = pnode.querySelector(tweetSelector);
				tweetNode.className += ' cofav'+(fav > 5 ? 5 : fav);
			}
		}
	}

	insertCSS();

	_w.addEventListener('DOMContentLoaded', init, false );

})(document, window);

