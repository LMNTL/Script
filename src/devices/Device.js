
function Device(config) {
  this.components = [];

  _.assign(this, config);

  this.cpu = new CPU(this, config.cpu);
  this.nic = new NIC(this, config.nic);
  this.gpu = new GPU(this, config.gpu);
  this.disk = new Disk(this, config.disk);
}

Device.prototype.innerStep = function(duration) {
  _.each(this.components, function (component) {
    component.innerStep(duration);
  });
};
Device.prototype.outerStep = function(duration) {
  _.each(this.components, function (component) {
    component.outerStep(duration);
  });
};

Device.prototype.changeOwner = function (newOwner) {
  if (this.owner && this.owner.primaryDevice === this && newOwner !== this.owner) {
    this.game.gameOver();
  }
  this.owner = newOwner;
};