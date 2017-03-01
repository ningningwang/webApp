(function(){
	var Util = (function(){
		var prefix = 'html_reader_';
		var StorageGetter = function(key){
			return localStorage.getItem(prefix + key);
		}
		var StorageSetter = function(key,val){
			return localStorage.setItem(prefix + key,val);
		}
		return {
			StorageGetter:StorageGetter,
			StorageSetter:StorageSetter
		}
	})();


	function main(){
		//整个项目入口函数
		//dom节点的缓存
		var Dom = {
			top_nav:$('#top_nav'),
			bottom_nav:$('.bottom_nav'),
			bk_container : $('#bk-container'),
			night_button : $('#night-button'),
		}
		var Win = $(window);
		var Doc = $(document);
		var RootContainer = $('#fiction_container');
		//是否是夜间模式
		var NightMode = false;
		//初始化的字体大小
		var InitFontSize;
		//从缓存中读取的信息进行展示
		var ModuleFontSwitch = (function() {
			//字体和背景的颜色表
			var colorArr = [{
				value : '#f7eee5',
				name : '米白',
				font : ''
			}, {
				value : '#e9dfc7',
				name : '纸张',
				font : '',
				id : "font_normal"
			}, {
				value : '#a4a4a4',
				name : '浅灰',
				font : ''
			}, {
				value : '#cdefce',
				name : '护眼',
				font : ''
			}, {
				value : '#283548',
				name : '灰蓝',
				font : '#7685a2',
				bottomcolor : '#fff'
			}, {
				value : '#0f1410',
				name : '夜间',
				font : '#4e534f',
				bottomcolor : 'rgba(255,255,255,0.7)',
				id : "font_night"
			}];

			var tool_bar = Util.StorageGetter('toolbar_background_color');
			var bottomcolor = Util.StorageGetter('bottom_color');
			var color = Util.StorageGetter('background_color');
			var font = Util.StorageGetter('font_color');
			var bkCurColor = Util.StorageGetter('background_color');
			var fontColor = Util.StorageGetter('font_color');

			for (var i = 0; i < colorArr.length; i++) {
				var display = 'none';
				if (bkCurColor == colorArr[i].value) {
					display = '';
				}
				Dom.bk_container.append('<div class="bk-container" id="' + colorArr[i].id + '" data-font="' + colorArr[i].font + '"  data-bottomcolor="' + colorArr[i].bottomcolor + '" data-color="' + colorArr[i].value + '" style="background-color:' + colorArr[i].value + '"><div class="bk-container-current" style="display:' + display + '"></div><span style="display:none">' + colorArr[i].name + '</span></div>');
			}

			RootContainer.css('min-height', $(window).height() - 100);

			if (bottomcolor) {
				$('#bottom_tool_bar_ul').find('li').css('color', bottomcolor);
			}

			if (color) {
				$('body').css('background-color', color);
			}

			if (font) {
				$('.m-read-content').css('color', font);
			}

			//夜间模式
			if (fontColor == '#4e534f') {
				NightMode = true;
				$('#day_icon').show();
				$('#night_icon').hide();
				$('#bottom_tool_bar_ul').css('opacity', '0.6');
			}
			
			//字体设置信息
			initFontSize = parseInt(Util.StorageGetter('font_size'));
			if(!initFontSize){
				initFontSize = 14;
			}
			RootContainer.css('font-size',initFontSize);
		})();

		//页面中的零散交互事件处理
		var EventHandler = (function() {
			//夜间和白天模式的转化
			Dom.night_button.click(function() {
				if (NightMode) {
					$('#day_icon').hide();
					$('#night_icon').show();
					$('#font_normal').trigger('click');
					NightMode = false;
				} else {
					$('#day_icon').show();
					$('#night_icon').hide();
					$('#font_night').trigger('click');
					NightMode = true;
				}

			});

			//字体和背景颜色的信息设置
			Dom.bk_container.delegate('.bk-container', 'click', function() {
				var color = $(this).data('color');
				var font = $(this).data('font');
				var bottomcolor = $(this).data('bottomcolor');
				var tool_bar = font;
				Dom.bk_container.find('.bk-container-current').hide();
				$(this).find('.bk-container-current').show();
				if (!font) {
					font = '#000';
				}
				if (!tool_bar) {
					tool_bar = '#fbfcfc';
				}

				if (bottomcolor && bottomcolor != "undefined") {
					$('#bottom_tool_bar_ul').find('li').css('color', bottomcolor);
				} else {
					$('#bottom_tool_bar_ul').find('li').css('color', '#a9a9a9');
				}
				$('body').css('background-color', color);
				$('.m-read-content').css('color', font);

				Util.StorageSetter('toolbar_background_color', tool_bar);
				Util.StorageSetter('bottom_color', bottomcolor);
				Util.StorageSetter('background_color', color);
				Util.StorageSetter('font_color', font);

				var fontColor = Util.StorageGetter('font_color');
				//夜间模式
				if (fontColor == '#4e534f') {
					NightMode = true;
					$('#day_icon').show();
					$('#night_icon').hide();
					$('#bottom_tool_bar_ul').css('opacity', '0.6');
				} else { 
					NightMode = false;
					$('#day_icon').hide();
					$('#night_icon').show();
					$('#bottom_tool_bar_ul').css('opacity', '0.9');
				}
			});

			//按钮的多态样式效果
			$('.spe-button').on('touchstart', function() {
				$(this).css('background', 'rgba(255,255,255,0.3)');
			}).on('touchmove', function() {
				$(this).css('background', 'none');
			}).on('touchend', function() {
				$(this).css('background', 'none');
			});
			//字体放大
			$('#large-font').click(function(){
				if(initFontSize > 20){
					return;
				}
				initFontSize += 1;
				RootContainer.css('font-size',initFontSize);
				Util.StorageSetter('font_size',initFontSize);
			});
			//字体缩小
			$('#small-font').click(function(){ 
				if(initFontSize < 12){
					return;
				}
				initFontSize -= 1; 
				RootContainer.css('font-size',initFontSize);
				Util.StorageSetter('font_size',initFontSize);
			});

			var font_container = $('.font-container');
			var font_button = $('#font-button');
			var menu_container = $('#menu_container');
			//交互的事件绑定
			$('#action_mid').click(function(){
				if(Dom.top_nav.css('display') == 'none'){
					Dom.top_nav.show();
					Dom.bottom_nav.show();
				}else{
					Dom.top_nav.hide();
					Dom.bottom_nav.hide();
					font_container.hide();
					font_button.removeClass('current');
				}
			});

			Win.scroll(function(){
				Dom.top_nav.hide();
				Dom.bottom_nav.hide();
				font_container.hide();
				font_button.removeClass('current');
			});

			font_button.click(function(){
				if(font_container.css('display') == 'none'){
					font_container.show();
					font_button.addClass('current');
				}else{
					font_container.hide();
					font_button.removeClass('current');
				}
			});
		})();


	}
	function ReaderModel(){
		//实现和阅读器相关的数据交互的方法
	};
	function ReaderBaseFrame(){
		//渲染基本的UI结构
	};

	return main();
})();