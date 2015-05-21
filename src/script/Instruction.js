
function Instruction(config) {
  _.assign(this, config);
}

Instruction.prototype.instance = function(parameters) {
  return new InstructionPointer({
    instruction: this,
    context: new Context(parameters)
  });
};
