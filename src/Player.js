function Player(config) {
  _.assign(this, config);
}

Player.prototype.run = function run(script) {
  console.log(this.device)
  this.device.cpu.enqueue(script);
};