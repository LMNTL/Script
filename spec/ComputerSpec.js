describe("Computer", function() {
  var space
  var computer;
  var script;

  beforeEach(function() {
    space = new Space();
    computer = new Computer();
    script = new Script();
    space.devices.push(computer);
    space.computer = computer;
  });

  it("should run scripts", function() {
    computer.run(script);
    expect(computer.activeScript).toEqual(script);
  });

  it("should make progress on scripts", function() {
    space.step(0.1);
    expect(computer.progress).toEqual(0);
    computer.run(script);
    space.step(0.1);
    expect(computer.progress).toEqual(0.1);
    computer.stop();
    space.step(0.1);
    expect(computer.progress).toEqual(0);
  });

  it("should queue scripts", function() {
    script.runtime = 1;
    var script2 = new Script({
      runtime: 2
    });
    computer.enqueue(script);
    expect(computer.activeScript).toEqual(script);
    computer.enqueue(script2);
    space.step(1);
    expect(computer.activeScript).toEqual(script2);
  });
});
