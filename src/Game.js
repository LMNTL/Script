function Game() {
  this.devices = [];
  this.activeGame = true;
}

Game.prototype.step = function() {
  _.each(this.devices, function(device) {
    device.innerStep();
  });
  _.each(this.devices, function(device) {
    device.outerStep();
  });
}

Game.prototype.gameOver = function () {
  this.activeGame = false;
};