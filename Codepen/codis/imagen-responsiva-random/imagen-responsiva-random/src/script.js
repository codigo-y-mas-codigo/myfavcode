document.addEventListener("DOMContentLoaded", function () {
 const images = [
  "https://pfst.cf2.poecdn.net/base/image/11477401c1082f0ea624b3454fddad3258ce5cc201afe09b929251fbae3a1b3d?w=1024&h=1024&pmaid=63294617",
  "https://pfst.cf2.poecdn.net/base/image/558bf7016253a0f4c68d2254775660bbac4442f0d951380272933a61c63c0ca6?w=1024&h=1024&pmaid=63295152",
  "https://pfst.cf2.poecdn.net/base/image/7d5074ac8a59a7c2469830494d0669a52ddc692206ef9ef0a78802f9d91979cf?w=1024&h=1024&pmaid=63295425",
  "https://pfst.cf2.poecdn.net/base/image/7d5074ac8a59a7c2469830494d0669a52ddc692206ef9ef0a78802f9d91979cf?w=1024&h=1024&pmaid=63295425"
 ];

 const randomImageElement = document.getElementById("randomImage");

 function getRandomImage(imagesArray) {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  return imagesArray[randomIndex];
 }

 randomImageElement.src = getRandomImage(images);
});
