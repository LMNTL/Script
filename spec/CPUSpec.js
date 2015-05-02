describe("CPU", function() {
  var space
  var device;
  var script;

  beforeEach(function() {
    space = new Space();
    device = new Device({});
    script = Script.get("displayText")
    space.devices.push(device);
  });

  it("should queue scripts", function() {
    script.runtime = 2;
    var script2 = Script.get("displayText");
    var scriptInstance1 = script.instance(['meow'])
    device.cpu.enqueue(scriptInstance1);
    expect(device.cpu.queue[0]).toEqual(scriptInstance1);
    scriptInstance2 = script2.instance(['quack'])
    device.cpu.enqueue(scriptInstance2);
    space.step();
    expect(device.cpu.active).toEqual(scriptInstance2);
  });

  it("should complete scripts", function() {
    var script = Script.get('displayText');
    device.cpu.enqueue(script.instance(['Script done!']));
    space.step();
    expect(device.gpu.displaying).toEqual('Script done!');
  });

  it("should have a processing speed", function() {
    device.cpu.speed = 2;
    device.cpu.enqueue(script.instance(['meow']));
    device.cpu.enqueue(script.instance(['meow']));
    space.step();
    expect(device.cpu.queue.length).toEqual(0);
  });

  it("should have a memory capacity", function() {
    device.cpu.memory = 2;
    device.cpu.enqueue(script);
    device.cpu.enqueue(script);
    device.cpu.enqueue(script);
    expect(device.cpu.queue.length).toEqual(2);
  });
});
