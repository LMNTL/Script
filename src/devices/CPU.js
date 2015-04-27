function CPU(device) {
  this.device = device;
  device.components.push(this);

  this.activeScript = undefined;
  this.progress = 0;
  this.queue = [];
  this.state = {
    enableGUI: true
  };
}

CPU.prototype.run = function(script) {
  this.activeScript = script;
  this.progress = 0;
};
CPU.prototype.stop = function() {
  this.run(undefined);
};

CPU.prototype.step = function(duration) {
  if(!_.isUndefined(this.activeScript)) {
    this.progress += duration;
    if(this.progress >= this.activeScript.runtime) {
      this.activeScript.complete(this.device);
      this.runQueue();
    }
  }
};

CPU.prototype.enqueue = function(script) {
  this.queue.push(script);
  if(_.isUndefined(this.activeScript)) {
    this.runQueue();
  }
};
CPU.prototype.runQueue = function() {
  if(this.queue.length > 0) {
    var script = this.queue.shift();
    this.run(script);
  }
};
