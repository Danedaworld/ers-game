var Deck = function (cardList=[]) {
    this.cardList = cardList;
    this.numCards = cardList.length;
};

Deck.prototype.drawCard = function () {
    return this.cardList.pop();
};

Deck.prototype.addCard = function (card, addToTop=false) {
    if (addToTop) {
        this.cardList.unshift(card);
    } else {
        this.cardList.push(card);
    }
};

window.Deck = Deck;
