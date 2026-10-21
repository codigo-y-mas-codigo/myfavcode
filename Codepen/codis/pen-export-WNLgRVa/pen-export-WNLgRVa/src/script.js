// tabs
function openTab(TabName) {
	var i;
	var x = document.getElementsByClassName("Tab");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	document.getElementById(TabName).style.display = "block";
}
//
