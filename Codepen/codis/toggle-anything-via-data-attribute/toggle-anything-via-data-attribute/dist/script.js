let toggler = document.querySelectorAll("[data-toggle-target]")

if (toggler) {
  toggler.forEach(function (element) {
    let target = element.getAttribute("data-toggle-target")
    let targets = document.querySelectorAll(target)
    let toggleClass = element.getAttribute("data-toggle-class")

    element.addEventListener("click", (event) => {
      targets.forEach(function (e) {
        e.classList.toggle(toggleClass)
      })
    })
  })
}