describe("NIC", function() {
  var space;
  var device;

  beforeEach(function() {
    space = new Space();
    device = [
      new Device(),
      new Device(),
      new Device()
    ];
    space.devices = device;
  });

  it("should connect to other devices", function() {
    device[0].nic.connectTo(device[1]);
    expect(device[0].nic.isConnected(device[1])).toEqual(true);
    expect(device[1].nic.isConnected(device[0])).toEqual(true);
    device[0].nic.disconnectFrom(device[1]);
    expect(device[0].nic.isConnected(device[1])).toEqual(false);
    expect(device[1].nic.isConnected(device[0])).toEqual(false);
  });
});
