/* option */

function init(){
	var ads_selector = document.getElementById("ads_selector");
	ads_selector.value = widget.preferences.adsSelector;

	var ads_save = document.getElementById("ads_save");
	ads_save.addEventListener("click",selChange,false);


	function selChange(){
		widget.preferences.adsSelector = ads_selector.value;
	}

}
document.addEventListener("DOMContentLoaded", init,false);
