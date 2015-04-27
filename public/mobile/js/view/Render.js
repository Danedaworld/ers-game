// View
var Render = function (hand) {
    this.hand = hand;
    this.setupCanvas();
};

Render.prototype.setupCanvas = function () {
    this.canvas = $('#gameCanvas')[0];
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
};

Render.prototype.draw = function (color) {
    // Render board
    // this.ctx.fillStyle = '#BFB64D';
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    color = color ? color : '#BFB64D';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    $('#gameCanvas').css('background-color', color);
    // Draw hand
    

    var img = new Image();
	img.src = '../../img/cardBack_blue5.png';
	img.onload = function () {
	    var offsetX = img.width/2;
	    var offsetY = img.height/2;
	    for (var i = 0; i < this.hand.cardList.length; i++) {
	    	this.ctx.drawImage(img, i - offsetX + window.innerWidth / 2, i - offsetY + window.innerHeight / 2);
	    }
	}.bind(this);
    this.ctx.font = '48px Arial';
    this.ctx.fillText(this.hand.cardList.length, window.innerWidth/2 - 25, window.innerHeight - 75);

};

// var card = this.hand.cardList[i];
    	// img.src = '../../img/card' + card.suite + card.value;

window.Render = Render;