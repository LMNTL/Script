
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
  return new InstructionPointer({
    instruction: new Instruction({
      script: this
    }),
    context: new Context(parameters)
  });
};
