//color palette: http://www.colourlovers.com/palette/3464764/
var colors = ['#E1939A','#F40A3A', '#9E395F', '#A00E22', '#740F26' ];
function randCt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var heart = {
  init : function(e, start){
    var heartEl = document.createElement('div');
    heartEl.className = 'hearts';
    heartEl.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  heartEl.style.left = randCt(e.clientX-40, e.clientX+40) +'px';
  heartEl.style.top = e.clientY - 15 +'px';
  heartEl.style.opacity = '1';
  document.body.appendChild(heartEl);
  heart.complete(heartEl);
  },
  complete: function(el){
    if(Number(el.style.top.replace('px',''))>(Number(el.style.top.replace('px',''))-100)){
    el.style.opacity = (Number(el.style.opacity) - 0.1).toString();
   el.style.top = (Number(el.style.top.replace('px',''))-10) + 'px';
    }
 setTimeout(function(){
   return heart.complete(el);
 }, 50);
  }
}
document.body.addEventListener('click', function(e){
  for(var i = 0; i<randCt(0,10); i++){
    setTimeout(function(){
      heart.init(e);
    }, i*100);
  }
});