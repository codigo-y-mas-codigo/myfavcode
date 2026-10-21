document.addEventListener("DOMContentLoaded", function () {
 const imageGroups = [
  [
   "https://tse2.mm.bing.net/th/id/OIG2.95jTWMaJNGB3TFM.ePz9?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.k5RlLR95oK51hWFecnmb?pid=ImgGn",
   "https://tse3.mm.bing.net/th/id/OIG2.m3yfEkyUf3XIEUmds2Q5?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.82ErUoOEG878ch8Mc2Bz?pid=ImgGn"
  ],
  [
   "https://tse4.mm.bing.net/th/id/OIG4.oiK99kmw.dCtO9D9XT7M?pid=ImgGn",
   "https://tse1.mm.bing.net/th/id/OIG4.WXGSjyHT7dgJZUNB1Xiz?pid=ImgGn",
   "https://tse3.mm.bing.net/th/id/OIG4.YQXDVpI9iIGhQl9SN9jb?pid=ImgGn",
   "https://tse1.mm.bing.net/th/id/OIG4.WWW8jcqShecmbs9o6xnY?pid=ImgGn"
  ],
  [
   "https://tse2.mm.bing.net/th/id/OIG2.95jTWMaJNGB3TFM.ePz9?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.k5RlLR95oK51hWFecnmb?pid=ImgGn",
   "https://tse3.mm.bing.net/th/id/OIG2.m3yfEkyUf3XIEUmds2Q5?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.82ErUoOEG878ch8Mc2Bz?pid=ImgGn"
  ],
  [
   "https://tse2.mm.bing.net/th/id/OIG2.95jTWMaJNGB3TFM.ePz9?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.k5RlLR95oK51hWFecnmb?pid=ImgGn",
   "https://tse3.mm.bing.net/th/id/OIG2.m3yfEkyUf3XIEUmds2Q5?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.82ErUoOEG878ch8Mc2Bz?pid=ImgGn"
  ],
  [
   "https://tse2.mm.bing.net/th/id/OIG2.95jTWMaJNGB3TFM.ePz9?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.k5RlLR95oK51hWFecnmb?pid=ImgGn",
   "https://tse3.mm.bing.net/th/id/OIG2.m3yfEkyUf3XIEUmds2Q5?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.82ErUoOEG878ch8Mc2Bz?pid=ImgGn"
  ],
  [
   "https://tse2.mm.bing.net/th/id/OIG2.95jTWMaJNGB3TFM.ePz9?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.k5RlLR95oK51hWFecnmb?pid=ImgGn",
   "https://tse3.mm.bing.net/th/id/OIG2.m3yfEkyUf3XIEUmds2Q5?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.82ErUoOEG878ch8Mc2Bz?pid=ImgGn"
  ],
  [
   "https://tse2.mm.bing.net/th/id/OIG2.95jTWMaJNGB3TFM.ePz9?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.k5RlLR95oK51hWFecnmb?pid=ImgGn",
   "https://tse3.mm.bing.net/th/id/OIG2.m3yfEkyUf3XIEUmds2Q5?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.82ErUoOEG878ch8Mc2Bz?pid=ImgGn"
  ],
  [
   "https://tse2.mm.bing.net/th/id/OIG2.95jTWMaJNGB3TFM.ePz9?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.k5RlLR95oK51hWFecnmb?pid=ImgGn",
   "https://tse3.mm.bing.net/th/id/OIG2.m3yfEkyUf3XIEUmds2Q5?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.82ErUoOEG878ch8Mc2Bz?pid=ImgGn"
  ],
  [
   "https://tse2.mm.bing.net/th/id/OIG2.95jTWMaJNGB3TFM.ePz9?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.k5RlLR95oK51hWFecnmb?pid=ImgGn",
   "https://tse3.mm.bing.net/th/id/OIG2.m3yfEkyUf3XIEUmds2Q5?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.82ErUoOEG878ch8Mc2Bz?pid=ImgGn"
  ],
  [
   "https://tse2.mm.bing.net/th/id/OIG2.95jTWMaJNGB3TFM.ePz9?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.k5RlLR95oK51hWFecnmb?pid=ImgGn",
   "https://tse3.mm.bing.net/th/id/OIG2.m3yfEkyUf3XIEUmds2Q5?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.82ErUoOEG878ch8Mc2Bz?pid=ImgGn"
  ],
  [
   "https://tse2.mm.bing.net/th/id/OIG2.95jTWMaJNGB3TFM.ePz9?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.k5RlLR95oK51hWFecnmb?pid=ImgGn",
   "https://tse3.mm.bing.net/th/id/OIG2.m3yfEkyUf3XIEUmds2Q5?pid=ImgGn",
   "https://tse2.mm.bing.net/th/id/OIG2.82ErUoOEG878ch8Mc2Bz?pid=ImgGn"
  ]
 ];

 function getRandomImage(imagesArray) {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  return imagesArray[randomIndex];
 }

 function displayRandomImage(groupIndex) {
  let randomImage = getRandomImage(imageGroups[groupIndex]);
  document.getElementById(`randomImage${groupIndex + 1}`).src = randomImage;
 }

 for (let i = 0; i < imageGroups.length; i++) {
  displayRandomImage(i);
 }
});