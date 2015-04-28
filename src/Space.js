function Space() {
  this.devices = [];
}

Space.prototype.step = function() {
  _.each(this.devices, function(device) {
    device.step()
  });
}
