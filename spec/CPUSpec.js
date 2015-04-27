describe("CPU", function() {
  var space
  var computer;
  var script;

  beforeEach(function() {
    space = new Space();
    computer = new Computer();
    script = new Script();
    space.devices.push(computer);
  });

  it("should run scripts", function() {
    computer.cpu.run(script);
    expect(computer.cpu.activeScript).toEqual(script);
  });

  it("should make progress on scripts", function() {
    space.step(0.1);
    expect(computer.cpu.progress).toEqual(0);
    computer.cpu.run(script);
    space.step(0.1);
    expect(computer.cpu.progress).toEqual(0.1);
    computer.cpu.stop();
    space.step(0.1);
    expect(computer.cpu.progress).toEqual(0);
  });

  it("should queue scripts", function() {
    script.runtime = 1;
    var script2 = new Script({
      runtime: 2
    });
    computer.cpu.enqueue(script);
    expect(computer.cpu.activeScript).toEqual(script);
    computer.cpu.enqueue(script2);
    space.step(1);
    expect(computer.cpu.activeScript).toEqual(script2);
  });

  it("should complete scripts", function() {
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
