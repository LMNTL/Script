
function Viewer (space) {
	this.space = space;
}

Viewer.prototype.render = function(canvas, ctx, aniStep) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	_.each(this.space.devices, function(device) {
		_.each(device.nic.connectedTo, function(nic2) {
			var device2 = nic2.device;

			ctx.beginPath();
			ctx.moveTo(device.position.x, device.position.y);
			ctx.lineTo(device2.position.x, device2.position.y);
			ctx.stroke();
		});
	});

	_.each(this.space.devices, function(device) {
		ctx.drawImage(img[device.type], device.position.x - 12, device.position.y - 37);
		ctx.fillText(device.nic.ip, device.position.x + 13, device.position.y + 13);
	});

	_.each(this.space.devices, function(device) {
		_.each(device.nic.queue, function(packet) {
			var device2 = device.nic.routeTo(packet.destination).next.device;
			if (device2 && device2.position) {
				ctx.beginPath();
				ctx.arc(
					device.position.x * (1 - aniStep) + device2.position.x * aniStep,
					device.position.y * (1 - aniStep) + device2.position.y * aniStep,
					10, 0, Math.PI * 2
				);
				ctx.fill();
			}
		});
	});
}


var img = [];

_.each([
		'terminal',
		'router',
		'rackServer'
	], function(type) {
		var image = new Image();
		image.src = 'images/' + type + '.png';
		img[type] = image;
	});

$(document).ready(function() {
	var space = new Space();
	var viewer = new Viewer(space);

  device = [
    new Device.terminal   ({nic: {ip: "0"}, position: {x:  60, y:  60}}),
    new Device.router     ({nic: {ip: "1"}, position: {x: 160, y:  60}}),
    new Device.router     ({nic: {ip: "2"}, position: {x:  60, y: 160}}),
    new Device.router     ({nic: {ip: "3"}, position: {x:  60, y: 260}}),
    new Device.rackServer ({nic: {ip: "4"}, position: {x: 160, y: 160}}),
    new Device.rackServer ({nic: {ip: "5"}, position: {x: 260, y: 160}}),
    new Device.terminal   ({nic: {ip: "6"}, position: {x: 260, y: 260}})
  ];
  space.devices = device;

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
    complete: function(server, script) {
      server.cpu.events.on("packet", function(request) {
        if(request.protocol == 'request') {
          server.cpu.enqueue(new Script({
            complete: function() {
              server.nic.send(new Packet({
                destination: request.source,
                protocol: 'response',
                data: script.data.response[request.data]
              }));
            }
          }));
        }
      });
    },
    data: {
      response: {
        '/': 'Welcome to Globa Search!'
      }
    }
  });

  device[4].cpu.enqueue(serverScript);

  var browserScript = new Script({
    complete: function(computer) {
      computer.cpu.events.on("packet", function(response) {
        if(response.protocol == 'response') {
          computer.cpu.enqueue(new Script({
            complete: function() {
              computer.gpu.display(response.data);
            }
          }));
        }
      });
      computer.nic.send(new Packet({
        destination: device[4].nic.ip,
        protocol: 'request',
        data: '/'
      }));
    }
  });

  device[0].cpu.enqueue(browserScript);

	var canvas = document.getElementById('canvas');
	if (canvas.getContext) {
	  var ctx = canvas.getContext('2d');

	  var aniStep = 0;
	  setInterval(function() {
	  	aniStep += 0.1;
	  	if(aniStep >= 1) {
	  		space.step(1);
	  		aniStep = 0;
	  	}
	  	viewer.render(canvas, ctx, aniStep);
	  }, 100)
	}
});
