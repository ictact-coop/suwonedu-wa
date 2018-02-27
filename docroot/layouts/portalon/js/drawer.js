	/**
	* XE엔진에서 다른 Javascript 라이브러리와의 충돌을 방지하기 위해 막아 놓은 것으로
	* $()로의 접근 대신 jQuery() 로 변경 처리함, 자세한 사항은 아래의 URL에서 확인가능.
	* http://docs.jquery.com/Core/jQuery.noConflict
	* http://www.xpressengine.com/18448963
	* by Jowrney
	*/
    jQuery(document).ready(function () {
		/**
		* 문서가 모두 로딩된 뒤에 숨겨진 메뉴를 보기로 변경한다.
		* by Jowrney
		*/
		document.getElementById("layoutToggle2").style.visibility='visible';
	    /**
		* 토글 숨긴 메뉴 쿠키 저장	
	  * xSetCookie(name, value, expire, path);
		* xGetCookie(name);
		* xDeleteCookie(name, path);
	    */
		var expire = new Date();
		var days = 1;
		var path = "/"
		expire.setTime(expire.getTime()+(days*24*60*60*1000));
	    jQuery("#toggleBtn,#toggleBtn22").toggle(        	
	        function () { 
				toggleOn(true);	    
				xDeleteCookie("keepToggle");
				xSetCookie("keepToggle", true, expire);
	        },
	        function () { 
				toggleOn(false);	    	        	
				xDeleteCookie("keepToggle");
				xSetCookie("keepToggle", false, expire);
			}
	    );
		/**
		* XE엔진과의 충돌로 함수를 밖으로 빼내서 직접 스타일 적용함
		* FF3에서는 backgroundPositionY를 지원하지 않음, 값에 대한 내용도 'px'를 나누어 표기해주어야 적용됨
		* 파이어폭스, 사파리, 크롬, 익스6,7,8에서 테스트 마침
		* by Jowrney
		*/
	
		/**
		* hideMenuOpend의 값은 layout.html에서 값을 받아와야 된다.
		* 서랍메뉴의 상태값을 변경해준다. 기본값은 close
		* open과 close는 설정값을 변경하면 캐시를 삭제 해주어야 확인이 가능. 별도 처리 안함.
		* by Jowrney
		*/
		if(hideMenuOpend == "open" || hideMenuOpend == "close" ){
			if(xGetCookie("keepToggle") == null){
				if(hideMenuOpend == "open" ){
					document.getElementById("cont_body").style.top = '0'+'px';
					document.getElementById("toggleBtn").style.backgroundPosition='0'+'px '+'-26'+'px';
					//토글 상태 변수 파악이 되지 않아 Click함수로 대체 처리.
				
				}else{
				  
				}
			}else{
				if(xGetCookie("keepToggle") == "true"){
				
				}						
			}
	
		}else if(hideMenuOpend == "close_always"){
	
		}else if(hideMenuOpend == "open_always"){
		
		}
		/**
		* 플로팅 메뉴, 페이지의 최상단과 최하단 이동을 편리하게 한다.
		* by Jowrney
		*/
		var currentPosition = parseInt(jQuery(".slideMenu").css("top")); 
		jQuery(window).scroll(function() {

			var position = jQuery(window).scrollTop(); // 현재 스크롤바의 위치값을 반환합니다.
			var sum = position + currentPosition+"px";
			jQuery(".slideMenu").stop().animate({top:sum},500);
		});

    });
