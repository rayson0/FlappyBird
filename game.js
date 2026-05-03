var dt = new Date()
var text1 = document.getElementById('text1')
var text2 = document.getElementById('text2')
var text3 = document.getElementById('text3')
var score = document.getElementById('score')
var canvas_div = document.getElementById('canvas_div')
var scoreWithoutText = document.getElementsByClassName('score')[0]
var btn = document.getElementsByClassName('btn pause')[0]
var placeholder = document.getElementsByClassName('placeholder')
var bird_ico = document.getElementsByClassName('bird_ico')
var cvs = document.getElementById("canvas");
var select_choice = document.getElementsByTagName('select')[0]
var ctx = cvs.getContext("2d");
var bg = new Image()
var flr = new Image()
var col1 = new Image()
var col2 = new Image()
var col1_2 = new Image()
var col2_2 = new Image()
var bird = new Image()
var apple = new Image()

bg.src = 'img/bg.png'
flr.src = 'img/fg.png'
bird.src = 'img/bird1.png'
col1.src = 'img/pipeUp.png'
col2.src = 'img/pipeBottom.png'
col1_2.src = 'img/pipeUp.png'
col2_2.src = 'img/pipeBottom.png'


document.addEventListener("keydown", moveUp)
btn.onclick = stopGame
btn.onmouseover = placeHolderOpen0
scoreWithoutText.onmouseover = placeHolderOpen1
btn.onmouseout = placeHolderOut0
scoreWithoutText.onmouseout = placeHolderOut1

arrayInfo = ['Желтый птенчик "Flappy bird"', 'Синий птенчик "Flappy bird"', 'Бежевый птенчик "Flappy bird"', 'Красный птенчик "Angry bird"', 'Желтый птенчик "Angry bird"', 'Черный птенчик "Angry bird"']
appleLinks = ['img/apple.webp', 'img/apple.png']

for (let i = 0; i < bird_ico.length; i ++){
  bird_ico[i].onmouseover = function(){
    console.log(9)
    bird_ico[i].style.backgroundImage = 'none';
    bird_ico[i].innerText = arrayInfo[i]
  }
  bird_ico[i].onmouseout = function(){
    console.log(0)
    bird_ico[i].style.backgroundImage = 'url("img/bird' + String(i + 1) + '.png")';
    bird_ico[i].innerText = ''
  }
}

const moveBirdUp = 50
const widthCol = 25
const heightBird = 26
const xPosBird = 20

var yDeltaApple = null
var sizeApple = null
var widthBird = 38
var countTries = 1
var countSimpleApples = 0
var countGoldApples = 0
var gravity = 0.95
var yPos = 400 / 2 - heightBird / 2
var xPos = 0
var xPos2 = 0
var secCol = false;
var changePer = true;
var koefSpeedCols = 0.35
var countPoints = 0
var arrivePoint1 = true;
var arrivePoint2 = true;
var loadDraw = true
var stopGame = false
var pauseTime = true
var lvl = select_choice.value;
var bestTime = 0;
var bestScore = 0;
var xPosApple = null;
var yPosApple = null;
var appleOnField = false
var countCols = 0
var countApple = -1

scoreWithoutText.innerText = countPoints
score.innerText = 'Score: ' + countPoints
heightCol1 = getRandomInt(0, 400 - 3 * heightBird)
marginTopCol2 = getRandomInt(heightCol1 + 3 * heightBird, 400)
while ((Math.abs(heightCol1 - marginTopCol2) > 6 * heightBird) || (heightCol1 != 0 && heightCol1 <= 8) || (marginTopCol2 != 400 && marginTopCol2 >= 392)){
  heightCol1 = getRandomInt(0, 400 - 3 * heightBird)
  marginTopCol2 = getRandomInt(heightCol1 + 3 * heightBird, 400)
}



heightCol1_2 = getRandomInt(0, 400 - 3 * heightBird)
marginTopCol2_2 = getRandomInt(heightCol1_2 + 3 * heightBird, 400)
while ((Math.abs(heightCol1_2 - marginTopCol2_2) > 6 * heightBird) || (heightCol1_2 != 0 && heightCol1_2 <= 8) || (marginTopCol2_2 != 400 && marginTopCol2_2 >= 392)){
  heightCol1_2 = getRandomInt(0, 400 - 3 * heightBird)
  marginTopCol2_2 = getRandomInt(heightCol1_2 + 3 * heightBird, 400)
}

