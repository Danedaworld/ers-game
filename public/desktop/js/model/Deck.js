var Deck = function (cardList) {
    this.cardList = cardList ? cardList : [];
    this.standardDeckSize = 52;
    this.setupDeck();
};

Deck.prototype.setupDeck = function () {
    var suites = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
    var faceCards = ['J', 'Q', 'K', 'A'];
    for (var i = 2; i <= 10; i++) {
        for (var j = 0; j < 4; j++) {
            this.cardList.push(new Card(i, suites[j]));
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            this.cardList.push(new Card(faceCards[i], suites[j]));
        }
    }
    this.shuffle();
};

Deck.prototype.drawCard = function () {
    return this.cardList.pop();
}

Deck.prototype.drawCards = function (numTimes) {
    var drawn = [];
    for (var i = 0; i < numTimes; i++) {
        drawn.push(this.cardList.pop());
    }
    return drawn;
};

Deck.prototype.addCard = function (card, addToTop) {
    if (addToTop) {
        this.cardList.push(card);
    } else {
        this.cardList.unshift(card);
    }
};

Deck.prototype.shuffle = function () {
    var remaining = this.standardDeckSize;
    var shuffled = []
    for (var i = 0; i < this.standardDeckSize; i++) {
        var index = Math.floor(Math.random() * remaining);
        shuffled.push(this.cardList[index]);
        this.cardList.splice(index, 1);
        remaining--;
    }
    this.cardList = shuffled;
};

Deck.prototype.printDeck = function () {
    for (var i = 0; i < this.cardList.length; i++) {
        console.log(this.cardList[i]);
    }
};

window.Deck = Deck;
