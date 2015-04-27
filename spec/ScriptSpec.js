describe("Script", function() {
  var space
  var computer;

  beforeEach(function() {
    space = new Space();
    computer = new Computer();
    space.devices.push(computer);
    space.computer = computer;
  });

  it("should complete", function() {
    var script = new Script({
      runtime: 1
    });
    script.events.on("complete", function(computer) {
      computer.cpu.state.enableGUI = false;
    });
    computer.cpu.run(script);
    space.step(1);
    expect(computer.cpu.state.enableGUI).toEqual(false);
  });
});
