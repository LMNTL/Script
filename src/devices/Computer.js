function Computer() {
  this.components = [];

  this.cpu = new CPU(this);

  this.connectedTo = [];
}

Computer.prototype.step = function(duration) {
  _.each(this.components, function (component) {
    component.step(duration);
  });
};

Computer.prototype.connectTo = function(other) {
  other.connectCore(this);
  this.connectCore(other);
};

Computer.prototype.connectCore = function(other) {
  if(!_.contains(this.connectedTo, other)) {
    this.connectedTo.push(other);
  }
};

Computer.prototype.disconnectFrom = function(other) {
  other.disconnectCore(this);
  this.disconnectCore(other);
};

Computer.prototype.disconnectCore = function(other) {
  _.remove(this.connectedTo, other);
};

Computer.prototype.isConnected = function(other) {
  return _.contains(this.connectedTo, other);
};
