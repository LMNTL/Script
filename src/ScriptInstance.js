function ScriptInstance(config) {
  this.complete = false;
  this.counter = 0;

  _.assign(this, config);
}

ScriptInstance.prototype.step = function() {
  this.script.step(this);
};

ScriptInstance.prototype.goSub = function() {
  var instruction = this.script.instructions[this.counter];
  var script = Script.get(instruction.script);
  var xthis = this;
  var parameters = _.map(instruction.parameters, function(parameter) {
    switch(parameter.type) {
      case 'variable':
        var res = xthis.variables[parameter.variable];
        if(parameter.dereference) {
          res = res[parameter.dereference];
        }
        return res;
      case 'literal':
        return parameter.literal;
    }
  });
  console.log(this.variables, instruction.parameters, parameters);
  this.sub = script.instance(parameters);
  this.sub.device = this.device;
};
