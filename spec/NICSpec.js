/// <reference path="../typings/jasmine/jasmine.d.ts"/>
describe("NIC", function() {
  var game;
  var device;

  beforeEach(function() {
    game = new Game();
    device = [
      new Device({nic: {ip: "0"}}),
      new Device({nic: {ip: "1"}}),
      new Device({nic: {ip: "2"}}),
      new Device({nic: {ip: "3"}}),
      new Device({nic: {ip: "4"}}),
      new Device({nic: {ip: "5"}}),
      new Device({nic: {ip: "6"}})
    ];
    game.devices = device;
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

    expect(
      device[0].nic.routeTo(device[4].nic.ip).next.ip
    ).toEqual(device[1].nic.ip);
  });

  it("should rebuild routes", function() {

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

    expect(
      device[0].nic.routeTo(device[4].nic.ip).next.ip
    ).toEqual(device[1].nic.ip);

    // 0
    // | \
    // 2  1
    // |  X
    // 3  X
    //  \ X
    //    4
    device[1].nic.disconnectFrom(device[4]);
    expect(
      device[0].nic.routeTo(device[4].nic.ip).next.ip
    ).toEqual(device[2].nic.ip);
  });

  it("should rebuild routes (2)", function() {

    // 0
    // | \
    // 2  1
    // |  | \
    // 3  |  5
    //  \ |  |
    //    4  |
    //     \ |
    //       6
    device[0].nic.connectTo(device[1]);
    device[0].nic.connectTo(device[2]);
    device[2].nic.connectTo(device[3]);
    device[1].nic.connectTo(device[4]);
    device[3].nic.connectTo(device[4]);
    device[1].nic.connectTo(device[5]);
    device[5].nic.connectTo(device[6]);
    device[4].nic.connectTo(device[6]);

    expect(
      device[0].nic.routeTo(device[6].nic.ip).next.ip
    ).toEqual(device[1].nic.ip);

    // 0
    // | \
    // 2  1
    // |  X \
    // 3  X  5
    //  \ X  |
    //    4  |
    //     \ |
    //       6
    device[1].nic.disconnectFrom(device[4]);
    expect(
      device[0].nic.routeTo(device[6].nic.ip).next.ip
    ).toEqual(device[1].nic.ip);

    // 0
    // | \
    // 2  1
    // |    \
    // 3     5
    //  \    X
    //    4  X
    //     \ X
    //       6
    device[5].nic.disconnectFrom(device[6]);
    expect(
      device[0].nic.routeTo(device[6].nic.ip).next.ip
    ).toEqual(device[2].nic.ip);

    // 0
    // | \
    // 2  1
    // X    \
    // 3     5
    //  \     
    //    4   
    //     \  
    //       6
    device[2].nic.disconnectFrom(device[3]);
    expect(
      device[0].nic.routeTo(device[6].nic.ip)
    ).toEqual(undefined);

    // 0
    // | \
    // 2  1
    //      \
    // 3     5
    //  \    *
    //    4  *
    //     \ *
    //       6
    device[5].nic.connectTo(device[6]);
    expect(
      device[0].nic.routeTo(device[6].nic.ip).next.ip
    ).toEqual(device[1].nic.ip);
  });
});
