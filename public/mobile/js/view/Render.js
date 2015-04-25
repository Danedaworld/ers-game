// View
var Render = function (Hand) {
    this.Hand = Hand;
    this.setupCanvas();
};

Render.prototype.setupCanvas = function () {
    this.canvas = $('#gameCanvas')[0];
    this.context = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
};

Render.prototype.draw = function () {
    // Render board
    this.context.fillStyle = '#BFB64D';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

window.Render = Render;