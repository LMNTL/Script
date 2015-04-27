function Script(config) {
  this.events = new Events();
  this.runtime = 1;
  _.assign(this, config);
}
