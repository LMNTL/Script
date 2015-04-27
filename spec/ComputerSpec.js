describe("Computer", function() {
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

  it("should connect to other computers", function() {
    var computer2 = new Computer();
    computer.nic.connectTo(computer2);
    expect(computer.nic.isConnected(computer2)).toEqual(true);
    expect(computer2.nic.isConnected(computer)).toEqual(true);
    computer.nic.disconnectFrom(computer2);
    expect(computer.nic.isConnected(computer2)).toEqual(false);
    expect(computer2.nic.isConnected(computer)).toEqual(false);
  });
});
