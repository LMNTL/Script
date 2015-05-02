describe("Script", function() {
  var game;
  var device;

  beforeEach(function() {
    game = new Game();
    device = new Device({});
    game.devices.push(device);
  });

  it("should run", function() {
    var script = Script.get("displayText");
    device.cpu.enqueue(script.instance(['success!']));
    expect(device.cpu.queue[0].variables).toEqual({'A': 'success!'});
    game.step();
    expect(device.gpu.displaying).toEqual('success!');
  });
});
