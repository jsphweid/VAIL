"use strict";function drawBackwardForward(a,b){var c=width-80-a,d=width-30-a,e=30-b,f=dist(mouseX-a,mouseY-b,c,e),g=dist(mouseX-a,mouseY-b,d,e);backward=f<22.5,forward=g<22.5,ellipseMode(CENTER),stroke(0),strokeWeight(2),backward===!0?fill(200):fill(255),ellipse(c,e,45,45),forward===!0?fill(200):fill(255),ellipse(d,e,45,45),backward===!0||forward===!0?cursor(HAND):cursor(ARROW),stroke(0),strokeWeight(4),line(c-10,e,c+10,e),line(d-11,e,d+10,e),fill(0),textSize(18),text("<",c-12,e+4.5),text(">",d+1,e+4.5)}function mousePressed(){backward===!0&&ssValue>0&&ssValue--,forward===!0&&ssValue<Object.keys(sceneSelector).length-1&&ssValue++}function drawSimpleGrid(a,b){stroke(210);for(var c=0;c<a;c+=simpleScaleFactor)0===c?strokeWeight(4):strokeWeight(1),line(c,-b,c,b);for(var d=-(b/2),e=0;d<b;d+=simpleScaleFactor,e++)5===e?strokeWeight(4):strokeWeight(1),line(0,d,a,d);strokeWeight(1),stroke(190),textSize(12);for(var f=-155,g=4;f<=200;f+=40)text(g,-20,f),g--}function drawXY(){strokeWeight(1),stroke(100),line(0,0,width,0),line(0,-height,0,height)}function setup(){createCanvas(800,400),frameRate(30),scenes={counterOne:0,residuePoints:[],fillResidue:function(){scenes.residuePoints=[];for(var a=0,b=0;b<simpleWaveForm.length;b++){var c=a,d=simpleWaveForm[a],e=plotAdjusted.updateAndDrawImpulseResponse(c,d,"noDraw");a++;for(var f=0;f<e.length;f++,c++){var g=[c,e[f]];scenes.residuePoints.push(g)}}},plotResidue:function(a){for(var b=0;b<scenes.residuePoints.length;b++){var c=scenes.residuePoints[b][0],d=scenes.residuePoints[b][1];plotAdjusted.point(c,d,a)}},drawIntro:function(){fill(0),stroke(0),strokeWeight(1),textSize(32),text("input signal",90,-120),text("impulse response",410,-120),plotAdjusted.yLineWithPoints(simpleWaveForm,0,120,!0),plotAdjusted.yLineWithPoints(simpleImpulse,12,120,!0)},drawCyclingThroughImpulse:function(){frameCount%20===0&&(scenes.counterOne++,scenes.counterOne===simpleWaveForm.length&&(scenes.counterOne=0)),plotAdjusted.yLineWithPoints(simpleWaveForm,0,220,!0);var a=scenes.counterOne,b=simpleWaveForm[scenes.counterOne];plotAdjusted.drawImpulse(a,b),plotAdjusted.updateAndDrawImpulseResponse(a,b),fill(0),stroke(0),strokeWeight(1),textSize(20),text("Imagining each point as an impulse,\nwe can see how the Impulse Response \nreacts as it passes through the input.",390,-120)},drawCyclingThroughImpulseWithResidue:function(){var a=scenes.counterOne,b=simpleWaveForm[scenes.counterOne],c=plotAdjusted.updateAndDrawImpulseResponse(a,b);if(plotAdjusted.yLineWithPoints(simpleWaveForm,0,220,!1),plotAdjusted.drawImpulse(a,b),frameCount%20===0){scenes.counterOne++;for(var d=0;d<c.length;d++,a++){var e=[a,c[d]];scenes.residuePoints.push(e)}scenes.counterOne===simpleWaveForm.length&&(scenes.counterOne=0,scenes.residuePoints=[])}scenes.plotResidue(200),fill(0),stroke(0),strokeWeight(1),textSize(20),text('Often each x position is "affected"\nby the the Impulse Response \nmultiple times.',410,-120)},drawOnlyResidue:function(){scenes.fillResidue(),scenes.plotResidue(50),fill(0),stroke(0),strokeWeight(1),textSize(20),text('The consolidation of these\n"residue" points produces...',410,-120)},addConvolutionLine:function(){scenes.plotResidue(220);for(var a=[],b=0;b<simpleWaveForm.length+simpleImpulse.length-1;b++){for(var c=0,d=0;d<scenes.residuePoints.length;d++)scenes.residuePoints[d][0]===b&&(c+=scenes.residuePoints[d][1]);a.push(c)}plotAdjusted.yLineWithPoints(a,0,30,!0),fill(0),stroke(0),strokeWeight(1),textSize(20),text('... the convoluted product!\n(just kidding, it\'s "convolved")',410,-120)}},sceneSelector={0:scenes.drawIntro,1:scenes.drawCyclingThroughImpulse,2:scenes.drawCyclingThroughImpulseWithResidue,3:scenes.drawOnlyResidue,4:scenes.addConvolutionLine}}function draw(){var a=50,b=height/2;background(255),translate(a,b),drawSimpleGrid(width,height),sceneSelector[ssValue](),drawBackwardForward(a,b)}var waveForm,simpleScaleFactor=40,sceneSelector,scenes,ssValue=0,simpleWaveForm=[0,-1,-1.2,2,1.3,1.3,.7,0,-.7],simpleImpulse=[1,-.6,-.3,-.15],backward,forward,plotAdjusted={pointWeight:6,pointBWColor:0,lineWeight:2,lineColor:120,point:function(a){function b(b,c,d){return a.apply(this,arguments)}return b.toString=function(){return a.toString()},b}(function(a,b,c){var d=this.pointBWColor;c&&(d=c),strokeWeight(5),stroke(d),point(a*simpleScaleFactor,b*simpleScaleFactor*-1)}),yPoints:function(a,b,c){var d=0;b&&(d=b);var e=this.pointBWColor;c&&(e=c),strokeWeight(this.pointWeight),stroke(e);for(var f=0;f<a.length;f++)point((f+d)*simpleScaleFactor,a[f]*simpleScaleFactor*-1)},yLineWithPoints:function(a,b,c,d){var e=0;b&&(e=b);var f=this.lineColor;c&&(f=c),strokeWeight(this.lineWeight),stroke(f),noFill(),beginShape();for(var g=0;g<a.length;g++)vertex((g+e)*simpleScaleFactor,a[g]*simpleScaleFactor*-1);endShape(),d&&this.yPoints(a,b,c)},drawImpulse:function(a,b){strokeWeight(8),stroke(50),point(a*simpleScaleFactor,b*simpleScaleFactor*-1),strokeWeight(5),line(a*simpleScaleFactor,0,a*simpleScaleFactor,b*simpleScaleFactor*-1)},updateAndDrawImpulseResponse:function(a,b,c){var d=simpleImpulse.slice().map(function(a){return a*b});return c||this.yLineWithPoints(d,a,120,!0),d}};