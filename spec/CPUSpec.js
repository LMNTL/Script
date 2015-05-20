describe("CPU", function() {
  var game;
  var device;
  var script;

  beforeEach(function() {
    game = new Game();
    device = new Device({});
    script = Script.get("displayText");
    game.devices.push(device);
  });

  it("should queue scripts", function() {
    var scriptInstance = script.instance({'A': 'meow'});
    device.cpu.enqueue(scriptInstance);
    expect(device.cpu.queue[0]).toEqual(scriptInstance);
    expect(device.cpu.queue[0].device).toEqual(device);
    game.step();
    expect(device.cpu.queue.length).toEqual(0);
  });

  it("should complete scripts", function() {
    var script = Script.get('displayText');
    device.cpu.enqueue(script.instance({'A': 'Script done!'}));
    game.step();
    expect(device.gpu.displaying).toEqual('Script done!');
  });

  it("should have a processing speed", function() {
    device.cpu.speed = 2;
    device.cpu.enqueue(script.instance({'A': 'meow'}));
    device.cpu.enqueue(script.instance({'A': 'meow'}));
    game.step();
    expect(device.cpu.queue.length).toEqual(0);
  });

  it("should have a memory capacity", function() {
    device.cpu.memory = 2;
    device.cpu.enqueue(script.instance({'A': 'meow'}));
    device.cpu.enqueue(script.instance({'A': 'meow'}));
    device.cpu.enqueue(script.instance({'A': 'meow'}));
    expect(device.cpu.queue.length).toEqual(2);
  });
});
