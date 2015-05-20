
function Script(config) {
  _.assign(this, config);

  if(this.name) {
  	Script.scripts[this.name] = this;
  }
}

Script.scripts = {};
Script.get = function(name) {
	return Script.scripts[name];
};

Script.prototype.step = function(instruction) {
};

Script.prototype.instance = function(parameters) {
  return new Instruction({
    script: this,
    context: new Context({'A': 'success!'})
  });
};

new Script({
  name: 'displayText',
  parameters: [{name: 'A', type: 'text'}],
  step: function(instruction) {
    console.log(instruction.context);
    instruction.device.gpu.display(instruction.context['A']);
    instruction.complete = true;
  }
});

new Script({
  name: 'chown',
  parameters: [{name: 'A', type: 'player'}],
  step: function(instruction) {
    instruction.device.changeOwner(instruction.context['A']);
    instruction.complete = true;
  }
});

new Script({
  name: 'displayFile',
  parameters: [{name: 'A', type: 'file'}],
  step: function(instruction) {
    instruction.device.gpu.display(instruction.context['A']);
    instruction.complete = true;
  }
});

new Script({
  name: 'file',
  parameters: [{name: 'A', type: 'filePath'}],
  step: function(instruction) {
    instruction.result = instruction.device.disk.get(instruction.context['A']);
    instruction.complete = true;
  }
});

new Script({
  name: 'waitForPacket',
  parameters: [],
  step: function(instruction) {
    var pendingPackets = instruction.device.nic.pendingPackets;
    if(pendingPackets.length) {
      instruction.result = pendingPackets.shift();
      instruction.complete = true;
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
  step: function(instruction) {
    instruction.device.nic.send(new Packet({
      destination: instruction.variables['A'],
      protocol: instruction.variables['B'],
      data: instruction.variables['C']
    }));
    instruction.complete = true;
  }
});

new Script({
  name: 'repeat',
  parameters: [],
  step: function(instruction) {
    instruction.instruction.blocks[0].step(instruction);
  }
});
