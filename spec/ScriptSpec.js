describe("Script", function() {
  var space;
  var device;

  beforeEach(function() {
    space = new Space();
    device = new Device({});
    space.devices.push(device);
  });

  it("should run", function() {
    var script = Script.get("displayText");
    device.cpu.enqueue(script.instance(['success!']));
    expect(device.cpu.queue[0].variables).toEqual({'A': 'success!'});
    for(var i = 0; i < 1000; i ++) {
      space.step();
    }
    expect(device.gpu.displaying).toEqual('success!');
  });
});
