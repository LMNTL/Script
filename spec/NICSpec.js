describe("NIC", function() {
  var space;
  var device;

  beforeEach(function() {
    space = new Space();
    device = [
      new Device({nic: {ip: "0.0"}}),
      new Device({nic: {ip: "1.0"}}),
      new Device({nic: {ip: "1.1"}}),
      new Device({nic: {ip: "2.0"}}),
      new Device({nic: {ip: "3.0"}})
    ];
    space.devices = device;
  });

  it("should connect to other devices", function() {

    device[0].nic.connectTo(device[1]);
    expect(
      device[0].nic.isConnected(device[1])
    ).toEqual(true);
    expect(
      device[1].nic.isConnected(device[0])
    ).toEqual(true);

    device[0].nic.disconnectFrom(device[1]);
    expect(
      device[0].nic.isConnected(device[1])
    ).toEqual(false);
    expect(
      device[1].nic.isConnected(device[0])
    ).toEqual(false);
  });


  it("should find routes", function() {

    // 0
    // | \
    // 2  1
    // |  |
    // 3  |
    //  \ |
    //    4
    device[0].nic.connectTo(device[1]);
    device[0].nic.connectTo(device[2]);
    device[2].nic.connectTo(device[3]);
    device[1].nic.connectTo(device[4]);
    device[3].nic.connectTo(device[4]);

    console.log(device[0].nic.routeTo(device[4].nic.ip));

    expect(
      device[0].nic.routeTo(device[4].nic.ip).next
    ).toEqual(device[1].nic);

    // device[1].nic.disconnectFrom(device[4]);
    // expect(
    //   device[0].nic.routeTo(device[4].nic.ip).next
    // ).toEqual(device[2]);
  });
});
