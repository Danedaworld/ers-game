var Main = function () {
    this.hand = new window.Hand();
    this.render = new window.Render(this.hand);
    this.socket = io();
    this.setupEvents();
};

Main.prototype.setupEvents = function () {
    console.log($('#gameCanvas'));

};

Main.prototype.play = function () {
    this.render.draw();
};

var main = new Main();
main.play();