!(function () {
 "use strict";
 var a = window.location,
  r = window.document,
  o = r.currentScript,
  l = o.getAttribute("data-api") || new URL(o.src).origin + "/api/event";
 function s(t, e) {
  t && console.warn("Ignoring Event: " + t), e && e.callback && e.callback();
 }
 function t(t, e) {
  if (
   /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(a.hostname) ||
   "file:" === a.protocol
  )
   return s("localhost", e);
  if (
   window._phantom ||
   window.__nightmare ||
   window.navigator.webdriver ||
   window.Cypress
  )
   return s(null, e);
  try {
   if ("true" === window.localStorage.plausible_ignore)
    return s("localStorage flag", e);
  } catch (t) {}
  var n = {},
   i =
    ((n.n = t),
    (n.u = a.href),
    (n.d = o.getAttribute("data-domain")),
    (n.r = r.referrer || null),
    e && e.meta && (n.m = JSON.stringify(e.meta)),
    e && e.props && (n.p = e.props),
    new XMLHttpRequest());
  i.open("POST", l, !0),
   i.setRequestHeader("Content-Type", "text/plain"),
   i.send(JSON.stringify(n)),
   (i.onreadystatechange = function () {
    4 === i.readyState && e && e.callback && e.callback();
   });
 }
 var e = (window.plausible && window.plausible.q) || [];
 window.plausible = t;
 for (var n, i = 0; i < e.length; i++) t.apply(this, e[i]);
 function p() {
  n !== a.pathname && ((n = a.pathname), t("pageview"));
 }
 var c,
  w = window.history;
 w.pushState &&
  ((c = w.pushState),
  (w.pushState = function () {
   c.apply(this, arguments), p();
  }),
  window.addEventListener("popstate", p)),
  "prerender" === r.visibilityState
   ? r.addEventListener("visibilitychange", function () {
      n || "visible" !== r.visibilityState || p();
     })
   : p();
})();

///

var end = new Date();
end.setDate(1), end.setMonth(end.getMonth() + 1), end.setHours(0, 0, 0, 0);
var timer,
 _second = 1e3,
 _minute = 60 * _second,
 _hour = 60 * _minute,
 _day = 24 * _hour;
function showRemaining() {
 var e = new Date(),
  n = end - e;
 if (n < 0)
  return (
   clearInterval(timer),
   void (document.getElementById("countdown").innerHTML = "Pre-sale over")
  );
 var t = Math.floor(n / _day),
  o = Math.floor((n % _day) / _hour),
  d = Math.floor((n % _hour) / _minute),
  r = Math.floor((n % _minute) / _second);
 (document.getElementById("countdown").innerHTML = t + "d "),
  (document.getElementById("countdown").innerHTML += o + "h "),
  (document.getElementById("countdown").innerHTML += d + "m "),
  (document.getElementById("countdown").innerHTML += r + "s");
}
timer = setInterval(showRemaining, 1e3);
