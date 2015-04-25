var Board = function (cardList) {
    this.cardList = cardList ? cardList : [];
};

Board.prototype.addCard = function (card) {
    this.cardList.push(card);
};

Board.prototype.getCardList = function () {
    return this.cardList;
};

window.Board = Board;
