const GW_MAXFILESIZE = 2097152;
var formData = new FormData();
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
			console.log(data);
			if(data!=''){
				var jsondata = data;
				$telephone = jsondata.telephone;
				$("#nickname").text(jsondata.username);
				$.ajax({
					type: "POST",
					url: "php/personalCenter/personalCenter.php",
					// dataType: "json",
					data: {telephone: $telephone},
					success: function(data){
						if(data!=''){
							var jsondata = $.parseJSON(data);
							$(".headWrapper").css('background-image', 'url(./images/header/'+jsondata.header+')');
							$(".headWrapper").css('background-image', 'url(./images/header/'+jsondata.header+')');
							$("#integral").text('积分:' + jsondata.score);
							if(jsondata.score > 250) $("#rank").text('名扬万里');
							else if(jsondata.score > 180) $("#rank").text('小有成就');
							else if(jsondata.score > 110) $("#rank").text('崭露头角');
							else if(jsondata.score > 40) $("#rank").text('初出茅庐');
							else  $("#rank").text('行业新人');
							temp = parseInt(Number(jsondata.studyYDW) * 10000 / 3) / 100;
							if (temp > 100) temp = 100;
							$("#adventurePercent").text(temp + "%");
							$("#adventure").attr('data-done' , temp + "%");
							$("#adventure").css('width' , temp + "%");
							temp = parseInt(Number(jsondata.studyXWKZ) * 10000 / 3) / 100;
							if (temp > 100) temp = 100;
							$("#familiarPercent").text(temp + "%");
							$("#familiar").attr('data-done' , temp + "%");
							$("#familiar").css('width' , temp + "%");
							temp = parseInt(Number(jsondata.studyHYMD) * 10000 / 6) / 100;
							if (temp > 100) temp = 100;
							$("#manufacturePercent").text(temp + "%");
							$("#manufacture").attr('data-done' , temp + "%");
							$("#manufacture").css('width' , temp + "%");
							temp = parseInt((Number(jsondata.testYDW1) + Number(jsondata.testYDW2) + Number(jsondata.testYDW3)) * 100 / 3) / 100;
							if (temp > 100) temp = 100;
							$("#HYMDPercent").text(temp + "%");
							$("#HYMD").attr('data-done' , temp + "%");
							$("#HYMD").css('width' , temp + "%");
							temp = parseInt(Number(jsondata.testXWKZ) * 10000 / 6) / 100;
							if (temp > 100) temp = 100;
							$("#XWKZPercent").text(temp + "%");
							$("#XWKZ").attr('data-done' , temp + "%");
							$("#XWKZ").css('width' , temp + "%");
							temp = parseInt(Number(jsondata.testHYMD) * 10000 / 4) / 100;
							if (temp > 100) temp = 100;
							$("#YDWPercent").text(temp + "%");
							$("#YDW").attr('data-done' , temp + "%");
							$("#YDW").css('width' , temp + "%");
						}
					},
					error: function() {
						alert("数据库错误");
					}
				});
			}
		},
		error: function() {
			alert("会话错误");
		}
	});
	$("#changeNickname")
	var is_Edge = navigator.userAgent.indexOf("Edg");
	if(is_Edge > -1) {
		$(".bookWrapper").css({
			"width": "1260px",
			"height": "830px"
		});
	}
	else {
		$(".bookWrapper").css({
			"width": "80%",
			"height": "93%"
		});
	}

	$("#range").bind("input", function(e){
        $("#range").attr('value', this.value);
        $("#range").css( 'background', 'linear-gradient(to right, #278F7D, #D1D3AF ' + this.value + '%, #DFDACA)' );
        var vol = $("#range").attr('value') / 100;
		$("#musicBG")[0].volume = vol;
        console.log(vol);
        if(vol == 0) {
        	$("#on").removeAttr("checked");
        	$("#off").attr("checked", "checked");
        	console.log($("#off").attr("checked"));
        }
        else {
        	$("#on").attr("checked", "checked");
        	if($("#off").attr("checked") == "undefined") {
        		$("#off").removeAttr("checked");
        	}
        	console.log($("#off").attr("checked"));
        }
    });

    $("#on").click(function() {
		var musicBG = document.getElementById("musicBG");
    	if(musicBG.volume == 0) {
    		$("#musicBG")[0].volume = 1;
    	}
    })

    $("#off").click(function() {
    	$("#musicBG")[0].volume = 0;
    })

	const progressDone = document.querySelectorAll('.progress-done');

	progressDone.forEach(progress => {
		progress.style.width = progress.getAttribute('data-done') + '%';
	});

	$("#main").click(function() {
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
		window.location.href = "main.html";
	})

	$("#switchButton").click(function() {
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
		window.location.href = "login.html";
	})

	$("#logoutButton").click(function() {
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
		alert("注销成功！");
		window.location.href = "register.html";
	})

	$("#changeNickname").click(function() {
		if($("#changeNickname").html() == "点击修改") {	
			var newItem = "<input id='inputNickname' class='inputNewItem' type='text' name='' value=''>";
			$("#changeNickname").before(newItem);
			$("#changeNickname").html("确认修改");
		}
		else {
			if($("#inputNickname").val().length >= 2 && $("#inputNickname").val().length <= 10) $username = $("#inputNickname").val();
			else{
				alert("昵称须在2-10个字符内");
				return;
			}
			$.ajax({
				type: "POST",
				url: "php/personalCenter/changeNickname.php",
				async: false,
				// dataType: "text",
				data: {telephone: $telephone, username: $username},
				success: function(data) {
					$("#nickname").text($username);
					$.ajax({
						type: "POST",
						url: "php/index/save.php",
						// dataType: "json",
						data: {telephone: $telephone, username: $username},
						success: function(data){
							alert("修改成功");
						},
						error: function() {
							alert("会话错误");
						}
					});
				},
				error: function() {
					alert("数据库错误");
				}
			});
			$("#inputNickname").remove();
			$("#changeNickname").html("点击修改");
		}
	})

	$("#changePassword").click(function() {
		var newItem = "<input id='inputCheck' class='inputNewItem' type='password' name='' value=''>";
		$("#changePassword").before(newItem);
		$("#changePassword").css("display", "none");
		$("#thirdChange").css("display", "flex");
	})

	$("#savePassword").click(function() {
		if($("#inputPassword").val().length >= 4 && $("#inputPassword").val().length <= 10) $password = $("#inputPassword").val();
		else{
			alert("密码须在4-10个字符内");
			return;
		}
		if($("#inputCheck").val() != $password){
			alert("两次密码输入不一致");
			$password = "";
			return;
		}
		$.ajax({
			type: "POST",
			url: "php/personalCenter/changePassword.php",
			async: false,
			// dataType: "text",
			data: {telephone: $telephone, password: $password},
			success: function(data) {
				alert("修改成功");
			},
		});
		$("#inputPassword").remove();
		$("#inputCheck").remove();
		$("#thirdChange").css("display", "none");
		$("#changePassword").css("display", "flex");
	});
	// $("#changeHead").click(function() {
		// if($("#changeHead").html() == "点击修改") {	
			// var newItem = "<input id='changeHead' class='inputNewItem' type='file' name='' value=''>";
			// $("#changeHead").before(newItem);
			// $("#changeHead").html("确认修改");
		// }
		// else {
			// if(
			// $('#changeHead').val()==""){
				// alert("请上传图片");
				// return false;
			// }
			
			// $.ajax({
				// url: 'php/personalCenter/changeHead.php',
				// type: 'POST',
				// data: formData,
				// contentType: false,    //不可缺
				// processData: false,    //不可缺
				// success: function(jsonStr){
					// console.log(jsonStr);
					// alert("修改成功");
				// },
				// error: function(){
					// alert("数据库错误");
				// }
			// }); // ajax结束
			// $("#changeHead").remove();
			// $("#changeHead").html("点击修改");
		// }
	// });
	$("#changeHead").click(function() {
		var newItem = "<form method='post' action='php/personalCenter/upload_file.php' class='itemWrapper changeItem' enctype='multipart/form-data'><input type='file' name='file' id='file' class='inputNewItem' value='上传图片'><input type='submit' name='submit' id='submit' class='changeButton' value='点击修改'></form>";
		if($("#temp").html() != newItem) {	
			$("#temp").html(newItem);
		}
		else {
			$("#temp").html("<p id='changeHead' class='changeButton'>点击修改</p>");
		}
	});
	// $("#inputHead").change(function(value) {
		// $.each($('#inputHead')[0].files, function(i, file) {
	        // var fileSize = $(this)[0].size;
	        // var fileType = $(this)[0].type;
	        
			// 判断上传图片的类型和大小，符合要求的话，添加到表单对象（formData）中
			// formData.append('telephone', $telephone);
	        // 如果大小和类型符合要求
	        // if((fileType=='image/gif' || fileType=='image/jpeg' || fileType=='image/pjpeg' || fileType=='image/png') && (fileSize>0 && fileSize<GW_MAXFILESIZE)){
	            // 为表单添加数据
				// $("#timg").attr("src", "images/"+file.name);
	            // formData.append('inputHead', file);
	            // canUpload = true;
				// $.ajax({
					// url:"php/personalCenter/submit_form_process.php",
					// type:'POST',
					// data: formData,
					// contentType: false,    //不可缺
					// processData: false,    //不可缺
				// });
	        // }
	        // else{
	            // alert("图像必须是 GIF, JPEG, 或者PNG格式, 文件大小不能超过2M!");
	        // }
	    // });
	// });
});