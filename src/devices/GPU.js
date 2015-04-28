function GPU(device, config) {
  this.device = device;
  device.components.push(this);

  _.assign(this, config);

  this.displaying = '';
}

GPU.prototype.display = function(content) {
  this.displaying = content;
};

GPU.prototype.innerStep = function() {};

GPU.prototype.outerStep = function() {};