function placeHolderOpen0(){
  placeholder[0].style.display = 'block'
}


function placeHolderOpen1(){
  placeholder[1].style.display = 'block'
}


function placeHolderOut0(){
  placeholder[0].style.display = 'none'
}


function placeHolderOut1(){
  placeholder[1].style.display = 'none'
}


function maxTime(){
  if (countTries >= 2){
    text3.style.display = 'block';
    console.log(bestTime)
    text3.innerText = '\nЛучшее время: ' + bestTime + ' секунд'
  }
}

function maxScore(){
  if (countTries >= 2){
    text3.style.display = 'block';
    text3.innerText += '\nЛучший результат: ' + bestScore + ' очков'
  }
}

function createApple(){
  if (Math.floor(Math.random() * 5) == 0 && countApple != countCols && ! (appleOnField)){
    if (Math.floor(Math.random() * 8) == 0){
      apple.src = appleLinks[1]
      sizeApple = getRandomInt(6, 12)
      yDeltaApple = 30
      xPosApple = getRandomInt(30, 50)
    }
    else{
      apple.src = appleLinks[0]
      sizeApple = getRandomInt(15, 25)
      yDeltaApple = 12
      xPosApple = getRandomInt(0, 30)
    }

    countApple = countCols
    appleOnField = true


    if (Math.min(xPos, xPos2) == xPos || countCols == 0){

      if (heightCol1 - yDeltaApple < 0){
        yPosApple1 = 0
      }
      else{
        yPosApple1 = heightCol1 - yDeltaApple
      }

      if (marginTopCol2 - yDeltaApple > 400 - sizeApple){
        yPosApple2 = 400 - sizeApple
      }
      else{
        yPosApple2 = marginTopCol2 - yDeltaApple
      }
      if (xPosApple - sizeApple <= xPos){
        yPosApple1 = heightCol1 + 1
        yPosApple2 = marginTopCol2 - sizeApple - 1
      }
      yPosApple = getRandomInt(yPosApple1, yPosApple2)
    }
    else{

      if (heightCol1_2 - yDeltaApple < 0){
        yPosApple1 = 0
      }
      else{
        yPosApple1 = heightCol1_2 - yDeltaApple
      }

      if (marginTopCol2_2 - yDeltaApple > 400 - sizeApple){
        yPosApple2 = 400 - sizeApple
      }
      else{
        yPosApple2 = marginTopCol2_2 - yDeltaApple
      }
      if (xPosApple - sizeApple <= xPos2){
        yPosApple1 = heightCol1_2 + 1
        yPosApple2 = marginTopCol2_2 - sizeApple - 1
      }
      yPosApple = getRandomInt(yPosApple1, yPosApple2)
    }

    return true
  }
  countApple = countCols
  return false
}

function createPer(){
  countCols = 0
  countSimpleApples = 0
  countGoldApples = 0
  countApple = -1
  appleOnField = false
  gravity = 0.95
  yPos = 400 / 2 - heightBird / 2
  xPos = 0
  xPos2 = 0
  secCol = false;
  changePer = true;
  koefSpeedCols = 0.35
  stopGame = false
  loadDraw = true
  lvl = select_choice.value;
  countPoints = 0
  pauseTime = true
  scoreWithoutText.innerText = countPoints
  score.innerText = 'Score: ' + countPoints
  arrivePoint1 = true;
  arrivePoint2 = true;
  col1.src = 'img/pipeUp.png'
  col2.src = 'img/pipeBottom.png'
  col1_2.src = 'img/pipeUp.png'
  col2_2.src = 'img/pipeBottom.png'
  heightCol1 = getRandomInt(0, 400 - 3 * heightBird)
  marginTopCol2 = getRandomInt(heightCol1 + 3 * heightBird, 400)
  while ((Math.abs(heightCol1 - marginTopCol2) > 6 * heightBird) || (heightCol1 != 0 && heightCol1 <= 8) || (marginTopCol2 != 400 && marginTopCol2 >= 392)){
    heightCol1 = getRandomInt(0, 400 - 3 * heightBird)
    marginTopCol2 = getRandomInt(heightCol1 + 3 * heightBird, 400)
  }
}


