"use strict";function drawSimpleGrid(a,b){strokeWeight(1),stroke(210);for(var c=0;c<a;c+=simpleScaleFactor)line(c,-b,c,b);for(var d=-(b/2);d<b;d+=simpleScaleFactor)line(0,d,a,d);strokeWeight(1),stroke(190),textSize(12);for(var e=-155,f=4;e<=200;e+=40)text(f,-20,e),f--}function drawXY(){strokeWeight(1),stroke(100),line(0,0,width,0),line(0,-height,0,height)}function setup(){var a=createCanvas(800,400);a.parent("p5"),frameRate(30),scenes={counterOne:0,residuePoints:[],fillResidue:function(){scenes.residuePoints=[];for(var a=0,b=0;b<simpleWaveForm.length;b++){var c=a,d=simpleWaveForm[a],e=plotAdjusted.updateAndDrawImpulseResponse(c,d,"noDraw");a++;for(var f=0;f<e.length;f++,c++){var g=[c,e[f]];scenes.residuePoints.push(g)}}},plotResidue:function(a){for(var b=0;b<scenes.residuePoints.length;b++){var c=scenes.residuePoints[b][0],d=scenes.residuePoints[b][1];plotAdjusted.point(c,d,a)}},drawIntro:function(){fill(0),stroke(0),strokeWeight(1),textSize(32),text("input signal",90,-120),text("impulse response",410,-120),plotAdjusted.yLineWithPoints(simpleWaveForm,0,120,!0),plotAdjusted.yLineWithPoints(simpleImpulse,12,120,!0)},drawCyclingThroughImpulse:function(){frameCount%20===0&&(scenes.counterOne++,scenes.counterOne===simpleWaveForm.length&&(scenes.counterOne=0)),plotAdjusted.yLineWithPoints(simpleWaveForm,0,220,!0);var a=scenes.counterOne,b=simpleWaveForm[scenes.counterOne];plotAdjusted.drawImpulse(a,b),plotAdjusted.updateAndDrawImpulseResponse(a,b),fill(0),stroke(0),strokeWeight(1),textSize(20),text("Imagining each point as an impulse,\nwe can see how the Impulse Response \nreacts as it passes through the input.",390,-120)},drawCyclingThroughImpulseWithResidue:function(){var a=scenes.counterOne,b=simpleWaveForm[scenes.counterOne],c=plotAdjusted.updateAndDrawImpulseResponse(a,b);if(plotAdjusted.yLineWithPoints(simpleWaveForm,0,220,!1),plotAdjusted.drawImpulse(a,b),frameCount%20===0){scenes.counterOne++;for(var d=0;d<c.length;d++,a++){var e=[a,c[d]];scenes.residuePoints.push(e)}scenes.counterOne===simpleWaveForm.length&&(scenes.counterOne=0,scenes.residuePoints=[])}scenes.plotResidue(200),fill(0),stroke(0),strokeWeight(1),textSize(20),text('Often each x position is "affected"\nby the the Impulse Response \nmultiple times.',410,-120)},drawOnlyResidue:function(){scenes.fillResidue(),scenes.plotResidue(50),fill(0),stroke(0),strokeWeight(1),textSize(20),text('The consolidation of these\n"residue" points produces...',410,-120)},addConvolutionLine:function(){scenes.plotResidue(220);for(var a=[],b=0;b<simpleWaveForm.length+simpleImpulse.length-1;b++){for(var c=0,d=0;d<scenes.residuePoints.length;d++)scenes.residuePoints[d][0]===b&&(c+=scenes.residuePoints[d][1]);a.push(c)}plotAdjusted.yLineWithPoints(a,0,30,!0),fill(0),stroke(0),strokeWeight(1),textSize(20),text('... the convoluted product!\n(just kidding, it\'s "convolved")',410,-120)}},sceneSelector={0:scenes.drawIntro,1:scenes.drawCyclingThroughImpulse,2:scenes.drawCyclingThroughImpulseWithResidue,3:scenes.drawOnlyResidue,4:scenes.addConvolutionLine}}function draw(){background(255),translate(50,height/2),drawSimpleGrid(width,height),drawXY(),sceneSelector[ssValue]()}var waveForm,simpleScaleFactor=40,sceneSelector,scenes,ssValue=0,simpleWaveForm=[0,-1,-1.2,2,1.3,1.3,.7,0,-.7],simpleImpulse=[1,-.6,-.3,-.15];$(document).ready(function(){$("#backward").click(function(){ssValue>0&&ssValue--}),$("#forward").click(function(){ssValue<Object.keys(sceneSelector).length-1&&ssValue++})});var plotAdjusted={pointWeight:6,pointBWColor:0,lineWeight:2,lineColor:120,point:function(a){function b(b,c,d){return a.apply(this,arguments)}return b.toString=function(){return a.toString()},b}(function(a,b,c){var d=this.pointBWColor;c&&(d=c),strokeWeight(5),stroke(d),point(a*simpleScaleFactor,b*simpleScaleFactor*-1)}),yPoints:function(a,b,c){var d=0;b&&(d=b);var e=this.pointBWColor;c&&(e=c),strokeWeight(this.pointWeight),stroke(e);for(var f=0;f<a.length;f++)point((f+d)*simpleScaleFactor,a[f]*simpleScaleFactor*-1)},yLineWithPoints:function(a,b,c,d){var e=0;b&&(e=b);var f=this.lineColor;c&&(f=c),strokeWeight(this.lineWeight),stroke(f),noFill(),beginShape();for(var g=0;g<a.length;g++)vertex((g+e)*simpleScaleFactor,a[g]*simpleScaleFactor*-1);endShape(),d&&this.yPoints(a,b,c)},drawImpulse:function(a,b){strokeWeight(8),stroke(50),point(a*simpleScaleFactor,b*simpleScaleFactor*-1),strokeWeight(5),line(a*simpleScaleFactor,0,a*simpleScaleFactor,b*simpleScaleFactor*-1)},updateAndDrawImpulseResponse:function(a,b,c){var d=simpleImpulse.slice().map(function(a){return a*b});return c||this.yLineWithPoints(d,a,120,!0),d}};