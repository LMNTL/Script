
function Device(config) {
  this.components = [];

  _.assign(this, config);

  this.cpu = new CPU(this, config.cpu);
  this.nic = new NIC(this, config.nic);
  this.gpu = new GPU(this, config.gpu);
}

Device.prototype.step = function(duration) {
  _.each(this.components, function (component) {
    component.step(duration);
  });
};