function changeModel(link){
  if ([4, 6].includes(Number(link[4]))){
    widthBird = 29
  }
  else if (5 == link[4]){
    widthBird = 23
  }
  else{
    widthBird = 38
  }
  bird.src = 'img/' + link + '.png'
}



function checkLive(){
  cond1 = 20 >= 288 - xPos && 20 <= 288 - xPos + widthCol
  cond2 = yPos <= heightCol1
  cond2_2 = yPos + heightBird >= marginTopCol2
  cond3 = 20 + widthBird / 2 >= 288 - xPos && 20 + widthBird / 2 <= 288 - xPos + widthCol
  cond4 = 20 + widthBird >= 288 - xPos && 20 + widthBird <= 288 - xPos + widthCol

  cond1_1 = 20 >= 288 - xPos2 && 20 <= 288 - xPos2 + widthCol
  cond2_1 = yPos <= heightCol1_2
  cond2_3 = yPos + heightBird >= marginTopCol2_2
  cond3_1 = 20 + widthBird / 2 >= 288 - xPos2 && 20 + widthBird / 2 <= 288 - xPos2 + widthCol
  cond4_1 = 20 + widthBird >= 288 - xPos2 && 20 + widthBird <= 288 - xPos + widthCol

  cond5 = yPos + heightBird == 400 && marginTopCol2 == 400
  cond5_1 = yPos + heightBird == 400 && marginTopCol2_2 == 400

  cond6 = yPos == 0 && heightCol1 == 0
  cond6_1 = yPos == 0 && heightCol1_2 == 0

  if (cond5 || cond5_1 || cond6 || cond6_1){
    return [false, null]
  }

  if (((cond1) && (cond2)) || ((cond3) && (cond2)) || ((cond4) && (cond2))){
    return [true, 'соприкосновение с верхней преградой']
  }

  if (((cond1) && (cond2_2)) || ((cond3) && (cond2_2)) || ((cond4) && (cond2_2))){
    return [true, 'соприкосновение с нижней преградой']
  }

  if (((cond1_1) && (cond2_1)) || ((cond3_1) && (cond2_1)) || ((cond4_1) && (cond2_1))){
    return [true, 'соприкосновение с верхней преградой']
  }

  if (((cond1_1) && (cond2_3)) || ((cond3_1) && (cond2_3)) || ((cond4_1) && (cond2_3))){
    return [true, 'соприкосновение с нижней преградой']
  }

  return [false, null]
}



function getRandomInt(min, max){
  var nums = []
  for (let i = min; i < max + 1; i ++){
    nums.push(i)
  }
  res = nums[Math.floor(Math.random() * nums.length)]
  while (res == undefined){
      res = nums[Math.floor(Math.random() * nums.length)]
  }
  return res
}



function nameLvl(){
  if (dlt.getUTCSeconds() >= 15 && dlt.getUTCMinutes() >= 0){
    lvl = 'easy-middle'
    gravity = 1.05
    koefSpeedCols = 0.4
  }
  if (dlt.getUTCSeconds() >= 30 && dlt.getUTCMinutes() >= 0){
    lvl = 'middle'
    gravity = 1.15
    koefSpeedCols = 0.45
  }
  if (dlt.getUTCSeconds() >= 45 && dlt.getUTCMinutes() >= 0){
    lvl = 'middle-hard'
    gravity = 1.25
    koefSpeedCols = 0.5
  }
  if (dlt.getUTCMinutes() >= 1){
    lvl = 'hard'
    gravity = 1.35
    koefSpeedCols = 0.55
  }
}


function stopGame(){
  if (stopGame){
    stopGame = false
    dt3 = new Date()
    dt.setUTCMinutes(dt.getUTCMinutes() + dt3.getMinutes() - dt2.getMinutes())
    dt.setUTCSeconds(dt.getUTCSeconds() + dt3.getSeconds() - dt2.getSeconds())
    dt.setUTCMilliseconds(dt.getUTCMilliseconds() + dt3.getMilliseconds() - dt2.getMilliseconds())
    pauseTime = true
    draw()
  }
  else{
    if (pauseTime){
      dt2 = new Date()
      pauseTime = false
    }
    stopGame = true
  }
}


