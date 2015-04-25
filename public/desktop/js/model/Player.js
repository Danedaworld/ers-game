var Player = function (name, ID) {
    this.ID = ID ? ID : this.generateID();
    this.name = name ? name : this.ID;
    //this.hand = new Hand();

};

Player.prototype.slap = function () {
    //To-do
};

Player.prototype.playCard = function () {
    //To-do
};

Player.prototype.generateID = function () {
    var text = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++) {
        text += chars.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

window.Player = Player;