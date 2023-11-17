const shuffleDivs = document.querySelectorAll('.text-shuffle');
const spot = document.getElementById('spot');
const emojis = ['█','▓','▒','░'];
const lettersAndSymbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '@', '#', '$', '&', '*', '(', ')', '-', '_', '+', '=', '/', '[', ']', '{', '}', ';', ':', '<', '>', ',', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let textSpans;

const pickRandFromArr = (array) => array[Math.floor(Math.random() * array.length)];

shuffleDivs.forEach((element) => {
  const currentPretext = element.innerText;
  let separatedWords = currentPretext.split("");
  let formattedDivs = '';

  separatedWords.forEach((word) => {
    let span = '<span class="shuffle">' + word + '</span>'
    formattedDivs += span;
  })

  element.innerHTML = formattedDivs;
  textSpans = document.querySelectorAll('.shuffle');
  textSpans.forEach((span) => {
    span.dataset.original = span.innerText;
  });
});

window.addEventListener('mousemove', (evt) => {
  spot.style.left = evt.pageX - 20 + 'px';
  spot.style.top = evt.pageY - 20 + 'px';
});

const isColliding = (element1, element2) => {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return !(
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right
  );
};

const redraw = () => {
  textSpans.forEach((element) => {
    if (isColliding(spot, element)) {
      element.innerText = pickRandFromArr(emojis);
    } else if (element.innerText !== element.dataset.original) {
      element.innerText = element.dataset.original
    }
  });
}
let count = 0;
const animate = () => {
  
  if (count % 10 === 0) {
    redraw();
  }
  count++
  requestAnimationFrame(animate);
 }
 
 animate();