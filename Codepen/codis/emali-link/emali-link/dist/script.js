const email = 'xiiber@my.com'
const subject = 'Auto-format Date Input';
const body = 'Hola Luis Angel\n\nMis comentarios sobre el pen...\n\nhttps://codepen.io/luisangelmaciel/pen/mdQGRGb?editors=1100 son\n\nMig';
let href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
document.querySelector('a').setAttribute('href', href)