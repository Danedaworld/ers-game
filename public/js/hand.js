var canvas = $('#gameCanvas')[0];
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



var drawHand = function() {
    context.fillStyle = '#CCAC4B';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

drawHand();