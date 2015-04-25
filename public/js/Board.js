var Board = function (cardList=[]) {
    this.cardList = cardList;
}

Board.prototype.addCard = function (card) {
    this.cardList.push(card);
}

Board.prototype.getCardList = function () {
    return this.cardList;
}

window.Board = Board;


// var canvas = $('#gameCanvas')[0];
// var context = canvas.getContext("2d");

// var drawBoard = function() {
//     context.fillStyle = '#148c2a';
//     context.fillRect(0, 0, canvas.width, canvas.height);
// }
// drawBoard();