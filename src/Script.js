var scripts = {};

function Script(config) {
  this.runtime = 1;
  _.assign(this, config);

  if(this.name) {
  	scripts[this.name] = this;
  }
}

Script.get = function(name) {
	return scripts[name];
};

Script.prototype.instance = function(parameters) {
  var variables = _.zipObject(_.map(_.zip(parameters, this.parameters), function(param){
    return [param[1].name, param[0]];
  }));
  return new ScriptInstance({
    script: this,
    variables: variables
  });
};

Script.prototype.step = function(instance) {
  if(!instance.sub) {
    instance.goSub();
    instance.sub.step();
  } else if(instance.sub.complete) {
    var assignTo = this.instructions[instance.counter].assignTo
    if(assignTo) {
      instance.variables[assignTo.name] = instance.sub.result;
    }
    instance.counter ++;

    if(instance.counter > this.instructions.length) {
      instance.complete = true;
      return;
    } else {
      instance.goSub();
      instance.sub.step();
    }
  } else {
    instance.sub.step();
  }
};

new Script({
  name: 'displayText',
  parameters: [{name: 'A', type: 'text'}],
  step: function(instance) {
    instance.device.gpu.display(instance.variables['A']);
    instance.complete = true;
  }
});

new Script({
  name: 'chown',
  parameters: [{name: 'A', type: 'player'}],
  step: function(instance) {
    instance.device.changeOwner(instance.variables['A']);
    instance.complete = true;
  }
});

new Script({
  name: 'displayFile',
  parameters: [{name: 'A', type: 'file'}],
  step: function(instance) {
    instance.device.gpu.display(instance.variables['A']);
    instance.complete = true;
  }
});

new Script({
  name: 'file',
  parameters: [{name: 'A', type: 'filePath'}],
  step: function(instance) {
    instance.result = instance.device.disk.get(instance.variables['A']);
    instance.complete = true;
  }
});
