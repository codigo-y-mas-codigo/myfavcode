document.getElementById("checkdark").addEventListener("change", e => {
  if (e.target.checked) {
    document.body.classList.add("darkmode");
  } else {
    if (document.body.classList.contains("darkmode")) {
      document.body.classList.remove("darkmode");
    }
  }
});