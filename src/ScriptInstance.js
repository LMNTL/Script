function ScriptInstance(config) {
  this.complete = false;

  _.assign(this, config);
}

ScriptInstance.prototype.step = function() {
  console.log(this);
  this.script.step(this);
}
