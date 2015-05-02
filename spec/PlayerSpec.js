describe("Player", function() {
  var space
  var device;
  var script;
  var player;

  beforeEach(function() {
    space = new Space();
    device = new Device({});
    script = new Script();
    space.devices.push(device);
    player = new Player({
      deck: [script],
      device: device
    });
  });

  it("should run scripts", function() {
    var script = Script.get("displayText");
    player.run(script.instance(['success!']));
    space.step();
    expect(device.gpu.displaying).toEqual('success!');
  });
  
  it("should be running an admin device", function () {
    expect(player.device.owner).toEqual(player);
  });
  
});
