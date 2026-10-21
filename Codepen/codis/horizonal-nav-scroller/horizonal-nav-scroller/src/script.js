let nav = document.querySelectorAll('nav')

if (nav) {
  let navLinks = document.querySelectorAll('nav a')
  let activeLink = document.querySelector('.active')
  activeLink.scrollIntoView({ behavior: "smooth", inline: "center" })
  
  navLinks.forEach( function(link) {
    link.addEventListener("click", (event) => {
      navLinks.forEach( function(link) {
        link.classList.remove('active')
      })
      link.classList.add('active')
      link.scrollIntoView({ behavior: "smooth", inline: "center" })
    })
  })
}
