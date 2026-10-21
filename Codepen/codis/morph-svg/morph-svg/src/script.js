var tl = new TimelineMax({repeat:-1, repeatDelay:1, delay:1});

tl.to("#star", 1.5, {
		morphSVG: "#bolt", transformOrigin: "center center", scale: 1
}).to("#star", 1.5, {
		morphSVG: "#cloud", transformOrigin: "center center", scale: 1
}).to("#star", 1.5, {
		morphSVG: "#rain", transformOrigin: "center center", scale: 1
}).to("#star", 1.5, {
		morphSVG: "#star", transformOrigin: "center center", scale: 1
});