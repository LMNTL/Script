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
    var script = new Script({
      runtime: 1,
      complete: function(device) {
        device.gpu.display('Script done!');
      }
    });
    player.run(script);
    space.step();
    expect(device.gpu.displaying).toEqual('Script done!');
  });
  
  it("should be running an admin device", function () {
    expect(player.device.admin).toEqual(true);
  });
  
});
