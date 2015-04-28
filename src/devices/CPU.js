function CPU(device, config) {
  this.device = device;
  device.components.push(this);

  this.speed = 1;
  this.memory = 5;

  _.assign(this, config);

  this.activeScript = undefined;
  this.progress = 0;
  this.queue = [];
  this.events = new Events();
}


CPU.prototype.innerStep = function() {
  for(var i = 0; i < this.speed; i++) {
    this.stepCore();
  }
};
CPU.prototype.outerStep = function() {};

CPU.prototype.stepCore = function() {
  if(!this.activeScript) {
    this.activeScript = this.queue[0];
    this.progress = 0;
  }
  if (this.activeScript) {
    this.progress ++;
    if(this.progress >= this.activeScript.runtime) {
      if(this.activeScript.complete) {
        this.activeScript.complete(this.device, this.activeScript);
      }

      this.queue.shift();
      this.activeScript = this.queue[0];
      this.progress = 0;
    }
  }
};

CPU.prototype.enqueue = function(script) {
  if(this.queue.length < this.memory) {
    this.queue.push(script);
  }
};
