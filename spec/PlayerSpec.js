describe("Player", function() {
  var game;
  var device;
  var script;
  var player;

  beforeEach(function() {
    game = new Game();
    device = new Device({});
    script = new Script();
    game.devices.push(device);
    player = new Player({
      deck: [script],
      primaryDevice: device
    });
    device.owner = player;
  });

  it("should run scripts", function() {
    var script = Script.get("displayText");
    player.run(script.instance(['success!']));
    game.step();
    expect(device.gpu.displaying).toEqual('success!');
  });
  
  it("should be running an admin device", function () {
    expect(player.primaryDevice.owner).toEqual(player);
  });
  
});
