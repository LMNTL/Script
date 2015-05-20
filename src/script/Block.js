
function Block(instructions) {
  this.context = new Context({});
  this.instructions = instructions;
  var xthis = this;
  _.each(this.instructions, function(instruction) {
    instruction.blockContext = xthis.context;
  });
  this.counter = 0;
}

Block.prototype.step = function() {
  if (this.counter > this.instructions.length) {
    this.complete = true;
    return;
  }

  if (this.instructions[this.counter].complete) {
    this.counter ++;
    if (this.counter > this.instructions.length) {
      this.complete = true;
      return;
    } 
  }

  this.instructions[this.counter].step();
};

Block.prototype.setDevice = function(device) {
  this.device = device;
  _.each(this.instructions, function(instruction) {
    instruction.setDevice(device);
  });
};
