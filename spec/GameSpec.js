describe("Game", function() {
  var game;
  var device;
  var script;
  var player;

  beforeEach(function() {
    game = new Game();
    device = new Device({game: game});
    script = new Script();
    game.devices.push(device);
    player = new Player({
      deck: [script],
      primaryDevice: device
    });
  });

  it("should be active", function() {
    expect(game.activeGame).toEqual(true);
  });
  it("should end game when player loses control of their computer", function() {
    var player2 = new Player({});
    expect(game.activeGame).toEqual(true);
    player.primaryDevice.changeOwner(player2);
    expect(device.owner).toEqual(player2);
    expect(game.activeGame).toEqual(false);
  });
});
