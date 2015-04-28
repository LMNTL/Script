describe("CPU", function() {
  var space
  var device;
  var script;

  beforeEach(function() {
    space = new Space();
    device = new Device({});
    script = new Script();
    space.devices.push(device);
  });

  it("should run scripts", function() {
    device.cpu.run(script);
    expect(device.cpu.activeScript).toEqual(script);
  });

  it("should make progress on scripts", function() {
    script.runtime = 2;
    space.step();
    expect(device.cpu.progress).toEqual(0);
    device.cpu.run(script);
    space.step();
    expect(device.cpu.progress).toEqual(1);
    device.cpu.stop();
    space.step();
    expect(device.cpu.progress).toEqual(0);
  });

  it("should queue scripts", function() {
    script.runtime = 1;
    var script2 = new Script({
      runtime: 2
    });
    device.cpu.enqueue(script);
    expect(device.cpu.activeScript).toEqual(script);
    device.cpu.enqueue(script2);
    space.step();
    expect(device.cpu.activeScript).toEqual(script2);
  });

  it("should complete scripts", function() {
    var script = new Script({
      runtime: 1,
      complete: function(device) {
        device.cpu.state.enableGPU = false;
      }
    });
    device.cpu.run(script);
    space.step();
    expect(device.cpu.state.enableGPU).toEqual(false);
  });
});
