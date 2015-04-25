// Controller
var Main = function () {
    //setting Model and View
    this.ERS = new window.ERS();
    this.render = new window.Render(this.ERS);
    this.socket = io();
    this.setupEvents();
};

Main.prototype.setupEvents = function () {
    // These are all temporary placeholders

    this.socket.emit('joinHost', {});

    this.socket.on('joinPlayer', function (data) {
        console.log('A new player has joined!');
        this.ERS.addPlayer(data.name, data.id);
    }.bind(this));
    
    this.socket.on('leavePlayer', function (data) {
        console.log('A player has left!');
        this.ERS.removePlayer(data.id);
    }.bind(this));

    this.socket.on('playCard', function (data) {
        console.log('Play a card!');
    }.bind(this));

    this.socket.on('slap', function (data) {
        console.log('Slapped!');
    }.bind(this));

}

Main.prototype.play = function () {
    //To-Do
    this.render.draw();
};
    
var main = new Main();
main.play();
