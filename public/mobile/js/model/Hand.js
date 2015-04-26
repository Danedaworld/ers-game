var Hand = function (cardList) {
    this.cardList = cardList ? cardList : [];
};

Hand.prototype.playTopCard = function () {
    if (this.cardList.length > 0) {
        return this.playCard(0);
    } else {
        return false;
    }
}

Hand.prototype.playCard = function (index) {
    index = index ? index : 0;
    var cardPos = this.cardList.length - 1 - index;
    return this.cardList.splice(cardPos, 1)[0];
};

Hand.prototype.addCard = function (card) {
    this.cardList.push(card);
};

Hand.prototype.addCardToBottom = function (card) {
    this.cardList.unshift(card);
};

Hand.prototype.addCardPile = function (pile) {
    for (var i = 0; i < pile.length; i++) {
        this.addCardToBottom(pile[i]);
    }
}

window.Hand = Hand;
