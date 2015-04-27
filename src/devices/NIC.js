function NIC(device, config) {
  this.device = device;
  device.components.push(this);

  _.assign(this, config);

  this.connectedTo = [];
  this.routes = {};
  this.routes[this.ip] = {
    destination: this.ip,
    next: this,
    distance: 0
  };
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

    this.propagateRoute({
      destination: other.ip,
      next: other,
      distance: 1
    });
  }
};


NIC.prototype.disconnectFrom = function(other) {
  other.nic.disconnectCore(this);
  this.disconnectCore(other.nic);
};

NIC.prototype.disconnectCore = function(other) {
  _.remove(this.connectedTo, other);

  var xthis = this;
  _.each(this.routes, function(route) {
    if(route.next == other) {
      xthis.destroyRoute(route);
    }
  });
};

NIC.prototype.isConnected = function(other) {
  return _.contains(this.connectedTo, other.nic);
};

NIC.prototype.propagateRoute = function(route) {
  var prevRoute = this.routes[route.destination];
  if (!prevRoute || prevRoute.distance >= route.distance) {
    this.routes[route.destination] = route;

    var xthis = this;

    _.each(this.connectedTo, function(device) {
      device.propagateRoute({
        destination: route.destination,
        next: xthis,
        distance: route.distance + 1
      });
    });
  }
};

NIC.prototype.destroyRoute = function(route) {
  var prevRoute = this.routes[route.destination];
  if (prevRoute) {
    if (prevRoute.next == route.next) {
      delete this.routes[route.destination];

      var xthis = this;

      _.each(this.connectedTo, function(device) {
        device.destroyRoute({
          destination: route.destination,
          next: xthis
        });
      });
    } else {
      this.propagateRoute(prevRoute);
    }
  }
};

NIC.prototype.routeTo = function(ip) {
  return this.routes[ip];
};
