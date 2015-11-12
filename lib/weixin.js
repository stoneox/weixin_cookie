
		var j = 1;
		var play = true;
		function getCookie(c_name){
　　	if(document.cookie.length>0){
			console.log(document.cookie);
				var cookie_array = document.cookie.split(" ");
					for(var i=0;i<cookie_array.length;i++){
						console.log(cookie_array[i]);
						if(cookie_array[i].indexOf(c_name)>=0){
							var end = cookie_array[i].indexOf(";");
							console.log(end);
							var start = cookie_array[i].indexOf("=");
							var value = cookie_array[i].slice(start+1,end);
							console.log(value);
							return value;
						}
						//return "";
					}
			return "";
			
		}
		return "";
	　　}
		function setCookie(name_value,img_value){
			var _date = new Date();
				_date.setDate(_date.getDate()+30);
				
				document.cookie = "name = " + name_value;
				document.cookie = "img = " + img_value;
				document.cookie = "expires = " + _date.toGMTString();
				console.log(document.cookie);
		}　

		function aj(){
			$.ajax({
				type:"GET",
				url:"long_ajax.php",
				success:function(data){
					var response = data;
					if(response!=""){
						var response_alone = response.split(";");
						for(var i = 0 ;i<response_alone.length-1;i++){
							var response_array = response_alone[i].split(",");
							var response_name = response_array[0];
							var response_text = response_array[1];
							var response_img = response_array[2];
							console.log(response_img);
							$("#roll").append("<div class='talk'><img src='' alt= /><p class='talk_name'>爱谁谁:</p><p class='talk_word'>这个是例子</p></div>");
							$(".talk_name").eq(-1).text(response_name);
							$(".talk_word").eq(-1).text(response_text);
							$(".talk img").eq(-1).attr('src',response_img);
						}
						j=j+response_alone.length-2;

							$("#roll").animate({top:-95*j},600,function(){j++;});
						}
						setTimeout(aj,1000);
				},
				error:function(){
					alert("error");
				}
			})
			
			}

		
		$(function(){
			if(document.cookie.length>0){
			
				$("#front").css('display','none');
				$("#back").css('display','block');
				var name_value = getCookie('name');
				var img_url = getCookie('img');
				console.log(name_value);
				console.log(img_url);
				//var name_value = sessionStorage.getItem('name_stroage');
				//var img_url = sessionStorage.getItem('img');
				$("#back img").attr('src',img_url);
				$("#back span").eq(1).text(name_value);
				$("#button_confrim_back").click(function(){
					$("#shadow,#alert_name").css('display','none');
				})
				$("#log_off").click(function(){
					$("#back").css('display','none');
					$("#front").css('display','block');
				})
			}
			$("#button_confrim").click(function(){
				if($('#alert_name input').val()==""){
					alert("名字不能为空");
					return false;
				}
				var name_value = $("#alert_name input").val();
				var img_url;
				if($("#head input").eq(0).prop("checked")==true){
					img_url="img/head0.jpg";
				}
				if($("#head input").eq(1).prop("checked")==true){
					img_url="img/head1.jpg";
				}
				if($("#head input").eq(2).prop("checked")==true){
					img_url="img/head2.jpg";
				}
				if($("#head input").eq(3).prop("checked")==true){
					img_url="img/head3.jpg";
				}
				if($("#head input").eq(4).prop("checked")==true){
					img_url="img/head4.jpg";
				}
				if($("#head input").eq(5).prop("checked")==true){
					img_url="img/head5.jpg";
				}
				if($("#head input").eq(6).prop("checked")==true){
					img_url="img/head6.jpg";
				}
				if($("#head input").eq(7).prop("checked")==true){
					img_url="img/head7.jpg";
				}
				setCookie(name_value,img_url);
				//sessionStorage.setItem('name_stroage',name_value);
				//sessionStorage.setItem('img',img_url);
				$("#shadow,#alert_name").css('display','none');
				
			})

			aj();
			$("#reset").click(function(){
				$("textarea").val("");
			})

			$("#submit").click(function(){
				var text_value = $("textarea").val();
				var name_value = getCookie('name');
				var img_url = getCookie('img');
				//var name_value = sessionStorage.getItem('name_stroage');
				//var img_url = sessionStorage.getItem('img');
				if(text_value == ""){alert("输入不能为空");return false;}
				$.ajax({
					type:"POST",
					url:"weixin.php",
					data:{"name":name_value,"text":text_value,"img":img_url},
					success:function(){
						$("textarea").val("");
					},
					error:function(){
						alert("内部错误");
					}
				})
			})
			
		})