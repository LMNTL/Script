function Computer() {
  this.activeScript = null;
  this.progress = 0;
  this.state = {
    enableGUI: true
  };
}

Computer.prototype.run = function(script) {
  this.activeScript = script;
  this.progress = 0;
};
Computer.prototype.stop = function() {
  this.run(null);
};

Computer.prototype.step = function(duration) {
  if(this.activeScript != null) {
    this.progress += duration;
    if(this.progress >= this.activeScript.runtime) {
      this.activeScript.complete(this);
      this.stop();
    }
  }
};
