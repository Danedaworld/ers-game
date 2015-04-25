var Main = function () {
    this.hand = new window.Hand();
    this.render = new window.Render(this.hand);
    this.socket = io();
    this.setupEvents();
};

Main.prototype.setupEvents = function () {
    var hammer = new Hammer($('#gameCanvas')[0]);

    this.socket.emit('joinPlayer', {});

    hammer.on('press', function (data) {
        console.log('Pan up');
        if (this.hand.playTopCard()) {
            this.socket.emit('swipe');
        } else {
            this.socket.emit('noCardsRemaining');
        }

    }.bind(this));

    hammer.on('tap', function (data) {
        if (data.tapCount > 2) { 
            console.log('Tap');
            this.socket.emit('tap');
        }
    }.bind(this));

};

Main.prototype.play = function () {
    this.render.draw();
};

var main = new Main();
main.play();