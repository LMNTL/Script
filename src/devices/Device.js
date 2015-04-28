
function Device(config) {
  this.components = [];

  _.assign(this, config);

  this.cpu = new CPU(this, config.cpu);
  this.nic = new NIC(this, config.nic);
  this.gpu = new GPU(this, config.gpu);
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

Device.terminal = function(config) {
	config.type = "terminal";
	return new Device(config);
}

Device.router = function(config) {
	config.type = "router";
	return new Device(config);
}

Device.rackServer = function(config) {
	config.type = "rackServer";
	return new Device(config);
}
