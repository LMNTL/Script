function Space() {
  this.devices = [];
  this.activeGame = true;
}

Space.prototype.step = function() {
  _.each(this.devices, function(device) {
    device.innerStep();
  });
  _.each(this.devices, function(device) {
    device.outerStep();
  });
}
