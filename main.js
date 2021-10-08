let counter = 0;
let $cardChosenBack = [];
let $cardChosenFront = [];
const $cards = document.querySelectorAll('.card-front');
let $cardsUrl = [
"https://i.pinimg.com/originals/8c/74/37/8c7437379cdcd940a4229f28102bdc80.jpg",
"https://i.pinimg.com/originals/8c/74/37/8c7437379cdcd940a4229f28102bdc80.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaErfScJAGPLs517jilnu9sjXcoX1GG7CFBx8dZ4hKNrO00x2T48Sm65YEpOjY2HfPOdE&usqp=CAU", 
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaErfScJAGPLs517jilnu9sjXcoX1GG7CFBx8dZ4hKNrO00x2T48Sm65YEpOjY2HfPOdE&usqp=CAU",
"https://www.teahub.io/photos/full/105-1052004_iron-man-wallpaper-art.jpg",
"https://www.teahub.io/photos/full/105-1052004_iron-man-wallpaper-art.jpg", 
"https://tooys.mx/pub/media/catalog/product/cache/96210167b6a992dbdbaba9ff58d054c8/m/a/magneto_marvel_02_1.jpg",
"https://tooys.mx/pub/media/catalog/product/cache/96210167b6a992dbdbaba9ff58d054c8/m/a/magneto_marvel_02_1.jpg",
"https://i.pinimg.com/originals/3e/16/bf/3e16bff253abb380070095370ef15ae5.jpg",
"https://i.pinimg.com/originals/3e/16/bf/3e16bff253abb380070095370ef15ae5.jpg",
"https://images.hdqwalls.com/download/wolverine-comic-book-art-4k-mk-1125x2436.jpg",
"https://images.hdqwalls.com/download/wolverine-comic-book-art-4k-mk-1125x2436.jpg"
]

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
                $cardChosenBack[0].classList.add('hidden');
                $cardChosenBack[1].classList.add('hidden');
                $cardChosenFront[0].classList.add('hidden');
                $cardChosenFront[1].classList.add('hidden');
                $cardChosenBack = [];
                $cardChosenFront = [];
                unblockPlayerInput();
                if(counter === 6){
                    document.querySelector('h1').textContent = 'You win! press any button to play again'
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

document.querySelector('body').onkeydown = function(e){
    if(counter === 6){
        window.location.reload();
    }
}
