var ERS = function () {
    this.board = new Board();
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

ERS.prototype.slap = function (id) {
    if (this.isSlappable === 1) {   // Winner of the slap
        this.isSlappable = 0;
        return {'result': this.board.getCardList(), 'id':id};
    } else if (this.isSlappable === 0) {   // Slaps are ignored
        return {'result': null, 'id':id};
    } else {   // Burn use
        return {'result': 'penalty', 'id':id};
    }
};

window.ERS = ERS;