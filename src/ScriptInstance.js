function ScriptInstance(config) {
  this.complete = false;

  _.assign(this, config);
}

ScriptInstance.prototype.step = function() {
  this.script.step(this);
}
