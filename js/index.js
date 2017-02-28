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
	var Dom = {
		top_nav:$('#top_nav'),
		bottom_nav:$('.bottom_nav'),
		font_container:$('.font-container'),
		font_button:$('#font-button')
	}
	var Win = $(window);
	var Doc = $(document);
	var RootContainer = $('#fiction_container');

	
	var initFontSize = Util.StorageGetter('font_size');
	initFontSize = parseInt(initFontSize);
	if(!initFontSize){
		initFontSize = 14;
	}
	RootContainer.css('font-size',initFontSize);

	function main(){
		//整个项目入口函数
		EventHanlder();
	}
	function ReaderModel(){
		//实现和阅读器相关的数据交互的方法
	};
	function ReaderBaseFrame(){
		//渲染基本的UI结构
	};

	function EventHanlder(){
		//交互的事件绑定
		$('#action_mid').click(function(){
			if(Dom.top_nav.css('display') == 'none'){
				Dom.top_nav.show();
				Dom.bottom_nav.show();
			}else{
				Dom.top_nav.hide();
				Dom.bottom_nav.hide();
				Dom.font_container.hide();
				Dom.font_button.removeClass('current');
			}
		});

		Dom.font_button.click(function(){
			if(Dom.font_container.css('display') == 'none'){
				Dom.font_container.show();
				Dom.font_button.addClass('current');
			}else{
				Dom.font_container.hide();
				Dom.font_button.removeClass('current');
			}
		});

		$('#large-font').click(function(){
			if(initFontSize > 20){
				return;
			}
			initFontSize += 1;
			RootContainer.css('font-size',initFontSize);
			Util.StorageSetter('font_size',initFontSize);
		});
		$('#small-font').click(function(){ 
			if(initFontSize < 12){
				return;
			}
			initFontSize -= 1; 
			RootContainer.css('font-size',initFontSize);
			Util.StorageSetter('font_size',initFontSize);
		});

		$('#night-button').click(function(){

		});
		Win.scroll(function(){
			Dom.top_nav.hide();
			Dom.bottom_nav.hide();
			Dom.font_container.hide();
			Dom.font_button.removeClass('current');
		});
	};

	main();
})();