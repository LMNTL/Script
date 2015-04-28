
function Viewer (space) {
	this.space = space;
}

Viewer.prototype.render = function(canvas, ctx, aniStep) {
	var my_gradient=ctx.createLinearGradient(canvas.width,0,0,canvas.height);
	my_gradient.addColorStop(1,"#AAA");
	my_gradient.addColorStop(0,"#666");
	ctx.fillStyle=my_gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#000";
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
		_.each(device.nic.queue, function(packet, index) {
			var pos = aniStep; //(aniStep - index / device.nic.queue.length);
			if(pos > 0) {
				var device2 = device.nic.routeTo(packet.destination).next.device;
				if (device2 && device2.position && device2 != device) {
					ctx.drawImage(
						img.packet,
						device.position.x * (1 - pos) + device2.position.x * pos - 12,
						device.position.y * (1 - pos) + device2.position.y * pos - 42
					);
				}
			}
		});
	});

	_.each(this.space.devices, function(device) {
		ctx.fillStyle = "#000";
		ctx.drawImage(img[device.type], device.position.x - 12, device.position.y - 42);
		ctx.fillText(device.nic.ip, device.position.x + 13, device.position.y + 13);
		var steps = 0;
		ctx.fillStyle = "#0026FF";
		for(var i = 0; i < device.cpu.queue.length; i ++) {
			var script = device.cpu.queue[i];
			renderScriptQueue(script, steps, i == 0 ? aniStep : 0, device, ctx);
			steps += script.runtime;
		}
	});
}

function renderScriptQueue(script, steps, aniStep, device, ctx) {
	var start = steps;
	var end = script.runtime;
	if (end > 5) {
		end = 5;
	}
	ctx.fillRect(
		device.position.x + 13 + start * 5, 
		device.position.y + 15 + aniStep * 10,
		end * 5 - 2,
		10 - aniStep * 10
	);
}


var img = [];

_.each([
		'terminal',
		'router',
		'rackServer',
		'packet',
		'playerTerminal'
	], function(type) {
		var image = new Image();
		image.src = 'images/' + type + '.png';
		img[type] = image;
	});

$(document).ready(function() {
	var space = new Space();
	var viewer = new Viewer(space);

  device = [
    new Device({nic: {ip: "0"}, position: {x:  60, y:  60}, type: 'terminal'}),
    new Device({nic: {ip: "1"}, position: {x:  60, y: 260}, type: 'playerTerminal'}),
    new Device({nic: {ip: "2"}, position: {x:  60, y: 160}, type: 'router'}),
    new Device({nic: {ip: "3"}, position: {x: 160, y: 160}, type: 'router'}),
    new Device({nic: {ip: "4"}, position: {x: 260, y: 160}, type: 'rackServer', 
    	cpu: {capacity: 2}}),
    new Device({nic: {ip: "5"}, position: {x: 160, y:  60}, type: 'terminal'})
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
  device[3].nic.connectTo(device[4]);
  device[5].nic.connectTo(device[3]);

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
          }
         ));
      	}
    	});
    }
  });
  var browserRequestScript = new Script({
  	complete: function(computer) {
      computer.nic.send(new Packet({
        destination: device[4].nic.ip,
        protocol: 'request',
        data: '/'
      }));
    }
  });

  device[0].cpu.enqueue(browserScript);
  device[5].cpu.enqueue(browserScript);

	var canvas = document.getElementById('canvas');
	if (canvas.getContext) {
	  var ctx = canvas.getContext('2d');

	  var aniStep = 0;
	  var simStep = 0;
	  setInterval(function() {
	  	aniStep += 0.1;
	  	if(aniStep >= 1) {
	  		space.step(1);
	  		simStep ++;
	  		console.log(device[0].cpu.queue);
	  		if(simStep % 2 == 0) {
	  			if(device[0].cpu.queue.length == 0) {
	  				device[0].cpu.enqueue(browserRequestScript);
	  			}
		  		if(device[5].cpu.queue.length == 0) {
	  				device[5].cpu.enqueue(browserRequestScript);
		  		}
		  	}
	  		aniStep = 0;
	  	}
	  	viewer.render(canvas, ctx, aniStep);
	  }, 100)
	}
});
