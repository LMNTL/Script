function NIC(computer) {
  this.computer = computer;
  computer.components.push(this);

  this.connectedTo = [];
}

NIC.prototype.step = function(duration) {
};

NIC.prototype.connectTo = function(other) {
  other.nic.connectCore(this);
  this.connectCore(other.nic);
};

NIC.prototype.connectCore = function(other) {
  if(!_.contains(this.connectedTo, other)) {
    this.connectedTo.push(other);
  }
};

NIC.prototype.disconnectFrom = function(other) {
  other.nic.disconnectCore(this);
  this.disconnectCore(other.nic);
};

NIC.prototype.disconnectCore = function(other) {
  _.remove(this.connectedTo, other);
};

NIC.prototype.isConnected = function(other) {
  return _.contains(this.connectedTo, other.nic);
};
