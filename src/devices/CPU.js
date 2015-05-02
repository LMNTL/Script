function CPU(device, config) {
  this.device = device;
  device.components.push(this);

  this.speed = 1;
  this.memory = 5;

  _.assign(this, config);

  this.active = undefined;
  this.queue = [];
}


CPU.prototype.innerStep = function() {
  for(var i = 0; i < this.speed; i++) {
    this.stepCore();
  }
};
CPU.prototype.outerStep = function() {};

CPU.prototype.stepCore = function() {
  if(!this.active) {
    this.active = this.queue[0];
    this.progress = 0;
  }
  if (this.active) {
    this.active.step();
    if(this.active.complete) {
      this.queue.shift();
      this.active = this.queue[0];
    }
    // this.progress ++;
    // if(this.progress >= this.active.runtime) {
    //   if(this.active.complete) {
    //     this.active.complete(this.device, this.active);
    //   }

    //   this.queue.shift();
    //   this.active = this.queue[0];
    //   this.progress = 0;
    // }
  }
};

CPU.prototype.enqueue = function(scriptInstance) {
  if(this.queue.length < this.memory) {
    scriptInstance.device = this.device;
    this.queue.push(scriptInstance);
  }
};
