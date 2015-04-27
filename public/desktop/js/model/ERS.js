var ERS = function () {
    this.cardPile = []
    this.burnPile = []
    this.playerList = [];
    this.currentPlayer = null;
    this.currentPlayerIndex = -1;
    this.numCardsToPlay = 1;
    this.isFaceCard = false;
    this.faceCardPlayer = null;
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
        if (this.playerList[i].id === id) {
            return this.playerList[i];
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

// Play a card onto the cardPile
ERS.prototype.playCard = function (card, id) {
    console.log(card);
    this.cardPile.push(card);
    this.numCardsToPlay--;
    return this.checkGameState(card, id);
};

ERS.prototype.burnCard = function (card) {
    this.burnPile.push(card);
}

// Checks if the cards on the cardPile can be slapped or not.
ERS.prototype.checkGameState = function (card, id) {
    var size = this.cardPile.length;
    var topCard = card;
    if (size > 1 && topCard.value === this.cardPile[size - 2].value) {
        this.isSlappable = 1;
    } else if (size > 2 && this.cardPile[size - 1].value === this.cardPile[size - 3].value) {
        this.isSlappable = 1;
    } else {
        this.isSlappable = -1;
    }
    if (topCard.value === 'J') {
        this.faceCardPlayer = this.currentPlayer;
        this.numCardsToPlay = 1;
        this.forceNextPlayer();
        this.isFaceCard = true;
    } else if (topCard.value === 'Q') {
        this.faceCardPlayer = this.currentPlayer;
        this.numCardsToPlay = 2;
        this.forceNextPlayer();
        this.isFaceCard = true;
    } else if (topCard.value === 'K') {
        this.faceCardPlayer = this.currentPlayer;
        this.numCardsToPlay = 3;
        this.forceNextPlayer();
        this.isFaceCard = true;
    } else if (topCard.value === 'A') {
        this.faceCardPlayer = this.currentPlayer;
        this.numCardsToPlay = 4;
        this.forceNextPlayer();
        this.isFaceCard = true;
    } else if (this.isFaceCard && this.numCardsToPlay === 0) {
        var cardList = this.cardPile.concat(this.burnPile);
        this.cardPile = [];
        this.burnPile = [];
        this.setCurrentPlayer(this.faceCardPlayer.id);
        this.isFaceCard = false;
        return {'cards': cardList, 'id':this.faceCardPlayer.id}
    }
    if (this.numCardsToPlay === 0) {
        this.isFaceCard = false;
    }
    this.nextPlayer();

}

ERS.prototype.setStartingPlayer = function () {
    this.currentPlayerIndex = Math.floor(this.playerList.length * Math.random());
    this.currentPlayer = this.playerList[this.currentPlayerIndex];
}

ERS.prototype.forceNextPlayer = function () {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerList.length;
    this.currentPlayer = this.playerList[this.currentPlayerIndex];
}

ERS.prototype.nextPlayer = function () {
    if (!this.isFaceCard) {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerList.length;
        this.currentPlayer = this.playerList[this.currentPlayerIndex];
        if (this.numCardsToPlay === 0) {
            this.numCardsToPlay = 1; 
        }
    }
    return this.currentPlayer;
}

ERS.prototype.setCurrentPlayer = function (id) {
    this.currentPlayer = this.getPlayerByID(id);
    this.currentPlayerIndex = this.playerList.indexOf(this.currentPlayer);
}

// Slap the cards on the board
ERS.prototype.slap = function (id) {
    if (this.isSlappable === 1) {   // Winner of the slap
        this.isSlappable = 0;
        var cardList = this.cardPile.concat(this.burnPile); // combine burn + board card piles
        this.cardPile = []; // reset those piles
        this.burnPile = [];
        this.setCurrentPlayer(id);
        return {'result': cardList, 'id':id};
    } else if (this.isSlappable === 0) {   // Slaps are ignored
        return {'result': null, 'id':id};
    } else {   // Burn use
        return {'result': 'penalty', 'id':id};
    }
};

window.ERS = ERS;