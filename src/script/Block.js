
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
  if (this.complete) {
    return;
  }

  this.instructions[this.counter].step();
  
  if (this.instructions[this.counter].complete) {
    if (this.counter >= this.instructions.length - 1) {
      this.complete = true;
    } else {
      this.counter ++;
    }
  }
};

Block.prototype.setDevice = function(device) {
  this.device = device;
  _.each(this.instructions, function(instruction) {
    instruction.setDevice(device);
  });
};

Block.prototype.reset = function() {
  this.counter = 0;
  this.complete = false;
  _.each(this.instructions, function(instruction) {
    instruction.reset();
  });
};
