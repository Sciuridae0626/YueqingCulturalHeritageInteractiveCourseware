var $telephone;
$(document).ready(function() {
	$.ajax({
		type: "POST",
		url: "php/musicBG/read.php",
		dataType: "json",
		success: function(data) {
			var musicBG = document.getElementById("musicBG");
			musicBG.currentTime = data;
			console.log(data);
		},
		error: function() {
			alert("readError");
		}
	});
	$.ajax({
		type: "POST",
		url: "php/index/read.php",
		async: false,
		dataType: "json",
		success: function(data){
			if(data!=''){
				var jsondata = data;
				$telephone = jsondata.telephone;
			}
		},
		error: function() {
			alert("会话错误");
		}
	});
	// $.ajax({
		// type: "POST",
		// url: "php/index/progress.php",
		// dataType: "text",
		// data: {telephone: $telephone, id: "studyYDW", progress: 1, addScore: 10},  
		// error: function() {
			// alert("saveError");
		// }
	// });

	$("#learnBook").hover(function() {
		var hover = document.getElementById("hover");
		hover.play();
	});

	$("#testBook").hover(function() {
		var hover = document.getElementById("hover");
		hover.play();
	});

	$("#learnBook").click(function() {
		var musicBG = document.getElementById("musicBG");
		$.ajax({
			type: "POST",
			url: "php/musicBG/save.php",
			dataType: "text",
			data: {musicTime: musicBG.currentTime},  
			error: function() {
				alert("saveError");
			}
		});
		window.location.href = "knowledgeYDW.html";
	})

	$("#testBook").click(function() {
		var musicBG = document.getElementById("musicBG");
		$.ajax({
			type: "POST",
			url: "php/musicBG/save.php",
			dataType: "text",
			data: {musicTime: musicBG.currentTime},  
			error: function() {
				alert("saveError");
			}
		});
		window.location.href = "testYDW.html";
	})

	$("#back").click(function() {
		var musicBG = document.getElementById("musicBG");
		$.ajax({
			type: "POST",
			url: "php/musicBG/save.php",
			dataType: "text",
			data: {musicTime: musicBG.currentTime},  
			error: function() {
				alert("saveError");
			}
		});
		window.location.href = "adventureYDW.html";
	})
})