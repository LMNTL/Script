
function BlockPointer(config) {
  _.assign(this, config);
  this.counter = 0;
  if(_.isUndefined(this.blockContext)) {
    this.blockContext = new Context();
  }
}

BlockPointer.prototype.step = function() {
  if (this.complete) {
    return;
  }

  if(!this.instructionPointer) {
    this.instructionPointer = new InstructionPointer({
      instruction: this.block.instructions[this.counter],
      device: this.device,
      blockContext: this.blockContext
    });
  }

  this.instructionPointer.step();
  
  if (this.instructionPointer.complete) {
    if (this.counter >= this.block.instructions.length - 1) {
      this.complete = true;
    } else {
      this.counter ++;
      this.instructionPointer = undefined;
    }
  }
};

BlockPointer.prototype.setDevice = function(device) {
  this.device = device;
};
