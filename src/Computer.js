function Computer() {
  this.running = null;
  this.progress = 0;
}

Computer.prototype.run = function(script) {
  this.running = script;
  this.progress = 0;
};
Computer.prototype.stop = function() {
  this.run(null);
};

Computer.prototype.step = function(duration) {
  if(this.running != null) {
    this.progress += duration;
  }
};