function roundNum(num){
  if ((String(num).length) <= 3){
    return num
  }
  if (num % (10 ** (String(num).length - 3)) >= 10 ** (String(num).length - 3) / 2){
    return Math.floor(num / (10 ** (String(num).length - 3)))
  }
  return Math.ceil(num / (10 ** (String(num).length - 3)))
}


function newGame(cause){
  if ((countTries - 1) % 3 == 0){
    text2.innerHTML = 'История: <br> Попытка ' + countTries + ': ' + String(dlt.getUTCSeconds()) + '.' + String(roundNum(dlt.getUTCMilliseconds())) + ' секунд'
  }
  else{
    text2.innerHTML += '<br> <br> Попытка ' + countTries + ': ' + String(dlt.getUTCSeconds()) + '.' + String(roundNum(dlt.getUTCMilliseconds())) + ' секунд'
  }
  text2.innerHTML += '<br> Очки: ' + countPoints
  text2.innerHTML += '<br> Награды: ' + countSimpleApples
  text2.innerHTML += '<br> Бонусные награды: ' + countGoldApples
  text2.innerHTML += '<br> Причина: ' + cause
  createPer()
  dlt = new Date(new Date() - dt)
  dt = new Date()
  nameLvl()
  text2.style.display = 'block';
  countTries += 1
  if (bestTime < (dlt.getUTCSeconds() + roundNum(dlt.getUTCMilliseconds()) / (10 ** 3)).toFixed(3)){
    bestTime = (dlt.getUTCSeconds() + roundNum(dlt.getUTCMilliseconds()) / (10 ** 3)).toFixed(3)
    console.log(bestTime, roundNum(dlt.getUTCMilliseconds()) / (10 ** 3), dlt.getUTCSeconds(), dlt.getUTCSeconds() + roundNum(dlt.getUTCMilliseconds()) / (10 ** 3))
  }
  maxTime()
  maxScore()
}

function takeApple(){
  if ((288 - xPosApple >= xPosBird && 288 - xPosApple <= xPosBird + widthBird) || (288 - xPosApple + sizeApple >= xPosBird && 288 - xPosApple + sizeApple <= xPosBird + widthBird)){
    if (yPosApple >= yPos && yPosApple <= yPos + heightBird){
      return [true, apple.src]
    }
    if (yPosApple + sizeApple >= yPos && yPosApple + sizeApple <= yPos + heightBird){
      return [true, apple.src]
    }
  }
  return [false, apple.src]
}


