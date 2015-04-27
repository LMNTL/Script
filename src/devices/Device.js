function Device() {
  this.components = [];

  this.cpu = new CPU(this);
  this.nic = new NIC(this);
}

Device.prototype.step = function(duration) {
  _.each(this.components, function (component) {
    component.step(duration);
  });
};
