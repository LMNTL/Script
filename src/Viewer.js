
function Viewer (game) {
	this.game = game;
}

Viewer.prototype.render = function(canvas, ctx, aniStep) {
	var my_gradient=ctx.createLinearGradient(canvas.width,0,0,canvas.height);
	my_gradient.addColorStop(1,"#AAA");
	my_gradient.addColorStop(0,"#666");
	ctx.fillStyle=my_gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#000";
	_.each(this.game.devices, function(device) {
		_.each(device.nic.connectedTo, function(nic2) {
			var device2 = nic2.device;

			ctx.beginPath();
			ctx.moveTo(device.position.x, device.position.y);
			ctx.lineTo(device2.position.x, device2.position.y);
			ctx.stroke();
		});
	});

	_.each(this.game.devices, function(device) {
		_.each(device.nic.queue, function(packet, index) {
			var device2 = device.nic.routeTo(packet.destination).next.device;
			if (device2 && device2.position && device2 != device) {
				ctx.drawImage(
					img.packet,
					device.position.x * (1 - aniStep) + device2.position.x * aniStep - 17 + index * 5,
					device.position.y * (1 - aniStep) + device2.position.y * aniStep - 44 + index * 2  
				);
			}
		});
	});

	_.each(this.game.devices, function(device) {
		ctx.fillStyle = "#000";
		ctx.drawImage(img[device.type], device.position.x - 12, device.position.y - 42);
		ctx.fillText(device.nic.ip, device.position.x + 13, device.position.y + 13);

		ctx.fillStyle = "#0026FF";
		for(var i = 0; i < device.cpu.queue.length; i ++) {
			renderScriptQueue(i, device, ctx);
		}
	});

  _.each(this.game.players[0].deck, function(script, index) {
    renderFileFrame(ctx, 35 + index * 35, canvas.height - 70, 80, 120);
    ctx.fillStyle = "#000";
    ctx.fillText(script.name, 40 + index * 35, canvas.height - 70 + 13);
  });
}

function renderFileFrame(ctx, x1, y1, xs, ys) {
  var x2 = x1 + xs;
  var y2 = y1 + ys;
  var cornerSize = xs / 5;
  var x3 = x2 - cornerSize;
  var y3 = y1 + cornerSize;

  ctx.fillStyle = "#FFC";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x3, y1);
  ctx.lineTo(x2, y3);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x1, y2);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#AA8";
  ctx.beginPath();
  ctx.moveTo(x3, y1);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x2, y3);
  ctx.stroke();
}

function renderScriptQueue(i, device, ctx) {
	var x = i % 5;
  var y = parseInt(i / 5);
	ctx.fillRect(
		device.position.x + 20 + x * 5, 
		device.position.y - 15 - y * 12,
		3,
		10
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
	var game = new Game();
	var viewer = new Viewer(game);

  device = [
    new Device({nic: {ip: "0"}, position: {x:  60, y:  60}, type: 'terminal'}),
    new Device({nic: {ip: "1"}, position: {x:  60, y: 260}, type: 'playerTerminal',
      cpu: {speed: 2, memory: 10}}),
    new Device({nic: {ip: "2"}, position: {x:  60, y: 160}, type: 'router'}),
    new Device({nic: {ip: "3"}, position: {x: 160, y: 160}, type: 'router'}),
    new Device({nic: {ip: "4"}, position: {x: 260, y: 160}, type: 'rackServer', 
    	cpu: {speed: 2, memory: 10}}),
    new Device({nic: {ip: "5"}, position: {x: 160, y:  60}, type: 'terminal'}),
    new Device({nic: {ip: "6"}, position: {x: 160, y: 260}, type: 'terminal'})
  ];
  game.devices = device;

  player = [
    new Player({
      device: device[1],
      deck: [
        new Script({
          name: 'DoS Attack',
          complete: function(computer, script) {
            computer.nic.send(new Packet({
              destination: device[4].nic.ip,
              protocol: 'request',
              data: '/'
            }));
            computer.cpu.enqueue(script);
          }
        })
      ]
    })
  ]
  game.players = player;

  // 0
  // | \
  // 2  1
  // |  |
  // 3  |
  //  \ |
  //    4
  device[2].nic.connectTo(device[1]);
  device[0].nic.connectTo(device[2]);
  device[2].nic.connectTo(device[3]);	
  device[3].nic.connectTo(device[4]);
  device[5].nic.connectTo(device[3]);
  device[6].nic.connectTo(device[3]);

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
  device[6].cpu.enqueue(browserScript);
  device[1].cpu.enqueue(browserScript);

	var canvas = document.getElementById('canvas');

  canvas.addEventListener('click', function(event) {
    var x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;

    _.each(player[0].deck, function(script, index) {
      if (y > canvas.height - 70
          && x > 35 + index * 35 && x < 35 + 80 + index * 35) {
        player[0].run(script);
      }
    });
  }, false);

	if (canvas.getContext) {
	  var ctx = canvas.getContext('2d');

	  var aniStep = 0;
	  var simStep = 0;
	  setInterval(function() {
      aniStep += 0.1;
	  	if(aniStep >= 1) {
	  		game.step(1);
	  		simStep ++;
	  		//if(simStep % 2 == 0) {
	  			if(device[0].cpu.queue.length < 2) {
	  				device[0].cpu.enqueue(browserRequestScript);
	  			}
          if(device[5].cpu.queue.length < 2) {
            device[5].cpu.enqueue(browserRequestScript);
          }
          if(device[6].cpu.queue.length < 2) {
            device[6].cpu.enqueue(browserRequestScript);
          }
          // while(device[1].cpu.queue.length < 2) {
          //   device[1].cpu.enqueue(browserRequestScript);
          // }
		  	//}
	  		aniStep -= 1;
	  	}
	  	viewer.render(canvas, ctx, aniStep);
	  }, 100)
	}
});
