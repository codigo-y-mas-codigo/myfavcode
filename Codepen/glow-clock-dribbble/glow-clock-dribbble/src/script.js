var $key = 'f397d9d69804b22c3cd1b4a87ebc4c40', 
    zipCode = '20001', 
    //Get your country code here: https://countrycode.org/
    countryCode = 'us';
function getCompleteTime(){
  var date = new Date();
  var hours = 0;
  var meridiemString = '';
  var meridiem = document.getElementById('meridiem');
  if(date.getHours()>12){
    hours = date.getHours()-12;
    meridiemString = 'PM';
  } else {
    hours = date.getHours();
    meridiemString = 'AM';
  }
  var mins = date.getMinutes();
  var minDeg = (mins * 360) / 60;
  var hrDeg = (hours * 360) / 12;
  if(hrDeg === 360){
    hrDeg = 0;
  }
  document.getElementById('hour').style.transform = 'rotate('+hrDeg+'deg)';
  document.getElementById('minute').style.transform = 'rotate('+minDeg+'deg)';
  if(meridiem.innerHTML !== meridiemString){
    meridiem.innerHTML = meridiemString;
  }
  setTimeout(getCompleteTime, 1000);
}
function getWeather(zip, country){
 var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?zip='+zip+','+country+'&&APPID='+$key);
	xhr.send(null);
	xhr.onreadystatechange = function () {
		var DONE = 4; // readyState 4 means the request is done.
		var OK = 200; // status 200 is a successful return.
		if (xhr.readyState === DONE) {
			if (xhr.status === OK){
        var data = JSON.parse(xhr.responseText);
        var tempF = ((data.main.temp-273.15)*1.8 + 32).toString().split('.')[0];
       var weather = data.weather[0].main;
 document.getElementById('temp').innerHTML = tempF + '<span id="deg"></span>';
        document.getElementById('weather').innerHTML = weather;
      }
    }
  }
}
window.onload = function(){
  getCompleteTime();
  getWeather(zipCode, countryCode);
}