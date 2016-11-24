(function() { 
var toc;
var $activeLessonId; 



	$(document).ready(function() {
		// load json tableOfContents into toc and create Navbar dynamically from json file
		$.getJSON("js/tableOfContents.json", function(json) {
			toc = json;
			appendNavbar(toc);
		});
	});



	function appendNavbar(toc) {
		var toAppend = "";
		$.each(toc.everything, function(index, disciplines) {
			for (var discipline in disciplines) {
			    if (disciplines.hasOwnProperty(discipline)) {
			    	var disciplineId = discipline.replace(/\s+/g, '-').toLowerCase();
			    	// discipline open
			    	toAppend += '<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" class="collapsed" href="#' + disciplineId + '">' + discipline + '</a></h4></div><div id="' + disciplineId + '" class="panel-collapse collapse"><div class="panel-body"><table class="table">';
			    }
			    var lessonObject = disciplines[discipline];
			    for (var lesson in lessonObject) {
			    	if (lessonObject.hasOwnProperty(lesson)) {
			    		var lessonId = lesson.replace(/\s+/g, '-').toLowerCase();
			    		// lesson open and close
			    		var lessonSketchFile = lessonObject[lesson];
			    		toAppend += '<tr><td><a id="' + lessonId + '" class="lesson" data-lessonSketchFile="' + lessonSketchFile + '" href="#">' + lesson + '</a></td></tr>';
			    		// lessonSketchFile
			    	}
			    };
			    // discipline close
			    toAppend += '</table></div></div></div>';
			}
		});
		$('#accordion').append(toAppend);

		// click handler for clicking on lesson
		$('.lesson').click(function(event) {

			// 1. remove bold from last lesson, get new lesson, add bold
			if ($activeLessonId) $($activeLessonId).removeClass('activeLesson');
			$activeLessonId = $('#' + event.currentTarget.id);
			$($activeLessonId).addClass('activeLesson'); // make bold

			// load the lesson sketch
			var sketchFile = $(this).attr('data-lessonSketchFile');
			$('#sketch').empty();
			$('#sketch').append('<iframe class="myIframe" src="sketchFrame.html?' + sketchFile + '" name="targetframe" allowTransparency="true" scrolling="no" frameborder="0" ></iframe>')
			

			// stop anything else from happening
			event.stopPropagation();
		})
	}



})();