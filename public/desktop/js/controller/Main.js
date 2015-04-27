// Controller
var Main = function () {
    //setting Model and View
    this.ERS = new window.ERS();
    this.render = new window.Render(this.ERS);
    this.socket = io();
    this.setupEvents();
};

Main.prototype.setupEvents = function () {
    // This is primarily interaction logic

    this.socket.emit('joinHost', {});

    this.socket.on('joinPlayer', function (data) {
        console.log('A new player has joined!');
        this.ERS.addPlayer(data.name, data.id);
        this.socket.emit('syncSuccess', {'id': data.id});
        if (this.ERS.playerList.length > 1) {
            console.log('The game can now be started!');
            this.socket.emit('gameCanBeStarted');
        }
    }.bind(this));
    
    this.socket.on('leavePlayer', function (data) {
        console.log('A player has left!');
        this.ERS.removePlayer(data.id);
    }.bind(this));

    this.socket.on('startGameRequest', function () {
        console.log('Game has now begun!');
        this.socket.emit('gameStarted');        
        this.play();

    }.bind(this));

    this.socket.on('playCard', function (data) {
        console.log('Played ' + data.card.value + ' ' + data.card.suite);
        this.render.playCard(data.card);
        var result = this.ERS.playCard(data.card, data.id);
        if (result) {
            setTimeout(function () {
                this.socket.emit('giveCards', result);
                this.render.clearBoard();
            }.bind(this), 500);
            
        }
        this.socket.emit('nextPlayer', {'id': this.ERS.currentPlayer.id}); // the currentPlayer is set to the next player
    }.bind(this));

    this.socket.on('penaltyCard', function (data) {
        console.log('Penalized a card!');
        this.ERS.burnCard(data);
        this.render.burnCard(data);
    }.bind(this));

    this.socket.on('slap', function (data) {
        console.log('Slapped!');
        var result = this.ERS.slap(data.id);
        this.socket.emit('slapResult', result);
        if (result === 'penalty') {
            console.log('BURN A CARD!');
        } else if (result !== null) {
            this.render.clearBoard();
        }
        this.socket.emit('nextPlayer', {'id': this.ERS.currentPlayer.id});
    }.bind(this));

    this.socket.on('noCardsRemaining', function (data) {
        this.ERS.dormantPlayer(data.id);
        this.ERS.checkGameOver();
    }.bind(this)); 

    this.socket.on('render', function (data) {
        this.render.draw();
    }.bind(this));


};

Main.prototype.start = function () {
    this.render.draw();
};

Main.prototype.play = function () {
    //To-Do
    var piles = this.ERS.dealCards();
    for (var i = 0; i < piles.length; i++) {
        this.socket.emit('giveCards', {'id': this.ERS.playerList[i].id, 'cards': piles[i]});
    }
    this.ERS.setStartingPlayer();
    this.socket.emit('nextPlayer', {'id': this.ERS.currentPlayer.id})
};
    
var main = new Main();
main.start();
