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
}

new Script({
	name: 'displayText',
	parameters: [{name: 'A', type: 'text'}],
	step: function(instance) {
		console.log(instance);
		instance.device.gpu.display(instance.variables['A']);
    instance.complete = true;
	}
});
