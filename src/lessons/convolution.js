// global vars
var waveForm,
	simpleScaleFactor = 40,
	sceneSelector,
	scenes,
	ssValue = 0,
	simpleWaveForm = [0, -1, -1.2, 2, 1.3, 1.3, 0.7, 0, -0.7],
	simpleImpulse = [1, -0.6, -0.3, -0.15],
	backward,
	forward;

// this could be extracted as a helper function somehow
function drawBackwardForward(translateX, translateY) {
	// mouseXY isn't affected by translation, so that's why I have to compensate for it
	var centerXBackwards = width - 80 - translateX,
		centerXForwards = width - 30 - translateX,
		centerY = 30 - translateY;

	// adjust mouseXY by translation amount and find if mouse hovers in the button
	var distanceFromBackwards = dist(mouseX - translateX, mouseY - translateY, centerXBackwards, centerY);
	var distanceFromForwards = dist(mouseX - translateX, mouseY - translateY, centerXForwards, centerY);

	backward = (distanceFromBackwards < 22.5) ? true : false;
	forward = (distanceFromForwards < 22.5) ? true : false;

	// take care of fill amount based on whether mouse hovers over button and draw circle
	ellipseMode(CENTER);
	stroke(0);
	strokeWeight(2);
	if (backward === true) {
		fill(200);
	} else {
		fill(255);
	}
	ellipse(centerXBackwards, centerY, 45, 45);

	if (forward === true) {
		fill(200);
	} else {
		fill(255);
	}
	ellipse(centerXForwards, centerY, 45, 45);

	// take care of mouse appearance
	if ((backward === true) || (forward === true)) {
		cursor(HAND);
	} else {
		cursor(ARROW); 
	}

	stroke(0);
	strokeWeight(4);

	line(centerXBackwards - 10, centerY, centerXBackwards + 10, centerY);
	line(centerXForwards - 11, centerY, centerXForwards + 10, centerY);
	fill(0);
	textSize(18);
	text("<", centerXBackwards - 12, centerY + 4.5);
	text(">", centerXForwards + 1, centerY + 4.5);

}

// mouse click functionality
function mousePressed() {
	if ((backward === true) && (ssValue > 0)) ssValue--;
	if ((forward === true) && (ssValue < Object.keys(sceneSelector).length - 1)) ssValue++;
}

// this should be extracted and made 'full'
function drawSimpleGrid(width, height) {
	stroke(210);
	// vertical
	for (let x = 0; x < width; x += simpleScaleFactor) {
		if (x === 0) strokeWeight(4)
			else strokeWeight(1);
		line(x, -height, x, height);
	}
	// horizontal
	for (let y = -(height / 2), i = 0; y < height; y += simpleScaleFactor, i++) {
		if (i === 5) strokeWeight(4)
			else strokeWeight(1);
		line(0, y, width, y);
	}
	strokeWeight(1);
	stroke(190);
	textSize(12);
	for (let y = -155, i = 4; y <= 200; y += 40) {
		text(i, -20, y);
		i--;
	}
}

function drawXY() {
	strokeWeight(1);
	stroke(100);
	line(0, 0, width, 0);
	line(0, -height, 0, height);

}

var plotAdjusted = {
	pointWeight : 6,
	pointBWColor : 0,
	lineWeight : 2,
	lineColor : 120,

	point : function(x, y, pointBWColor_inc) {
		var pointcolor = this.pointBWColor; if (pointBWColor_inc) pointcolor = pointBWColor_inc;

		strokeWeight(5);
		stroke(pointcolor);
		point(x * simpleScaleFactor, y * simpleScaleFactor * -1);
	},

	yPoints : function(arr, offset_inc, pointBWColor_inc) {
		// set offset and point color if there is one...
		var offset = 0; if (offset_inc) offset = offset_inc;
		var pointcolor = this.pointBWColor; if (pointBWColor_inc) pointcolor = pointBWColor_inc;

		// draw
		strokeWeight(this.pointWeight);
		stroke(pointcolor);
		for (let x = 0; x < arr.length; x++) {
			point((x + offset) * simpleScaleFactor, arr[x] * simpleScaleFactor * -1);
		}
	},

	yLineWithPoints : function(arr, offset_inc, lineColor_inc, addPoints) {
		// set offset and color if there is one...
		var offset = 0; if (offset_inc) offset = offset_inc;
		var linecolor = this.lineColor; if (lineColor_inc) linecolor = lineColor_inc;
		// draw
		strokeWeight(this.lineWeight);
		stroke(linecolor);
		noFill();
		beginShape();
		for (let x = 0; x < arr.length; x++) {
			vertex((x + offset) * simpleScaleFactor, arr[x] * simpleScaleFactor * -1);
		}
		endShape();
		if (addPoints) {
			this.yPoints(arr, offset_inc, lineColor_inc); // plot points also...
		}
	},

	drawImpulse : function(x, y) {
		strokeWeight(8);
		stroke(50);
		point(x * simpleScaleFactor, y * simpleScaleFactor * -1);
		strokeWeight(5);
		line(x * simpleScaleFactor, 0, x * simpleScaleFactor, y * simpleScaleFactor * -1);
	},

	updateAndDrawImpulseResponse : function(x, y, noDraw) {
		// make impulse arr dependent on y height
		var impulseCopy = simpleImpulse.slice().map(function(num) {
			return num * y;
		});
		if (!noDraw) {
			this.yLineWithPoints(impulseCopy, x, 120, true);
		}
		return impulseCopy;
	}

}




