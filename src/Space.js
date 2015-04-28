function Space() {
  this.devices = [];
}

Space.prototype.step = function() {
  _.each(this.devices, function(device) {
    device.innerStep();
  });
  _.each(this.devices, function(device) {
    device.outerStep();
  });
}
