const shuffleDivs = document.querySelectorAll('.text-shuffle');
const spot = document.getElementById('spot');
const dotW = 90;
const dotH = 90;
spot.style.width = dotW + 'px';
spot.style.height = dotH + 'px';
// spot.style.backgroundColor = 'red'
const shaded = [' █',' ▓',' ▒',' ░'];
const blocks = [' &#9601; ', ' &#9602; ', ' &#9603; ', ' &#9604; ', ' &#9605; ', ' &#9606; ', ' &#9607; ', ' &#9608; ']
const lettersAndSymbols = [' A', ' B', ' C', ' D', ' E', ' F', ' G', ' H', ' I', ' J', ' K', ' L', ' M', ' N', ' O', ' P', ' Q', ' R', ' S', ' T', ' U', ' V',  'W', ' X', ' Y', ' Z', ' 0', ' 1', ' 2', ' 3', ' 4', ' 5', ' 6', ' 7', ' 8', ' 9'];
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
  spot.style.left = evt.pageX - (dotW / 2) + 'px';
  spot.style.top = evt.pageY - (dotH / 2) + 'px';

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

// textSpans.forEach((element) => {
//   element.innerHTML = pickRandFromArr(blocks);

//     if (isColliding(spot, element)) {
//       element.innerText = element.dataset.original;
//     }
// })

const redraw = () => {
  textSpans.forEach((element) => {
    //element.innerHTML = pickRandFromArr(shaded);
    if (isColliding(spot, element)) {
      element.innerHTML = pickRandFromArr(lettersAndSymbols);
    } else if (element.innerText !== element.dataset.original) {
      element.innerHTML = element.dataset.original;

    }
      // element.innerHTML = pickRandFromArr(shaded);
    // } else if (element.innerText !== element.dataset.original) {
    //   element.innerHTML = element.dataset.original;
    // }
  });
}
let count = 0;
const animate = () => {
  
  if (count % 2 === 0) {
    redraw();
  }
  count++
  requestAnimationFrame(animate);
 }
 
 animate();