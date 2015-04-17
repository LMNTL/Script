function Script(config) {
  this.events = new Events();
  _.assign(this, config);
}

Script.prototype.complete = function(computer) {
  this.events.emit("complete", computer);
};
