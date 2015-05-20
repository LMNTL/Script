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
  
  it("should be running an admin device", function () {
    expect(player.primaryDevice.owner).toEqual(player);
  });
  
});
