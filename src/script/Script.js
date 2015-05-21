
function Script(config) {
  _.assign(this, config);

  if(this.name) {
  	Script.scripts[this.name] = this;
  }
}

Script.scripts = {};
Script.get = function(name) {
	return Script.scripts[name];
};

Script.prototype.step = function(pointer) {
};

Script.prototype.instance = function(parameters) {
  var instruction = this.instruction;
  if(_.isUndefined(instruction)) {
    instruction = new Instruction({
      script: this
    });
  }

  return new InstructionPointer({
    instruction: instruction,
    context: new Context(parameters)
  });
};
