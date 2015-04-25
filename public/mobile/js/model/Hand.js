var Hand = function (cardList) {
    this.cardList = cardList ? cardList : [];
};

Hand.prototype.playTopCard = function () {
    if (this.cardList.length > 0) {
        this.playCard(0);
        return true;
    } else {
        return false;
    }
}

Hand.prototype.playCard = function (index) {
    index = index ? index : 0;
    var cardPos = this.cardList.length - 1 - index;
    return this.cardList.splice(cardPos, cardPos + 1);
};

Hand.prototype.addCard = function (card) {
    this.cardList.push(card);
};

window.Hand = Hand;
