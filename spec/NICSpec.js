describe("NIC", function() {
  var space
  var computer;
  var script;

  beforeEach(function() {
    space = new Space();
    computer = new Computer();
    script = new Script();
    space.devices.push(computer);
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
