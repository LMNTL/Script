function Computer() {
  this.components = [];

  this.cpu = new CPU(this);
  this.nic = new NIC(this);
}

Computer.prototype.step = function(duration) {
  _.each(this.components, function (component) {
    component.step(duration);
  });
};