function draw(){
  console.log(sizeApple, ' -')
  if (marginTopCol2 - heightCol1 <= 3.5 * heightBird){
    col1.src = 'img/pipeUpGold.png'
    col2.src = 'img/pipeBottomGold.png'
  }

  if (marginTopCol2_2 - heightCol1_2 <= 3.5 * heightBird){
    col1_2.src = 'img/pipeUpGold.png'
    col2_2.src = 'img/pipeBottomGold.png'
  }

  ctx.drawImage(bg, 0, 0)
  ctx.drawImage(flr, 0, 400)
  ctx.drawImage(col1, 288 - xPos, 0, widthCol, heightCol1)
  ctx.drawImage(col2, 288 - xPos, marginTopCol2, widthCol, 400 - marginTopCol2)
  if (288 - xPos <= 288 / 2  - widthBird / 2 || secCol){
    ctx.drawImage(col1_2, 288 - xPos2, 0, widthCol, heightCol1_2)
    ctx.drawImage(col2_2, 288 - xPos2, marginTopCol2_2, widthCol, 400 - marginTopCol2_2)
  }
  ctx.drawImage(bird, xPosBird, yPos, widthBird, heightBird)
  if (createApple() || appleOnField){

    ctx.drawImage(apple, 288 - xPosApple, yPosApple, sizeApple, sizeApple)
  }
  if (takeApple()[0]){
    if (takeApple()[1].endsWith(appleLinks[1])){
      countPoints += 3
      countGoldApples += 1
    }
    else{
      countPoints += 1
      countSimpleApples += 1
    }

    score.innerText = 'Score: ' + countPoints
    scoreWithoutText.innerText = countPoints
    appleOnField = false
    xPosApple = null
    yPosApple = null
  }
  if (288 - xPos + 25 <= 20 && arrivePoint1){
    countPoints += 1
    if (bestScore < countPoints){
      bestScore = countPoints
    }
    arrivePoint1 = false
    arrivePoint2 = true
    score.innerText = 'Score: ' + countPoints
    scoreWithoutText.innerText = countPoints
  }

  if (288 - xPos2 + 25 <= 20 && arrivePoint2){
    countPoints += 1
    if (bestScore < countPoints){
      bestScore = countPoints
    }
    arrivePoint2 = false
    arrivePoint1 = true
    score.innerText = 'Score: ' + countPoints
    scoreWithoutText.innerText = countPoints
  }

  if (!(checkLive()[0])){
    if (yPos + gravity > 400 - heightBird){
      yPos = 400 - heightBird
    }
    else{
      yPos += gravity
      if (checkLive()[0]){
        newGame(checkLive()[1])
      }
    }
  }
  else{
    newGame(checkLive()[1])
  }
  if (!(checkLive()[0])){
    if ((288 - xPos <= 288 / 2  - widthBird / 2 || secCol) && changePer){
      heightCol1_2 = getRandomInt(0, 400 - 3 * heightBird)
      marginTopCol2_2 = getRandomInt(heightCol1_2 + 3 * heightBird, 400)
      while ((Math.abs(heightCol1_2 - marginTopCol2_2) > 6 * heightBird) || (heightCol1_2 != 0 && heightCol1_2 <= 8) || (marginTopCol2_2 != 400 && marginTopCol2_2 >= 392)){
        heightCol1_2 = getRandomInt(0, 400 - 3 * heightBird)
        marginTopCol2_2 = getRandomInt(heightCol1_2 + 3 * heightBird, 400)
      }
      countCols += 1
      changePer = false
      secCol = true
    }
    if (288 - xPos <= -widthCol){
      xPos = 0
      countCols += 1
      heightCol1 = getRandomInt(0, 400 - 3 * heightBird)
      marginTopCol2 = getRandomInt(heightCol1 + 3 * heightBird, 400)
      while ((Math.abs(heightCol1 - marginTopCol2) > 6 * heightBird) || (heightCol1 != 0 && heightCol1 <= 8) || (marginTopCol2 != 400 && marginTopCol2 >= 392)){
        heightCol1 = getRandomInt(0, 400 - 3 * heightBird)
        marginTopCol2 = getRandomInt(heightCol1 + 3 * heightBird, 400)
      }
    }
    if (288 - xPos2 <= -widthCol){
      xPos2 = 0
      countCols += 1
      heightCol1_2 = getRandomInt(0, 400 - 3 * heightBird)
      marginTopCol2_2 = getRandomInt(heightCol1_2 + 3 * heightBird, 400)
      while ((Math.abs(heightCol1_2 - marginTopCol2_2) > 6 * heightBird) || (heightCol1_2 != 0 && heightCol1_2 <= 8) || (marginTopCol2_2 != 400 && marginTopCol2_2 >= 392)){
        heightCol1_2 = getRandomInt(0, 400 - 3 * heightBird)
        marginTopCol2_2 = getRandomInt(heightCol1_2 + 3 * heightBird, 400)
      }
      changePer = true
    }
    else{
      if (xPosApple != null){
        xPosApple += koefSpeedCols
      }
      if (xPosApple < -sizeApple){
        appleOnField = false
        xPosApple = null
        yPosApple = null
      }
      xPos += koefSpeedCols
      if (secCol){
        xPos2 += koefSpeedCols
      }
    }

    dlt = new Date(new Date() - dt)
    nameLvl()
    text1.innerText = 'Время:\n'
    text1.innerText += 'Минуты: ' + String(dlt.getUTCMinutes())
    text1.innerText += '\nСекунды: ' + String(dlt.getUTCSeconds())
    text1.innerText += '\nМиллисекунды: ' + String(dlt.getUTCMilliseconds())
    text1.innerText += '\n\nСложность уровня: ' + lvl
    if (!(stopGame)){
      requestAnimationFrame(draw)
    }
  }
  else{
    newGame(checkLive()[1])
  }
}



function moveUp(event){
  if (event.key == 'ArrowUp'){
    if (yPos - moveBirdUp < 0){
      yPos = 0
    }
    else{
      yPos -= moveBirdUp;
      if (checkLive()[0]){
        newGame(checkLive()[1])
      }
    }
  }
}


draw()
