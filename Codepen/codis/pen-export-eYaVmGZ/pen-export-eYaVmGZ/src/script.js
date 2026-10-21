document.getElementById('hamburger').addEventListener('click', function() {
    var navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert('Gracias por contactarnos, ' + name + '. Hemos recibido tu mensaje.');
        document.getElementById('contactForm').reset();
    } else {
        alert('Por favor, completa todos los campos del formulario.');
    }
});
