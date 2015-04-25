var canvas = $('#gameCanvas')[0];
var context = canvas.getContext("2d");

var drawBoard = function() {
    context.fillStyle = '#148c2a';
    context.fillRect(0, 0, canvas.width, canvas.height);
}
drawBoard();