////////////////////////////////////////////////////////////////////
function setup() {
	createCanvas(800, 400);
	frameRate(30);

	scenes = {
		counterOne : 0,
		residuePoints : [],

		fillResidue : function() {
			scenes.residuePoints = []; // reset
			var counter = 0;

			for (let i = 0; i < simpleWaveForm.length; i++) {
				var x = counter;
				var y = simpleWaveForm[counter];
				var arr = plotAdjusted.updateAndDrawImpulseResponse(x, y, 'noDraw');

				counter++;
				for (let j = 0; j < arr.length; j++, x++) {
					var pt = [x, arr[j]];
					scenes.residuePoints.push(pt);
				}
			}
		},

		plotResidue : function(bwColor) {
			for (let i = 0; i < scenes.residuePoints.length; i++) {
				var _x = scenes.residuePoints[i][0];
				var _y = scenes.residuePoints[i][1];
				plotAdjusted.point(_x, _y, bwColor);
			}
		},

		drawIntro : function() {
			fill(0);
			stroke(0);
			strokeWeight(1);
			textSize(32);
			text('input signal', 90, -120);
			text('impulse response', 410, -120);	
			plotAdjusted.yLineWithPoints(simpleWaveForm, 0, 120, true);
			plotAdjusted.yLineWithPoints(simpleImpulse, 12, 120, true);		
		},	

		drawCyclingThroughImpulse : function() {
			if (frameCount % 20 === 0) {
				scenes.counterOne++;
				if (scenes.counterOne === simpleWaveForm.length) scenes.counterOne = 0;
			}
			plotAdjusted.yLineWithPoints(simpleWaveForm, 0, 220, true); // draw original for reference
			var x = scenes.counterOne;
			var y = simpleWaveForm[scenes.counterOne];
			plotAdjusted.drawImpulse(x, y);
			plotAdjusted.updateAndDrawImpulseResponse(x, y);
			fill(0);
			stroke(0);
			strokeWeight(1);
			textSize(20);
			text('Imagining each point as an impulse,\nwe can see how the Impulse Response \nreacts as it passes through the input.', 390, -120)
		},

		drawCyclingThroughImpulseWithResidue : function() {
			var x = scenes.counterOne;
			var y = simpleWaveForm[scenes.counterOne];
			var arr = plotAdjusted.updateAndDrawImpulseResponse(x, y);
			plotAdjusted.yLineWithPoints(simpleWaveForm, 0, 220, false); // draw original for reference
			plotAdjusted.drawImpulse(x, y);

			if (frameCount % 20 === 0) {
				scenes.counterOne++;
				for (let i = 0; i < arr.length; i++, x++) {
					var pt = [x, arr[i]];
					scenes.residuePoints.push(pt);
				}
				if (scenes.counterOne === simpleWaveForm.length) {
					scenes.counterOne = 0;
					scenes.residuePoints = [];
				}
			}

			scenes.plotResidue(200);

			fill(0);
			stroke(0);
			strokeWeight(1);
			textSize(20);
			text('Often each x position is "affected"\nby the the Impulse Response \nmultiple times.', 410, -120)
		},

		drawOnlyResidue : function() {
			scenes.fillResidue();
			scenes.plotResidue(50);

			fill(0);
			stroke(0);
			strokeWeight(1);
			textSize(20);
			text('The consolidation of these\n"residue" points produces...', 410, -120);			
		},

		addConvolutionLine : function() {
			scenes.plotResidue(220);
			var conv = [];
			for (let i = 0; i < simpleWaveForm.length + simpleImpulse.length - 1; i++) {
				var sum = 0;
				for (let j = 0; j < scenes.residuePoints.length; j++) {
					if (scenes.residuePoints[j][0] === i) sum += scenes.residuePoints[j][1];
				}
				conv.push(sum);
			}
			
			plotAdjusted.yLineWithPoints(conv, 0, 30, true);

			fill(0);
			stroke(0);
			strokeWeight(1);
			textSize(20);
			text('... the convoluted product!\n(just kidding, it\'s "convolved")', 410, -120);
		}

	}

	sceneSelector = {
		0 : scenes.drawIntro,
		1 : scenes.drawCyclingThroughImpulse,
		2 : scenes.drawCyclingThroughImpulseWithResidue,
		3 : scenes.drawOnlyResidue,
		4 : scenes.addConvolutionLine
	};
}

function draw() {
	var translateX = 50,
		translateY = height / 2;
	background(255);

	// context
	translate(translateX, translateY);
	drawSimpleGrid(width, height);
	// drawXY();

	sceneSelector[ssValue]();
	drawBackwardForward(translateX, translateY); // always goes last in draw()

}


