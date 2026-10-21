// starts from the existing markup with carets and nested uls.
// maybe it's even easier to use a blank classless markup, parse it and add the necessary classes.
var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function () {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}

// get markup nodes, add classes and behaviour
let tree = document.getElementById("palletcontents");
let treeSpans = tree.querySelectorAll("span");
console.log(treeSpans);

treeSpans.forEach(el => {
  let nextSibling = el.nextElementSibling;
  el.classList.add("caret");
  nextSibling.classList.add("nested");
  el.addEventListener("click", function () {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
});