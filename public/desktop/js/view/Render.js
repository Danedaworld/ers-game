// View
var Render = function (ERS) {
    this.ERS = ERS;
    this.setupCanvas();
};

Render.prototype.setupCanvas = function () {
    this.canvas = $('#gameCanvas')[0];
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.center = {'x': window.innerWidth/2, 'y': window.innerHeight/2};
};

Render.prototype.draw = function () {
	// Render board
    $('#gameCanvas').css('background-color', '#148a2a');
};

Render.prototype.playCard = function (card) {
	var img = new Image();
    img.src = '../../img/card' + card.suite + card.value + '.png';
    img.onload = function () {
	    var randomRotation = Math.random() * 2 - 1;
	    var randomOffsetX = Math.random() * 100 - 50;
	    var randomOffsetY = Math.random() * 100 - 50;
    	this.ctx.save();
   	    this.ctx.translate(this.center.x - img.width/2 - randomOffsetX, this.center.y - img.height/2 - randomOffsetY);
	    this.ctx.translate(img.width / 2, img.height / 2);
	    this.ctx.rotate(randomRotation);
	    this.ctx.translate(-img.width / 2, -img.height / 2);
	    this.ctx.drawImage(img, 0, 0);
	    this.ctx.restore();
    }.bind(this);
    
}

Render.prototype.clearBoard = function () {
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    $('#gameCanvas').css('background-color', '#BFB64D');
}

Render.prototype.burnCard = function (card) {
	var img = new Image();
    img.src = '../../img/card' + card.suite + card.value + '.png';
    img.onload = function () {
    	this.ctx.save();
	    this.ctx.translate(100, 100);
	    this.ctx.drawImage(img, 0, 0);
	    this.ctx.restore();
    }.bind(this);
}

window.Render = Render;