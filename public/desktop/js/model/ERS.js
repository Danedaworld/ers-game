var ERS = function () {
    this.board = []
    this.playerList = [];
    this.currentPlayer = null;
    this.slappers = [];
    this.isSlappable = 0;
};

ERS.prototype.addPlayer = function (name, id) {
    var player = new Player(name, id);
    console.log(player);
    if (this.playerList.indexOf(player) === -1) {
        this.playerList.push(player);
    }
};

ERS.prototype.removePlayer = function (id) {
    var index = this.getPlayerByID(id);
    this.playerList.splice(index, 1);
};

ERS.prototype.getPlayerByID = function (id) {
    for (var i = 0; i < this.playerList.length; i++) {
        if (this.playerList.id === id) {
            return i;
        }
    }
    return null;
}

// Deal cards fresh from a deck
ERS.prototype.dealCards = function () {
    var numPlayers = this.playerList.length;
    var deck = new Deck();
    var cardPiles = new Array(numPlayers);
    for (var i = 0; i < numPlayers; i++) {
        cardPiles[i] = [];
    }
    for (var i = 0; i < 52; i++) {
        cardPiles[i % numPlayers].push(deck.drawCard());
    }
    return cardPiles;
};

// Play a card onto the board
ERS.prototype.playCard = function (card) {
    this.cardList.push(card);
    this.checkGameState();
};

// Checks if the cards on the board can be slapped or not.
ERS.prototype.checkGameState = function () {
    var size = this.cardList.length;
    if (size > 1 && this.cardList[size - 1].value === this.cardList[size - 2].value) {
        this.isSlappable = 1;
    } else if (size > 2 && this.cardList[size - 1].value === this.cardList[size - 3].value) {
        this.isSlappable = 1;
    } else {
        this.isSlappable = -1;
    }
}


// Slap the cards on the board
ERS.prototype.slap = function (id) {
    if (this.isSlappable === 1) {   // Winner of the slap
        this.isSlappable = 0;
        var cardList = this.board;
        this.board = [];
        return {'result': cardList, 'id':id};
    } else if (this.isSlappable === 0) {   // Slaps are ignored
        return {'result': null, 'id':id};
    } else {   // Burn use
        return {'result': 'penalty', 'id':id};
    }
};

window.ERS = ERS;