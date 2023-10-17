const canvas = document.querySelector("canvas");
const human = document.querySelector(".human");
const greeting = document.querySelector(".greeting");
const context = canvas.getContext("2d");
const sicaDimensions = {width: 205 * 1.2, height: 244 * 1.2};

const humans = [
  "瞿涵",
  "大寧",
  "薇瀅",
  "程心",
  "郁珊",
  "沛恩",
  "Anita",
  "怡心",
];

const greetings = [
  "恭喜我們最崇拜的西卡大大",
  "你做到了！為你驕傲！",
  "⭐️ 一個巨星的誕生！⭐️",
  "唇齒留香，高朋滿座",
  "遠方朋友心卻很近",
  "為這個重要時刻獻上最誠摯的祝福",
  "祝你生意好，萬事無煩惱",
  "水啦！",
  "旺象更新 欣興象榮",
  "帶著愛與驕傲的恭喜。✨",
  "恭喜！恭喜！",
  "新家好生活，真心老朋友",
  "喬遷喜天地人共喜，新居榮福祿壽全榮",
  "遷入新宅吉祥如意，搬進高樓福壽安康",
  "ご転宅おめでとうございます",
  "ご立派な成果を",
  "傑出的一手",
];

const startTime = Date.now();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.translate(window.innerWidth / 2, window.innerHeight / 2);

const image = new Image();
image.src = "./assets/sica.png";

const loopingPugs = 40; // 125 pugs required to cover a full 4K television screen. Tested via Firefox DevTools
const offsetDistance = 120;
let currentOffset = 0;

const movementRange = 200;

const mouseOffset = {
  x: 0,
  y: 0,
};

const movementOffset = {
  x: 0,
  y: 0,
};

image.onload = () => {
  startLooping();
};

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.setTransform(1, 0, 0, 1, 0, 0); //Reset the canvas context
  context.translate(window.innerWidth / 2, window.innerHeight / 2);
};

window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mousedown", onMouseDown);

function onMouseDown(e) {
  ii = Math.floor(Math.random() * greetings.length);
  greeting.innerText = greetings[ii];
}

function draw(offset, loopCount) {
  let currentPercentage = (loopingPugs - loopCount) / loopingPugs;
  context.drawImage(
    image,
    -sicaDimensions.width / 2 -
      offset / 2 +
      movementOffset.x * currentPercentage,
    -sicaDimensions.height / 2 -
      offset / 2 +
      movementOffset.y * currentPercentage,
    sicaDimensions.width + offset,
    sicaDimensions.height + offset
  );
}

function onMouseMove(e) {
  mouseOffset.x =
    ((e.clientX - window.innerWidth / 2) / window.innerWidth / 2) *
    movementRange;
  mouseOffset.y =
    ((e.clientY - window.innerHeight / 2) / window.innerHeight / 2) *
    movementRange;
}

function lerp(start, end, amount) {
  return start * (1 - amount) + end * amount;
}

function loopDraw() {
  movementOffset.x = lerp(movementOffset.x, mouseOffset.x, 0.05);
  movementOffset.y = lerp(movementOffset.y, mouseOffset.y, 0.05);

  for (let i = loopingPugs; i >= 1; i--) {
    draw(i * offsetDistance + currentOffset, i);
  }

  draw(offsetDistance, 1);

  currentOffset++;
  if (currentOffset >= offsetDistance) {
    currentOffset = 0;
  }

  const newTime = Math.floor((Date.now() - startTime) / 1000);

  ii = newTime % humans.length;
  human.innerText = humans[ii];

  requestAnimationFrame(loopDraw);
}

function startLooping() {
  requestAnimationFrame(loopDraw);
}
