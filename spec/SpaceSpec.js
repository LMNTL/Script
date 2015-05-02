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

  it("should be active", function() {
    expect.space.activeGame = true;
  });
});
