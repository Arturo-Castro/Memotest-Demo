let counter = 0;
let $cardChosenBack = [];
let $cardChosenFront = [];
const $cards = document.querySelectorAll('.card-front');
let $cardsUrl = [
"./img/Apocalypse.jpg",
"./img/Ironman.jpg", 
"./img/Magneto.jpg", 
"./img/Spiderman.jpg",
"./img/Venom.jpg",
"./img/Wolverine.jpg"
]
$cardsUrl = $cardsUrl.concat($cardsUrl);
const winningCondition = $cardsUrl.length/2;

function blockPlayerInput(){
    $cards.forEach(function($card){
        $card.onclick = null;
    })
}

function unblockPlayerInput(){
    $cards.forEach(function($card){
        $card.onclick = analyzeRound;
    })
}

function analyzeRound(e){
    e.target.parentNode.parentNode.parentNode.classList.add('flip');
    $cardChosenBack.push(e.target.parentNode.nextElementSibling.firstElementChild);
    $cardChosenFront.push(e.target);
    $cardChosenFront[0].onclick = null;
    if($cardChosenBack.length === 2){
        blockPlayerInput();
        if($cardChosenBack[0].src === $cardChosenBack[1].src){
            counter++;
            setTimeout(function(){
                [$cardChosenBack[0], $cardChosenBack[1], $cardChosenFront[0], $cardChosenFront[1]].forEach(function($card){
                    $card.classList.add('hidden');
                })
                $cardChosenBack = [];
                $cardChosenFront = [];
                unblockPlayerInput();
                if(winningCondition === counter){
                    document.querySelector('h1').textContent = 'You win!, restarting...';
                    setTimeout(function(){
                        window.location.reload();
                    }, 2000);
                } 
            }, 1100);
        }else{
            setTimeout(function(){
            $cardChosenFront[0].parentNode.parentNode.parentNode.classList.remove('flip');
            $cardChosenFront[1].parentNode.parentNode.parentNode.classList.remove('flip');
            $cardChosenBack = [];
            $cardChosenFront = []; 
            unblockPlayerInput();
            }, 1100);
        } 
    }
}

$cards.forEach(function($card){
    $card.onclick = analyzeRound;
})

for(let i= $cardsUrl.length-1; i >= 0 ; i--){
    const randomPick = Math.floor(Math.random() * (i+1));
    document.querySelector(`#img-${i+1}`).src = $cardsUrl[randomPick];
    $cardsUrl.splice(randomPick, 1);
}
