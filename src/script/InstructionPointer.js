
function InstructionPointer(config) {
  _.assign(this, config);
  if(_.isUndefined(this.blockContext)) {
    this.blockContext = new Context();
  }
}

InstructionPointer.prototype.step = function() {
  if(this.instruction.parameters) {
    var xthis = this;
    var contextMap = _.mapValues(this.instruction.parameters, function(parameter) {
      switch(parameter.type) {
        case 'variable':
          var res = xthis.blockContext[parameter.variable];
          if(parameter.dereference) {
            res = res[parameter.dereference];
          }
          return res;
        case 'literal':
          return parameter.literal;
      }
    });
    this.context = new Context(contextMap);
  }

  this.instruction.script.step(this);

  if(this.complete && this.result && this.instruction.assignTo) {
    this.blockContext[this.instruction.assignTo.name] = this.result;
  }
};

InstructionPointer.prototype.stepBlock = function(number) {
  if(!this.blockPointer) {
    this.blockPointer = new BlockPointer({
      block: this.instruction.blocks[number],
      blockContext: this.blockContext,
      device: this.device
    });
  }

  this.blockPointer.step();

  if(this.blockPointer.complete) {
    this.blockPointer = undefined;
  }
};

InstructionPointer.prototype.setDevice = function(device) {
  this.device = device;
};
