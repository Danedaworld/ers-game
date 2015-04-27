var Main = function () {
    this.hand = new Hand();
    this.render = new Render(this.hand);
    this.socket = io();
    this.setupEvents();
    this.isSynced = false;
    this.canStart = false;
    this.isMyTurn = false;
    this.isPlaying = 1;
    this.tapStart = {};
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

    // Gesture event handlers (I tried JQuery/Hammer and decided to just write my own custom events)
    var hammer = new Hammer($('#gameCanvas')[0]); 
    var canvas = $('#gameCanvas')[0];
    canvas.addEventListener('touchend', function (event) {
        if (this.isMyTurn && this.isPlaying === 1) {
            if (event.changedTouches[0].identifier === this.tapStart.event.targetTouches[0].identifier) {
                var time = Date.now();
                var touch = event.changedTouches[0];
                if (time - this.tapStart.time > 100 && this.tapStart.touch.pageY - touch.pageY > 100) { // naive 'swipe' motion
                    console.log('Swipe motion registered');
                    var card = this.hand.playTopCard();
                    console.log(card);
                    if (card) {
                        this.socket.emit('playCard', {'card': card});
                        this.render.draw();
                    } else {
                        this.isPlaying = 0;
                        this.socket.emit('noCardsRemaining');
                    }
                }
            }
        }
    }.bind(this));


    canvas.addEventListener('touchstart', function (event) {
        console.log(event);
        // if (this.isPlaying === 0) {
        //     return;
        // }
        if (event.targetTouches.length === 1 && this.isMyTurn && this.isPlaying) { // this should be a single-finger swipe event
            this.tapStart = {'time': Date.now(), 'event': event, 'touch': event.targetTouches[0]};
        }
        if (event.targetTouches.length === 4) { // this should be a four-finger tap
            console.log('Tap');
            this.socket.emit('slap');
        }
    }.bind(this));

    // Socket event handlers

    this.socket.on('syncSuccess', function (data) {
        console.log('Sync is successful.');
        this.isSynced = true;
        this.id = data.id;
        $('#syncStep').hide();
        $('#start').prop('disabled', true);
        $('#startStep').show();
    }.bind(this));

    this.socket.on('gameCanBeStarted', function () {
        console.log('The game can now be started.');
        $('#start').prop('disabled', false);
    });

    this.socket.on('gameStarted', function () {
        if (this.isSynced) {
            console.log('The game has begun!');
            $('#startStep').hide();
            $('#gameCanvas').show();
            this.play();
        }

    }.bind(this));

    this.socket.on('nextPlayer', function (data) {
        if (data.id === this.id) {
            console.log('It is my turn');
            this.isMyTurn = true;
        } else {
            console.log('It is ' + data.id + ' turn.');
            this.isMyTurn = false;
        }
    }.bind(this));

    this.socket.on('slapResult', function (data) {
        if (data.result === 'penalty') {
            console.log('Burn a card!');
            var card = this.hand.playCard();
            this.socket.emit('penaltyCard', card);
        } else if (data.result === null) {
            
        } else if (data.result.length > 0) {
            console.log('You get the pile!');
            this.hand.addCardPile(data.result);
        }
    }.bind(this));

    this.socket.on('giveCards', function (data) {
        console.log('Received cards!');
        console.log(data.cards);
        this.hand.addCardPile(data.cards);
        this.render.draw();
    }.bind(this));

    this.socket.on('render', function (data) {
        this.render.draw();
    }.bind(this));

};

Main.prototype.start = function () {
    $('#gameCanvas').hide();
    $('#startStep').hide();

    //this.render.draw();        


}

Main.prototype.play = function () {
    this.render.draw();
};

var main = new Main();
main.start();