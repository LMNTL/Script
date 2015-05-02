function Player(config) {
  _.assign(this, config);

  if(this.device) {
    this.device.admin = true;
  }
}

Player.prototype.run = function run(script) {
  this.device.cpu.enqueue(script);
};