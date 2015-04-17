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
      computer.state.enableGUI = false;
    });
    computer.run(script);
    space.step(1);
    expect(computer.state.enableGUI).toEqual(false);
  });
});
