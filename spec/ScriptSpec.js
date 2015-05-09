describe("Script", function() {
  var game;
  var device;

  beforeEach(function() {
    game = new Game();
    device = new Device({});
    game.devices.push(device);
  });

  it("should run", function() {
    var script = Script.get("displayText");
    device.cpu.enqueue(script.instance(['success!']));
    expect(device.cpu.queue[0].variables).toEqual({'A': 'success!'});
    game.step();
    expect(device.gpu.displaying).toEqual('success!');
  });
  it("should run composite", function() {
    var script = new Script({
      name: 'displayFromFile',
      parameters: [{name: 'A', type: 'filePath'}],
      instructions: [
        { script: "file",
          parameters: [{
            type: "variable", 
            variable: "A"
          }],
          assignTo: {name: "B", type: "file"}
        },
        { script: "displayFile",
          parameters: [
            { type: "variable", 
              variable: "B"
            }
          ]
        }
      ]
    });
    device.disk.root.index = 'success!';
    device.cpu.enqueue(script.instance(['/index']));
    game.step();
    game.step();
    expect(device.gpu.displaying).toEqual('success!');
  });
  // it("should be repeatable", function() {
  //   var script = new Script({
  //     name: 'displayOnPacket',
  //     instructions: [
  //       { script: "repeat",
  //         blocks: [
  //           new Script({instructions: [
  //             { script: "waitForPacket",
  //               assignTo: {name: "A", type: "packet"}
  //             },
  //             { script: "displayFile",
  //               parameters: [{
  //                 type: "variable", 
  //                 variable: "A",
  //                 dereference: "data"
  //               }]
  //             }
  //           ]})
  //         ]
  //       }
  //     ]
  //   });
  //   device.cpu.enqueue(script.instance([]));
  //   device.nic.pendingPackets.push(new Packet({data: 'step1'}));
  //   game.step();
  //   expect(device.gpu.displaying).toEqual('step1');

  //   device.nic.pendingPackets.push(new Packet({data: 'step2'}));
  //   game.step();
  //   expect(device.gpu.displaying).toEqual('step2');
  // });
});
