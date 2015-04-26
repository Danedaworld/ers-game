var Main = function () {
    this.hand = new window.Hand();
    this.socket = io();
    this.setupEvents();
    this.isSynced = false;
    this.canStart = false;
};

Main.prototype.setupEvents = function () {
    // DOM event handlers
    $('#sync').on('click', function () {
        var name = $('#name').val();
        this.socket.emit('joinPlayer', {'name': name});
    }.bind(this));

    $('#start').on('click', function () {
        this.socket.emit('startGameRequest', {});
    }.bind(this));

    // Gesture event handlers
    var hammer = new Hammer($('#gameCanvas')[0]);
    hammer.on('press', function (data) {
        var card = this.hand.playTopCard();
        console.log(card);
        if (card) {
            this.socket.emit('playCard', {'card': card});
        } else {
            this.socket.emit('noCardsRemaining');
        }

    }.bind(this));

    hammer.on('tap', function (data) {
        if (data.tapCount > 2) { 
            console.log('Tap');
            this.socket.emit('slap');
        }
    }.bind(this));

    // Socket event handlers

    this.socket.on('syncSuccess', function () {
        console.log('Sync is successful.');
        this.isSynced = true;
        $('#syncStep').hide();
        $('#start').prop('disabled', true);
        $('#startStep').show();
    }.bind(this));

    this.socket.on('gameCanBeStarted', function () {
        console.log('The game can now be started.');
        $('#start').prop('disabled', false);
    });

    this.socket.on('gameStarted', function () {
        console.log('The game has begun!');
        $('#startStep').hide();
        $('#gameCanvas').show();
        this.play();

    }.bind(this));

    this.socket.on('slapResult', function (data) {
        if (data.result === 'penalty') {
            console.log('Burn a card!');
            var card = this.hand.playCard();
            this.socket.emit('penaltyCard', card);
        } else if (data.result === null) {
            //do nothing
        } else if (data.result.length > 0) {
            console.log('You get the pile!');
            this.hand.addCardPile(data.result);
        }
    }.bind(this));

    this.socket.on('dealCards', function (data) {
        console.log('Received dealt cards!');
        console.log(data.cards);
        this.hand.addCardPile(data.cards);
    }.bind(this));

};

Main.prototype.start = function () {
    $('#gameCanvas').hide();
    $('#startStep').hide();

    //this.render.draw();        


}

Main.prototype.play = function () {
    this.render = new window.Render(this.hand);
};

var main = new Main();
main.start();