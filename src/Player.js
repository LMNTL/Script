function Player(config) {
  _.assign(this, config);
}

Player.prototype.run = function run(script) {
  this.device.cpu.enqueue(script);
};