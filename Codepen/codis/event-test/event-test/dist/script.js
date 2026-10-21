const pressMe = document.querySelector('#pressme')
const content = document.querySelector('#content')
const countdown = document.querySelector('#countdown')
let timer = 4, interval

pressMe.addEventListener('click', () => {
	content.innerHTML = "<!-- <iframe src='https://www.xbr.pw' width='100%' height='750px' scrolling:'no' style='border:none'></iframe>  -->content "
	clearInterval(interval)
})

const simulateClick = new Event('click', {
	bubbles: true,
	cancelable: true
})

if (timer > 0) {
	interval = setInterval(()=>{
		countdown.innerHTML = timer
		timer--
		console.log(timer)
	},1000)
}

setTimeout(() => {
	pressMe.dispatchEvent(simulateClick)
}, 5000)

// see: https://gomakethings.com/how-to-simulate-mouse-and-keyboard-events-with-vanilla-js