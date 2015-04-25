var ERS = function () {
    this.board = new Board();
    this.playerList = [];
    this.currentPlayer = null;
};

ERS.prototype.addPlayer = function (name, id) {
    this.playerList.push(new window.Player(name, id));
};

ERS.prototype.removePlayer = function (id) {
    var index = this.getPlayerByID(id);
    this.playerList.splice(index, index + 1);
};

ERS.prototype.getPlayerByID = function (id) {
    for (var i = 0; i < this.playerList.length; i++) {
        if (this.playerList.id === id) {
            return i;
        }
    }
    return null;
}

window.ERS = ERS;