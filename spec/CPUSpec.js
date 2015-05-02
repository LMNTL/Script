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

  it("should run scripts", function() {
    script.runtime = 2;
    space.step();
    expect(device.cpu.progress).toEqual(0);
    device.cpu.enqueue(script);
    space.step();
    expect(device.cpu.progress).toEqual(1);
    space.step();
    space.step();
    expect(device.cpu.progress).toEqual(0);
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
    var script = new Script({
      runtime: 1,
      complete: function(device) {
        device.gpu.display('Script done!');
      }
    });
    device.cpu.enqueue(script);
    space.step();
    expect(device.gpu.displaying).toEqual('Script done!');
  });

  it("should have a processing speed", function() {
    device.cpu.speed = 2;
    script.runtime = 2;
    var script2 = new Script({
      runtime: 1
    });
    device.cpu.enqueue(script);
    device.cpu.enqueue(script2);
    space.step();
    expect(device.cpu.activeScript).toEqual(script2);
  });

  it("should have a memory capacity", function() {
    device.cpu.memory = 2;
    device.cpu.enqueue(script);
    device.cpu.enqueue(script);
    device.cpu.enqueue(script);
    expect(device.cpu.queue.length).toEqual(2);
  });
});
