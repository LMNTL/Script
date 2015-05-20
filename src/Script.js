var scripts = {};

function Script(config) {
  _.assign(this, config);

  if(this.name) {
  	scripts[this.name] = this;
  }
}

Script.get = function(name) {
	return scripts[name];
};

Script.prototype.step = function(instance) {
};

new Script({
  name: 'displayText',
  parameters: [{name: 'A', type: 'text'}],
  step: function(instance) {
    instance.device.gpu.display(instance.variables['A']);
    instance.complete = true;
  }
});

new Script({
  name: 'chown',
  parameters: [{name: 'A', type: 'player'}],
  step: function(instance) {
    instance.device.changeOwner(instance.variables['A']);
    instance.complete = true;
  }
});

new Script({
  name: 'displayFile',
  parameters: [{name: 'A', type: 'file'}],
  step: function(instance) {
    instance.device.gpu.display(instance.variables['A']);
    instance.complete = true;
  }
});

new Script({
  name: 'file',
  parameters: [{name: 'A', type: 'filePath'}],
  step: function(instance) {
    instance.result = instance.device.disk.get(instance.variables['A']);
    instance.complete = true;
  }
});

new Script({
  name: 'waitForPacket',
  parameters: [],
  step: function(instance) {
    var pendingPackets = instance.device.nic.pendingPackets;
    if(pendingPackets.length) {
      instance.result = pendingPackets.shift();
      instance.complete = true;
    }
  }
});

new Script({
  name: 'sendPacket',
  parameters: [
    {name: 'A', type: 'ip'},
    {name: 'B', type: 'protocol'},
    {name: 'C', type: 'data'}
  ],
  step: function(instance) {
    instance.device.nic.send(new Packet({
      destination: instance.variables['A'],
      protocol: instance.variables['B'],
      data: instance.variables['C']
    }));
    instance.complete = true;
  }
});

new Script({
  name: 'repeat',
  parameters: [],
  step: function(instance) {
    instance.instruction.blocks[0].step(instance);
  }
});
