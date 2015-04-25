var Deck = function (cardList) {
    this.cardList = cardList ? cardList : [];
    this.numCards = cardList.length;
};

Deck.prototype.drawCard = function () {
    return this.cardList.pop();
};

Deck.prototype.addCard = function (card, addToTop) {
    if (addToTop) {
        this.cardList.push(card);
    } else {
        this.cardList.unshift(card);
    }
};

window.Deck = Deck;
