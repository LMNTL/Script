function CPU(device, config) {
  this.device = device;
  device.components.push(this);

  _.assign(this, config);

  this.activeScript = undefined;
  this.progress = 0;
  this.queue = [];
  this.state = {
    enableGUI: true
  };
  this.events = new Events();
}

CPU.prototype.run = function(script) {
  this.activeScript = script;
  this.progress = 0;
};
CPU.prototype.stop = function() {
  this.run(undefined);
};

CPU.prototype.step = function() {
  if(!_.isUndefined(this.activeScript)) {
    this.progress ++;
    if(this.progress >= this.activeScript.runtime) {
      if(this.activeScript.complete) {
        this.activeScript.complete(this.device, this.activeScript);
      }
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
  } else {
    this.stop();
  }
};
