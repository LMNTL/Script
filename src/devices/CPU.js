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
  }
  if (this.active) {
    this.active.step();
    if(this.active.complete) {
      this.queue.shift();
      this.active = this.queue[0];
    }
  }
};

CPU.prototype.enqueue = function(instruction) {
  if(this.queue.length < this.memory) {
    instruction.setDevice(this.device);
    this.queue.push(instruction);
  }
};
