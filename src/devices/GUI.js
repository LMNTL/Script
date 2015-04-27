function GUI(device, config) {
  this.device = device;
  device.components.push(this);

  _.assign(this, config);

  this.displaying = '';
}

GUI.prototype.display = function(content) {
  this.displaying = content;
};

GUI.prototype.step = function() {};
