describe("Packet", function() {
  var game;
  var device;
  var packet;

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
    device[0].nic.send(packet);

    game.step();
    game.step();
    game.step();

    expect(
      _.contains(device[4].nic.queue, packet)
    ).toEqual(true);
  });

  it("should trigger a response", function() {
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

    var serverScript = new Script({
      name: 'httpd',
      instructions: [
        { script: "waitForPacket",
          assignTo: {name: "A", type: "packet"}
        },
        { script: "file",
          parameters: [{
            type: "variable", 
            variable: "A",
            dereference: "data"
          }],
          assignTo: {name: "B", type: "file"}
        },
        { script: "sendPacket",
          parameters: [
            { type: "variable", 
              variable: "A",
              dereference: "source"
            },
            { type: "literal", 
              literal: "response"
            }, 
            { type: "variable", 
              variable: "B"
            }
          ]
        }
      ]
    });

    device[4].cpu.enqueue(serverScript.instance([]));
    device[4].disk.root.index = 'Welcome to Globa Search!';

    var browserScript = new Script({
      name: 'mosaic',
      parameters: [{name: 'A', type: 'filePath'}],
      instructions: [
        { script: "sendPacket",
          parameters: [
            { type: "literal", 
              literal: '4'
            },
            { type: "literal", 
              literal: "request"
            }, 
            { type: "variable", 
              variable: "A"
            }
          ]
        },
        { script: "waitForPacket",
          assignTo: {name: "A", type: "packet"}
        },
        { script: "displayFile",
          parameters: [{
            type: "variable", 
            variable: "A",
            dereference: "data"
          }]
        }
      ]
    });

    device[0].cpu.enqueue(browserScript.instance(['/index']));

    for (var i = 0; i < 200; i++) {
      game.step();
    }

    expect(
      device[0].gpu.displaying
    ).toEqual('Welcome to Globa Search!');
  });
});
