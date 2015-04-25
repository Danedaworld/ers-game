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

    this.socket.on('joinPlayer', function (event) {
        console.log('A new player has joined!');
    });
    
    this.socket.on('leavePlayer', function (event) {
        console.log('A player has left!');
    });

    this.socket.on('playCard', function (event) {
        console.log('Play a card!');
    });

    this.socket.on('slap', function (event) {
        console.log('Slapped!');
    });

}

Main.prototype.play = function () {
    //To-Do
    this.render.draw();
};
    
var main = new Main();
main.play();
