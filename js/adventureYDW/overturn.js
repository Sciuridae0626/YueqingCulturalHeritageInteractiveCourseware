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

	$("#help").hover(function() {
		$(".helpPicWrapper").css("visibility", "visible");
	},function(){$(".helpPicWrapper").css("visibility", "hidden");})

	var ary=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	ary.push(...ary);
	var num = ary.length;
	var time = ary.length;
	var DomAry = []
	var dobleAry_index = [];
	var dobleAry_Num = [];
	var grade = 0;

	(function() {
	    for(var j = 0; j < time; ++j){
			 var random = Math.floor(Math.random() * num);
			 for(var i = 0; i < ary.length; ++i) {
			 if(random == i) {
				DomAry.push(ary[i]);
				var newItem = "<div class='card'><div class='card_IndexNum'>";
				newItem += ary[i];
				newItem += "</div><img src='images/adventureYDW/"+ary[i]+".png' class='card_img'>";
				newItem += "<img src='images/adventureYDW/back1.png' class='card_backImg'></div>";
				$(".card_border").append(newItem);
				ary.splice(i, 1);
				num--;
			}
		  }
		}
	})()

	var el = document.getElementsByClassName("card_backImg");
	for(var i = 0; i < el.length; ++i) {
		var a = el[i];
		a.index = i;
		a.onclick = function() {
			$(this).removeClass('card_backImg_Unactive');
		    $(this).addClass('card_backImg_active');
		    dobleAry_Num.push($(this).siblings(".card_IndexNum").html())
		    dobleAry_index.push($(this).parent().index())
			if(dobleAry_index.length == 2) {
				if(dobleAry_Num[0] == dobleAry_Num[1]&&dobleAry_index[0]!=dobleAry_index[1]) {
					var allGrade = ++grade;
					$(".grade_box").html(allGrade);
					var correct = document.getElementById("correct");
					correct.play();
					var changeId = "#" + dobleAry_Num[0];
					var newItem = "<img class='picItem' src='images/adventureYDW/" + dobleAry_Num[0] +"-colorful.png' alt=''>";
					$(changeId).html(newItem);
					// alert(dobleAry_Num[0]+"-colorful");
					if(allGrade == 12) {
						var finish = document.getElementById("finish");
						finish.play();
						setTimeout(function() {
							$(".tipsWrapper").css("visibility", "visible");
							$.ajax({
								type: "POST",
								url: "php/index/progress.php",
								dataType: "text",
								data: {telephone: $telephone, id: "studyYDW", progress: 1, addScore: 10},  
								error: function() {
									alert("saveError");
								}
							});
							$(".tipsTittle").lbyl({
								content: "恭喜你通关成功！触碰问号可了解十二化龙",
								speed: 150,
								type: 'fade'
							});
						}, 500);
						setTimeout(function() {
							$(".tipsWrapper").css("visibility", "hidden");
						}, 4500);
					}
					dobleAry_Num.length = 0;
					dobleAry_index.length = 0;
				}
				else {
					$(".page_mengceng").show();
					var wrong = document.getElementById("wrong");
					wrong.play();
					setTimeout(function() {
						$(".page_mengceng").hide();
						$(".card").eq(dobleAry_index[0]).children(".card_backImg").addClass('card_backImg_Unactive');
						$(".card").eq(dobleAry_index[1]).children(".card_backImg").addClass('card_backImg_Unactive');
						dobleAry_Num.length = 0;
						dobleAry_index.length = 0;
					}, 500)
				}
		    }
		}
	}
})