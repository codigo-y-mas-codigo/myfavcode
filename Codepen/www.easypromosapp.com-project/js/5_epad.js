/*
Código extraído del view source https://view-source-editor.vercel.app/
Fecha de descarga: 12/11/2025, 7:54:40 a.m.
¡Excelente día!
*/

/*if (document.cookie.indexOf('ep_ad[utm_source]') < 0) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + 7);

    var qs = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
       var pair = vars[i].split("=");
        qs[pair[0]] = pair[1];
    } 
    if(qs.utm_source != undefined)
        document.cookie= "ep_ad[utm_source]="+qs.utm_source+"; expires="+exdate.toUTCString() + ";domain=.easypromosapp.com;path=/";
    if(qs.utm_medium != undefined)
        document.cookie= "ep_ad[utm_medium]="+qs.utm_medium+"; expires="+exdate.toUTCString() + ";domain=.easypromosapp.com;path=/";
    if(qs.utm_campaign != undefined)
        document.cookie= "ep_ad[utm_campaign]="+qs.utm_campaign+"; expires="+exdate.toUTCString() + ";domain=.easypromosapp.com;path=/";
    if(qs.utm_content != undefined)
        document.cookie= "ep_ad[utm_content]="+qs.utm_content+"; expires="+exdate.toUTCString() + ";domain=.easypromosapp.com;path=/";
}*/

(function() {
    // Comprovem si ja existeix alguna de les cookies
    if (document.cookie.includes('ep_ad[utm_source]')) return;
  
    const qs = new URLSearchParams(window.location.search);
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString(); // +7 dies
    const domain = ".easypromosapp.com";
    const path = "/";
  
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  
    keys.forEach(key => {
      const value = qs.get(key);
      if (value) {
        document.cookie = `ep_ad[${key}]=${value}; expires=${expires}; domain=${domain}; path=${path}`;
      }
    });
  })();