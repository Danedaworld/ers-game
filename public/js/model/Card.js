var Card = function (value, suite) {
    this.value = value;
    this.suite = suite;
};

Card.prototype.getValue = function () {
    return this.value;
};

Card.prototype.getSuite = function () {
    return this.suite;
};

window.Card = Card;