function Script(config) {
  this.events = new Events();
  _.assign(this, config);
}

Script.prototype.complete = function(device) {
  this.events.emit("complete", device);
};
