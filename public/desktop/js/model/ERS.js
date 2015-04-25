var ERS = function () {
    this.board = new Board();
    this.playerList = [];
    this.currentPlayer = null;
};

ERS.prototype.addPlayer = function (player) {
    this.playerList.push(player);
};

ERS.prototype.removePlayer = function (player) {
    var index = this.playerList.indexOf(player);
    this.playerList.splice(index, index + 1);
};


window.ERS = ERS;