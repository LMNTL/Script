function Computer() {
  this.activeScript = undefined;
  this.progress = 0;
  this.queue = [];
  this.connectedTo = [];
  this.state = {
    enableGUI: true
  };
}

Computer.prototype.run = function(script) {
  this.activeScript = script;
  this.progress = 0;
};
Computer.prototype.stop = function() {
  this.run(undefined);
};

Computer.prototype.step = function(duration) {
  if(!_.isUndefined(this.activeScript)) {
    this.progress += duration;
    if(this.progress >= this.activeScript.runtime) {
      this.activeScript.complete(this);
      this.runQueue();
    }
  }
};

Computer.prototype.enqueue = function(script) {
  this.queue.push(script);
  if(_.isUndefined(this.activeScript)) {
    this.runQueue();
  }
};
Computer.prototype.runQueue = function() {
  if(this.queue.length > 0) {
    var script = this.queue.shift();
    this.run(script);
  }
};

Computer.prototype.connectTo = function(other) {

};
