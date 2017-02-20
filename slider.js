(function() {
	
	function $(id) {
		return document.getElementById(id);
	}
	var j_sliBox = $("j_sliBox");
	var j_slider = $("j_slider");
	var sliImg = j_slider.children;
	var j_slider_ctrl = $("j_slider_ctrl");
	//找 轮播图大盒子  轮播小盒子  图片  小span
	for (var i = 0; i < sliImg.length; i++) {
		//遍历图片，动态生成li
		var span = document.createElement("span");
		j_slider_ctrl.insertBefore(span, j_slider_ctrl.children[1]);
		span.innerHTML = sliImg.length - i;
		span.className = "slider-ctrl-con";
	}
	var ctrlSpans = j_slider_ctrl.children;
	ctrlSpans[1].className = "slider-ctrl-con ctrlCurrent";
	var imgWidth = j_sliBox.clientWidth; //等於圖片自身的寬度
	//		console.log(imgWidth);1000
	for (var i = 1; i < sliImg.length; i++) {
		sliImg[i].style.left = imgWidth + "px";
	}
	var imgNow = 0; //存放現在播出到img哪張；
	for (var k in ctrlSpans) {
		ctrlSpans[k].onclick = function() {
			if (this.className == "slider-ctrl-prev") {
				/*alert("zuo")*/
				animate(sliImg[imgNow], {
					left: imgWidth
				});
				--imgNow < 0 ? imgNow = sliImg.length - 1 : imgNow;
				sliImg[imgNow].style.left = -imgWidth + "px";
				animate(sliImg[imgNow], {
					left: 0
				});
				square();
			} else if (this.className == "slider-ctrl-next") {
				//					alert("you");
				autoplay();
			} else {
				/*alert('000');*/
				var that = this.innerHTML - 1;
				if (that > imgNow) {
					animate(sliImg[imgNow], {
						left: -imgWidth
					});
					sliImg[imgNow].style.left = imgWidth + "px";
					square();
				} else if (that < imgNow) {
					animate(sliImg[imgNow], {
						left: imgWidth
					});
					sliImg[imgNow].style.left = -imgWidth + "px";
				}
				imgNow = that;
				animate(sliImg[imgNow], {
					left: 0
				});
				square();
			}
		}
	}
	/*这个函数是用来绑定图片和ctrl的关系的*/
	function square() {
		for (var i = 1; i < ctrlSpans.length - 1; i++) {
			ctrlSpans[i].className = "slider-ctrl-con";
		}
		ctrlSpans[imgNow + 1].className = "slider-ctrl-con ctrlCurrent";
	}
	var timer = null;
	timer = setInterval(autoplay, 2000);

	function autoplay() {
		animate(sliImg[imgNow], {
			left: imgWidth
		});
		++imgNow > sliImg.length - 1 ? imgNow = 0 : imgNow;
		sliImg[imgNow].style.left = imgWidth + "px";
		animate(sliImg[imgNow], {
			left: 0
		});
		square();
	}
	j_sliBox.onmouseenter = function() {
		clearInterval(timer);
	}
	j_sliBox.onmouseleave = function() {
		clearInterval(timer);
		timer = setInterval(autoplay, 2000);
	}

	/*產品輪播圖 */
	/*第一排*/
	var j_proList = document.getElementById("j_proList");
	var proUl = j_proList.children[0];
	var proLis = proUl.children;
	//		alert(proLis.length);
	for (var i = 0; i < proLis.length; i++) {
		//			console.log(i);
		proLis[i].style.backgroundImage = "url(img/proImg/1/" + (i + 1) + ".jpg)";
		proLis[i].onmouseover = function() {
			for (var j = 0; j < proLis.length; j++) {
				animate(proLis[j], {
					width: 60
				});
			}
			animate(this, {
				width: 300
			});
		}
		proLis[i].onmouseout = function() {
			for (var j = 0; j < proLis.length; j++) {
				animate(proLis[j], {
					width: 75
				});
			}
		}
	}
	/*第二排*/
	twoSli();

	function twoSli() {
		var j_proList2_ul = $("j_proList2_ul");
		var j_proList2 = j_proList2_ul.parentNode;
		var num = 0;
		var timer = null;
		moveTimer = setInterval(move, 10);

		function move() {
			num--;
			num <= -2500 ? num = 0 : num;
			j_proList2_ul.style.left = num + "px";
		}
		j_proList2.onmouseover = function() {
			clearInterval(moveTimer);
		}
		j_proList2.onmouseout = function() {
			moveTimer = setInterval(move, 10);
		}
	}
	/*產品展示完*/
	proShow();

	function proShow() {
		var j_proShow = $("j_proShow");
		var ul = j_proShow.children[0];
		var lis = ul.children;
		for (var i = 0; i < lis.length; i++) {
//			lis[i].innerHTML = "<img src='img/proImg/3/" + (i + 1) + ".jpg'/>"
			lis[i].onmouseover = function() {
				for (var j = 0; j < lis.length; j++) {
					animate(lis[j].children[1], {
						width: 150,
						height: 112
					});
				}
				animate(this.children[1], {
					width: 200,
					height: 160
				});
			}
			lis[i].onmouseout = function() {
				for (var j = 0; j <lis.length; j++) {
					animate(lis[j].children[1], {
						width: 150,
						height:112
					});
				}
			}

		}
	}
	
	/*尾部*/
})();
