function CPU(device, config) {
  this.device = device;
  device.components.push(this);

  _.assign(this, config);

  this.activeScript = undefined;
  this.progress = 0;
  this.queue = [];
  this.events = new Events();
}


CPU.prototype.step = function() {
  if(!this.activeScript) {
    this.activeScript = this.queue[0];
    this.progress = 0;
  }
  if (this.activeScript) {
    this.progress ++;
    if(this.progress > this.activeScript.runtime) {
      if(this.activeScript.complete) {
        this.activeScript.complete(this.device, this.activeScript);
      }

      this.queue.shift();
      this.activeScript = undefined;
      this.progress = 0;
    }
  }
};

CPU.prototype.enqueue = function(script) {
  this.queue.push(script);
};
