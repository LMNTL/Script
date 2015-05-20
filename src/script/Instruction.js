
function Instruction(config) {
  _.assign(this, config);
}

Instruction.prototype.step = function() {
  this.script.step(this);
};

Instruction.prototype.setDevice = function(device) {
  this.device = device;
};
