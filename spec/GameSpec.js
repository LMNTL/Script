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
      device: device
    });
  });

  it("should be active", function() {
    expect.game.activeGame = true;
  });
});
