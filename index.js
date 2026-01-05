let cardArray = [
    {
        name: "bee",
        Image: "bee.png"
    },
    {
        name: "dog",
        Image: "dog.png"
    },
    {
        name: "fox",
        Image: "fox.png"
    },
    {
        name: "cow",
        Image: "cow.png"
    },
    {
        name: "lion",
        Image: "lion.png"
    },
    {
        name: "owl",
        Image: "owl.png"
    },
    {
        name: "horde",
        Image: "horse.png"
    },
    {
        name: "hen",
        Image: "hen.png"
    },
    {
        name: "penguin",
        Image: "penguin.png"
    },
    {
        name: "rabbit",
        Image: "rabbit.png"
    }
]
// *****************************Variable diclare*******************8
let cardsection = document.getElementById("card-section")
let allcardimg = cardArray.concat(cardArray)
let count = 0;
let move = 0
let first = ''
let second = ''
let body = document.querySelector("body")
let sounds = document.querySelector('.sound')
let click = new Audio('flip.mp3')
let mainsection = document.getElementById("main-section")
let backgroundmusic = new Audio('background.mp3')
backgroundmusic.loop = true
let matchsound = new Audio('match.wav')
let finish = new Audio('finish.mp3')
let button = document.getElementById('btn')
let restart = document.getElementById("refresh-game")
// *************************start the game********************
button.addEventListener("click", () => {
    button.classList.toggle("start");
    cardsection.classList.toggle("start");
    mainsection.classList.toggle("start");
    restart.classList.toggle("play-again");
    backgroundmusic.play()
})
// backgroundmusic.autoplay()
//*****************************random position or suffel array elements*************** */

function myfun(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))   //a=4 b=5 let c
        let temp = array[i];                        //c=a
        array[i] = array[j];                       //a=b
        array[j] = temp;                       //b=c   output: a=5 b=4
    }
    return array;
}


let suffelArray = myfun(allcardimg);

// shuffelArray()
// let suffelArray = myfun(allcardimg)
// console.log(allcardimg)



for (let i = 0; i < allcardimg.length; i++) {
    let cardDiv = document.createElement("div")
    cardDiv.classList.add("cards")
    cardDiv.dataset.name = allcardimg[i].name;
    cardsection.appendChild(cardDiv)
    let fontcard = document.createElement("div")
    fontcard.classList.add("font")
    let backcard = document.createElement("div")
    backcard.classList.add("back")
    backcard.style.backgroundImage = `url(${allcardimg[i].Image})`
    backcard.style.backgroundRepeat = `no-repeat`
    backcard.style.backgroundPosition = `center`
    backcard.style.backgroundSize = `60px 60px`
    cardDiv.appendChild(fontcard)
    cardDiv.appendChild(backcard)

}
function gameoverfun() {
    backgroundmusic.pause()
    finish.play()
    let gameoverNow = document.getElementById("game-over")
    gameoverNow.classList.add("over-now")
    let gamestatus=document.getElementById("h3");
   if(move<20)
   {
    gamestatus.innerText="Game Won"
   }
    let score = document.createElement('p')
    score.className = "score"
    // score.style.color="blue"
    score.innerHTML = `MOVE: ${move}`
    gameoverNow.appendChild(score)
    let refresh = document.createElement('div')
    refresh.className = "refresh-div"
    refresh.innerHTML = '<p>Play again:</p>' + ' <input id="refresh-game" class="game-over-refresh"  value="" onclick="window.location.reload(true)">'
    gameoverNow.appendChild(refresh)
    // console.log("hello");
    // console.log("hello")
}
// gameoverfun()
let firstMatch = ''
let secondMatch = ''
function cardMatch(index) {
    let selectCard = document.querySelectorAll(".select-card")

    matchsound.play()
    selectCard.forEach((e) => {
        e.classList.add('card-match')

    })

}
let resetGame = () => {
    count = 0;
    first = ''
    second = ''
    let selectCard = document.querySelectorAll(".select-card")
    selectCard.forEach((e) => {
        e.classList.remove('select-card')
    })
}
let f1 = ''
let f2 = ''
let moveSection = document.getElementById("move-count")
moveSection.innerHTML = `<span id="moves">Move:</span> ${0}`
// *********************************add event listner*********************************//
let allcardBox = document.querySelectorAll('.cards')
let gameOver = 0;
// console.log(gameOver)
let i;
allcardBox.forEach(allcards)
function allcards(all, index) {

    // console.log(allcardBox[index])
    all.addEventListener('click', (e) => {
        // console.log(all)
        // console.log(allcardBox[index], index)
        let currentcard = e.target
        // console.log(currentcard[index], index)
        // move++;
        // moveSection.innerHTML = `<span>Move:</span> ${move}`
        count++;
        if (count <= 2) {
            if (count == 1 && !allcardBox[index].classList.contains("card-match")) {
                first = currentcard.parentNode.dataset.name
                // console.log(first)
                currentcard.parentNode.classList.add('select-card')
                i = index
                // console.log(i)
                click.play()
            }

            else {
                if (i != index && !allcardBox[index].classList.contains("card-match")) {
                    click.play()
                    let j = index;
                    // console.log(j)
                    if (count > 1 && i != j) {
                        move++;
                        moveSection.innerHTML = `<span>Move:</span> ${move}`
                        second = currentcard.parentNode.dataset.name
                        currentcard.parentNode.classList.add('select-card')
                    }
                }
                else {
                    count--;

                }
            }
            console.log("move:" + move);
            // console.log(allcardBox[index]);
            if (first != '' && second != '') {
                if (first == second) {
                    setTimeout(() => {
                        cardMatch(index)
                        // console.log(allcardBox[index]);
                        resetGame()
                    }, 1000)
                    gameOver++
                    if (gameOver === 10) {
                        setTimeout(() => {
                            gameoverfun()
                        }, 1000)
                    }
                }
                else {
                    setTimeout(() => {

                        resetGame()
                    }, 1000)

                }
            }
            if (move === 20) {
                setTimeout(() => {
                    gameoverfun()
                }, 1000)
            }

        }

    })
}
let toggle = 0;
sounds.addEventListener('click', (sound) => {
    sounds.classList.toggle('unmute')
    toggle++;

    if (toggle == 1) {
        backgroundmusic.pause()
    }
    else {
        backgroundmusic.play();
        toggle = 0;
    }
    console.log(toggle);
})
