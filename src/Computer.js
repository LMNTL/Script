function Computer() {
  this.running = null;
}

Computer.prototype.run = function(script) {
  this.running = script;
};
