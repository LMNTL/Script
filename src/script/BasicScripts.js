
new Script({
  name: 'displayText',
  parameters: [{name: 'A', type: 'text'}],
  step: function(pointer) {
    pointer.device.gpu.display(pointer.context['A']);
    pointer.complete = true;
  }
});

new Script({
  name: 'chown',
  parameters: [{name: 'A', type: 'player'}],
  step: function(pointer) {
    pointer.device.changeOwner(pointer.context['A']);
    pointer.complete = true;
  }
});

new Script({
  name: 'displayFile',
  parameters: [{name: 'A', type: 'file'}],
  step: function(pointer) {
    pointer.device.gpu.display(pointer.context['A']);
    pointer.complete = true;
  }
});

new Script({
  name: 'file',
  parameters: [{name: 'A', type: 'text'}],
  returns: 'file',
  step: function(pointer) {
    pointer.result = pointer.device.disk.get(pointer.context['A']);
    pointer.complete = true;
  }
});

new Script({
  name: 'waitForPacket',
  parameters: [],
  returns: 'packet',
  step: function(pointer) {
    var pendingPackets = pointer.device.nic.pendingPackets;
    if(pendingPackets.length) {
      pointer.result = pendingPackets.shift();
      pointer.complete = true;
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
  step: function(pointer) {
    pointer.device.nic.send(new Packet({
      destination: pointer.context['A'],
      protocol: pointer.context['B'],
      data: pointer.context['C']
    }));
    pointer.complete = true;
  }
});

new Script({
  name: 'repeat',
  parameters: [],
  step: function(pointer) {
    pointer.stepBlock(0);
  }
});
