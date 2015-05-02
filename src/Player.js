function Player(config) {
  _.assign(this, config);

  if(this.primaryDevice) {
    this.primaryDevice.changeOwner(this);
  }
}

Player.prototype.run = function run(script) {
  this.primaryDevice.cpu.enqueue(script);
};
