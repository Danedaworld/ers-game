var Hand = function (cardList=[]) {
    this.cardList = cardList;
};

Hand.prototype.playCard = function (index=0) {
    var cardPos = this.cardList.length - 1 - index;
    return this.cardList.splice(cardPos, cardPos + 1);
};

Hand.prototype.addCard = function (card) {
    this.cardList.push(card);
}

window.Hand = Hand;

// var canvas = $('#gameCanvas')[0];
// var context = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;



// var drawHand = function() {
//     context.fillStyle = '#CCAC4B';
//     context.fillRect(0, 0, canvas.width, canvas.height);
// }

// drawHand();