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

  // it("should travel the network", function() {
  //   // 0
  //   // | \
  //   // 2  1
  //   // |  |
  //   // 3  |
  //   //  \ |
  //   //    4
  //   device[0].nic.connectTo(device[1]);
  //   device[0].nic.connectTo(device[2]);
  //   device[2].nic.connectTo(device[3]);
  //   device[1].nic.connectTo(device[4]);
  //   device[3].nic.connectTo(device[4]);

  //   packet = new Packet({
  //     destination: device[4].nic.ip
  //   });
  //   device[0].nic.send(packet);

  //   game.step();
  //   game.step();
  //   game.step();

  //   expect(
  //     _.contains(device[4].nic.queue, packet)
  //   ).toEqual(true);
  // });

  // it("should trigger a response", function() {
  //   // 0
  //   // | \
  //   // 2  1
  //   // |  |
  //   // 3  |
  //   //  \ |
  //   //    4
  //   device[0].nic.connectTo(device[1]);
  //   device[0].nic.connectTo(device[2]);
  //   device[2].nic.connectTo(device[3]);
  //   device[1].nic.connectTo(device[4]);
  //   device[3].nic.connectTo(device[4]);

  //   // var serverScript = Script.composite({
  //   //   name: "webServer",
  //   //   steps: [
        
  //   //   ]
  //   // });


  //   //   complete: function(server, script) {
  //   //     server.cpu.events.on("packet", function(request) {
  //   //       if(request.protocol == 'request') {
  //   //         server.cpu.enqueue(new Script({
  //   //           complete: function() {
  //   //             server.nic.send(new Packet({
  //   //               destination: request.source,
  //   //               protocol: 'response',
  //   //               data: script.data.response[request.data]
  //   //             }));
  //   //           }
  //   //         }));
  //   //       }
  //   //     });
  //   //   },
  //   //   data: {
  //   //     response: {
  //   //       '/': 'Welcome to Globa Search!'
  //   //     }
  //   //   }
  //   // });

  //   device[4].cpu.enqueue(serverScript);

  //   var browserScript = new Script({
  //     complete: function(computer) {
  //       computer.cpu.events.on("packet", function(response) {
  //         if(response.protocol == 'response') {
  //           computer.cpu.enqueue(new Script({
  //             complete: function() {
  //               computer.gpu.display(response.data);
  //             }
  //           }));
  //         }
  //       });
  //       computer.nic.send(new Packet({
  //         destination: device[4].nic.ip,
  //         protocol: 'request',
  //         data: '/'
  //       }));
  //     }
  //   });

  //   device[0].cpu.enqueue(browserScript);

  //   for (var i = 0; i < 200; i++) {
  //     game.step();
  //   }

  //   expect(
  //     device[0].gpu.displaying
  //   ).toEqual('Welcome to Globa Search!');
  // });
});
