var options = [];

    var startAngle = 0;
    var arc = 0;
    var spinAngleStart = 10;
    var spinTime = 0;
    var spinTimeTotal = 0;
    var spinTimeout = null;
    var ctx;

    function byte2Hex(n) {

      var nybHexString = "0123456789ABCDEF";
      return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);

    }

    function RGB2Color(r, g, b) {

      return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);

    }

    function getColor(item, maxitem) {

      var phase = 0;
      var center = 128;
      var width = 127;
      var frequency = Math.PI * 2 / maxitem;

      var red = Math.sin(frequency * item + 2 + phase) * width + center;
      var green = Math.sin(frequency * item + 0 + phase) * width + center;
      var blue = Math.sin(frequency * item + 4 + phase) * width + center;

      return RGB2Color(red, green, blue);

    }

    function drawRouletteWheel() {

      var canvas = document.getElementById("canvas");

      if (canvas.getContext) {

        var outsideRadius = 200;
        var textRadius = 170;
        var insideRadius = 150;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);

        ctx.strokeStyle = "green";
        ctx.lineWidth = 5;

        ctx.font = 'bold 12px Helvetica, Arial';

        for (var i = 0; i < options.length; i++) {

          var angle = startAngle + i * arc;

          ctx.fillStyle = getColor(i, options.length);

          ctx.beginPath();
          ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
          ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
          ctx.stroke();
          ctx.fill();

          ctx.save();
          ctx.shadowOffsetX = -1;
          ctx.shadowOffsetY = -1;
          ctx.shadowBlur = 0;
          ctx.shadowColor = "rgb(220,220,220)";
          ctx.fillStyle = "black";

          ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
            250 + Math.sin(angle + arc / 2) * textRadius);
          ctx.rotate(angle + arc / 2 + Math.PI / 2);

          var text = options[i];

          ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
          ctx.restore();

        }

        ctx.fillStyle = "black";
        ctx.beginPath();

        ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));

        ctx.fill();

      }

    }

    function startSpin() {

      var namesInput = document.getElementById('namesInput').value.trim();
      var newOptions = namesInput.split('\n').map(name => name.trim()).filter(name => name !== '');

      if (newOptions.length < 2) {

        alert('Por favor, insira pelo menos dois nomes para sortear.');

        return;

      }

      options = newOptions;
      arc = Math.PI / (options.length / 2);
      startAngle = 0;

      spinAngleStart = Math.random() * 10 + 10;
      spinTime = 0;
      spinTimeTotal = Math.random() * 3 + 4 * 1000;
      
      if (spinTimeout) {

        clearTimeout(spinTimeout);

      }
      
      drawRouletteWheel();
      rotateWheel();

    }

    function rotateWheel() {

      spinTime += 30 + Math.random() * 10; 

      if (spinTime >= spinTimeTotal) {

        stopRotateWheel();

        return;
      }

      var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);

      startAngle += (spinAngle * Math.PI / 180);

      drawRouletteWheel();

      spinTimeout = setTimeout(rotateWheel, 30);

    }

    function stopRotateWheel() {

      clearTimeout(spinTimeout);

      var degrees = startAngle * 180 / Math.PI + 90;
      var arcd = arc * 180 / Math.PI;
      var index = Math.floor((360 - degrees % 360) / arcd);

      ctx.save();
      ctx.font = 'bold 30px Helvetica, Arial';

      var text = options[index];

      ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
      ctx.restore();

    }

    function easeOut(t, b, c, d) {

      var ts = (t /= d) * t;
      var tc = ts * t;

      return b + c * (tc + -3 * ts + 3 * t);
      
    }

    drawRouletteWheel();