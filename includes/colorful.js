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
	init();

})(document, window);

