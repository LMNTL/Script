function Device(config) {
  this.components = [];

  this.cpu = new CPU(this, config.cpu);
  this.nic = new NIC(this, config.nic);
  this.gui = new GUI(this, config.gui);
}

Device.prototype.step = function(duration) {
  _.each(this.components, function (component) {
    component.step(duration);
  });
};
