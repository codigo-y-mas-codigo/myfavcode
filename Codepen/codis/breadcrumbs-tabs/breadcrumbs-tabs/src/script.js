const cards = document.querySelectorAll('.card'),
      nexts = document.querySelectorAll('.card__next'),
      ixs = document.querySelectorAll('.card__index');
nexts.forEach((next, i) => {
  next.addEventListener('click', function() {
    cards[i + 1].style.transform = 'none';
  });
});
ixs.forEach((index, i) => {
  index.addEventListener('click', () => {
    for (let j = ixs.length - 1; j > i; j--) {
      cards[j].style.transform = 'translateX(100%)';
    }
    console.log(i);
  })
});