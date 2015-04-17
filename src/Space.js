function Space() {
  this.devices = [];
}

Space.prototype.step = function(duration) {
  _.each(this.devices, function(device) {
    device.step(duration)
  });
};
