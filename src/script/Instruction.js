
function Instruction(config) {
  _.assign(this, config);
}

Instruction.prototype.step = function() {
  if(this.parameters) {
    var xthis = this;
    var contextMap = _.mapValues(this.parameters, function(parameter) {
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

  this.script.step(this);

  if(this.complete && this.result && this.assignTo) {
    this.blockContext[this.assignTo.name] = this.result;
  }
};

Instruction.prototype.setDevice = function(device) {
  this.device = device;
  if(this.blocks) {
    _.each(this.blocks, function(block) {
      block.setDevice(device);
    });
  }
};

Instruction.prototype.reset = function() {
  this.complete = false;
  if(this.blocks) {
    _.each(this.blocks, function(block) {
      block.reset();
    });
  }
};
