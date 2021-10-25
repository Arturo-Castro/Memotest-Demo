/// <reference types="cypress"/>

const URL = 'http://192.168.0.119:8080';
const NUMBER_OF_CARDS = 12;

context('Memotest', () => {
    before(() => {
        cy.visit(URL);
    });

    describe('Checks the board', () => {
        it('Verifies the number of cards in the board', () => {
            cy.get('.container').find('.card-front').should('have.length', NUMBER_OF_CARDS);
        });

        it('Makes sure that the cards position is random', () => {
            cy.get('.card-content').then(cards => {
                let originalCards = [];
                cards.each(function(i, card){
                    const cardName = card.src.replace(`${URL}/img/`, '').split('.')[0];
                    originalCards.push(cardName);
                });
                
                cy.visit(URL);

                cy.get('.card-content').then(cards => {
                    let newCards = [];
                    cards.each(function(i, card){
                        const cardName = card.src.replace(`${URL}/img/`, '').split('.')[0];
                        newCards.push(cardName);
                    }); 
                    
                    cy.wrap(originalCards).should('not.deep.equal', newCards);
                });
            });
        });
    });

    describe('Solves the game', () => {
        let pairMap, pairList;
        it('Chooses a wrong pair', () => {
            cy.get('.card-content').then(cards => {
                pairMap = getPairOfCards(cards);
                pairList = Object.values(pairMap);
                console.log(pairMap);
                console.log(pairList);
                
                pairList[0][0].parentNode.previousElementSibling.firstElementChild.click();
                pairList[1][0].parentNode.previousElementSibling.firstElementChild.click();
                cy.wait(1100);
                cy.wrap(pairList[0][0].parentNode.previousElementSibling.firstElementChild).should('not.have.class', 'hidden');
                cy.wrap(pairList[1][0].parentNode.previousElementSibling.firstElementChild).should('not.have.class', 'hidden');
            });
        });
        
        it('Solves the game', () => {
            cy.get('.card-content').should('have.length', NUMBER_OF_CARDS);
            pairList.forEach(pair => {
                console.log(pair);
                cy.wait(1000);
                cy.get(pair[0].parentNode.previousElementSibling.firstElementChild).click();
                cy.get(pair[1].parentNode.previousElementSibling.firstElementChild).click();
                cy.wait(1000);
            });
           cy.get('.card-front').should('have.class', 'hidden');
           cy.get('h1').should('contain.text', 'You win!, restarting...');
        });
    });

}); 

function getPairOfCards(cards){
    const pairs = {};

    cards.each(function(i, card){
        const cardName = card.src.replace(`${URL}/img/`, '').split('.')[0];
     
        if(pairs[cardName]){
            pairs[cardName].push(card);
        } else {
            pairs[cardName] = [card];
        }
    });
    return pairs;
};
