var ERS = function () {
    this.board = new Board();
    this.playerList = [];
    this.isPlaying = false;
    this.currentPlayer = null;
    this.setupCanvas();
}

ERS.prototype.addPlayer = function (player) {
    this.playerList.push(player);
}

ERS.prototype.removePlayer = function (player) {
    var index = this.playerList.indexOf(player);
    this.playerList.splice(index, index + 1);
}

ERS.prototype.play = function () {
    this.isPlaying = true;
    while (isPlaying) {
        this.render();
    }
}

ERS.prototype.setupCanvas = function () {
    this.canvas = $('#gameCanvas')[0];
    this.context = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
}

ERS.prototype.render = function () {
    // Render board
    this.
}

var drawBoard = function() {
    context.fillStyle = '#148c2a';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

drawBoard();