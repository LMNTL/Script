
function Block(instructions) {
  this.instructions = instructions;
  this.counter = 0;
}

Block.prototype.instance = function(parameters) {
  return new BlockPointer({
    block: this,
    context: new Context(parameters)
  });
};
