describe("Packet", function() {
  var space;
  var device;
  var packet;

  beforeEach(function() {
    space = new Space();
    device = [
      new Device({nic: {ip: "0"}}),
      new Device({nic: {ip: "1"}}),
      new Device({nic: {ip: "2"}}),
      new Device({nic: {ip: "3"}}),
      new Device({nic: {ip: "4"}}),
      new Device({nic: {ip: "5"}}),
      new Device({nic: {ip: "6"}})
    ];
    space.devices = device;
  });

  it("should travel the network", function() {
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

    packet = new Packet({
      destination: device[4].nic.ip
    });
    device[0].nic.enqueue(packet);

    space.step();
    space.step();
    space.step();

    expect(
      _.contains(device[4].nic.queue, packet)
    ).toEqual(true);
  });
});
