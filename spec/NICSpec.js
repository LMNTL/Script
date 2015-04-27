describe("NIC", function() {
  var space
  var device;
  var script;

  beforeEach(function() {
    space = new Space();
    device = new Device();
    script = new Script();
    space.devices.push(device);
  });

  it("should connect to other devices", function() {
    var device2 = new Device();
    device.nic.connectTo(device2);
    expect(device.nic.isConnected(device2)).toEqual(true);
    expect(device2.nic.isConnected(device)).toEqual(true);
    device.nic.disconnectFrom(device2);
    expect(device.nic.isConnected(device2)).toEqual(false);
    expect(device2.nic.isConnected(device)).toEqual(false);
  });
});
