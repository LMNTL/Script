describe("Device", function () {
	var game;
	var device;
	var script;
	var player;

	beforeEach(function () {
		game = new Game();
		device = new Device({});
		script = new Script();
		game.devices.push(device);
		player = new Player({
			deck: [script],
			device: device
		});
	});
	
	it("should change owners when chown is run", function() {
		var player2 = new Player({});
    var script = Script.get("chown");
    device.cpu.enqueue(script.instance({'A': player2}));
    game.step();
    expect(device.owner).toEqual(player2);
	});
});