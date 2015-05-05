function Disk(device, config) {
  this.device = device;
  device.components.push(this);

  this.root = {};

  _.assign(this, config);
}

Disk.prototype.get = function(path) {
  pathArr = path.split('/');
  pathArr.shift();
  var file = this.root;
  _.each(pathArr, function(pathElem) {
    file = file[pathElem];
  });
  return file;
};

Disk.prototype.innerStep = function() {};

Disk.prototype.outerStep = function() {};
