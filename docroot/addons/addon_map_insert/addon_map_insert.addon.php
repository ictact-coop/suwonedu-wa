<?php
    if(!defined("__ZBXE__")) exit();

    /**
     * @addon_map_insert.addon.php
     * @author kindguy (kolaskks@naver.com)
     * @brief 구글지도 삽입 애드온
     **/

    if($called_position == 'after_module_proc') {
  		$document_srl = Context::get('document_srl');

      if($document_srl) {
  		$oDocumentModel = &getModel('document');
      $thisDocument = $oDocumentModel->getDocument($document_srl);
			Context::addCSSFile('./addons/addon_map_insert/addon_map_insert.css');


      if($thisDocument->getExtraEidValue($addon_info->extra_eid)){


      if($addon_info->map_provider=='naver'){
        $input_address = str_replace(' ','',$thisDocument->getExtraEidValue($addon_info->extra_eid));
//        $input_address = $thisDocument->getExtraEidValue($addon_info->extra_eid);
        $mapinfo_xml = 'http://openapi.map.naver.com/api/geocode.php?key='.$addon_info->map_apikey.'&encoding=utf-8&coord=tm128&query='.$input_address;
        $mapinfo_xml = str_replace('&amp;','&',Context::convertEncodingStr($mapinfo_xml));
        $buff = FileHandler::getRemoteResource($mapinfo_xml, null, 3, 'GET', 'application/xml');
        $encoding = preg_match("/<\?xml.*encoding=\"(.+)\".*\?>/i", $buff, $matches);
        if($encoding && !preg_match("/UTF-8/i", $matches[1])){
          $buff = Context::convertEncodingStr($buff);
        }
        $buff = preg_replace("/<\?xml.*\?>/i", "", $buff);
        $map_data = simplexml_load_string($buff);
        $map_data->item[0]->address;
        $tm128_x = $map_data->item[0]->point->x;
        $tm128_y = $map_data->item[0]->point->y;

        if($tm128_x && $tm128_y){
        $header_content = '
          <script type="text/javascript" src="http://openapi.map.naver.com/openapi/naverMap.naver?ver=2.0&key='.$addon_info->map_apikey.'"></script>
          <script type="text/javascript">
          function insertMap(){
        ';
        if($addon_info->map_width){
          $header_content = $header_content.'
            var width = '.$addon_info->map_width.';
          ';
        }
        else{
          $header_content = $header_content.'
            var width = jQuery(".xe_content[class*=document_]").eq(0).width() - 20;
          ';
        }
        if($addon_info->map_height){
          $header_content = $header_content.'
            var height = '.$addon_info->map_height.';
          ';
        }
        else{
          $header_content = $header_content.'
            var height = parseInt((width*3)/5);
          ';
        }
        $header_content = $header_content.'
          var map_width = width;
          var map_height = height;
          var oSeoulCityPoint = new nhn.api.map.TM128('.$tm128_x.', '.$tm128_y.');
          var defaultLevel = 11;
          var oMap = new nhn.api.map.Map(document.getElementById("map"), { 
		    	      	point : oSeoulCityPoint,
				          zoom : defaultLevel,
				          enableWheelZoom : true,
				          enableDragPan : true,
				          enableDblClickZoom : false,
				          mapMode : 0,
				          activateTrafficMap : false,
				          activateBicycleMap : false,
				          minMaxLevel : [ 1, 14 ],
				          size : new nhn.api.map.Size(map_width, map_height)		});
          var oSlider = new nhn.api.map.ZoomControl();
          oMap.addControl(oSlider);
          oSlider.setPosition({
	          top : 10,
	          left : 10
          });

          //일반,위성 표시부분
		      var oMapTypeBtn = new nhn.api.map.MapTypeBtn();
		      oMap.addControl(oMapTypeBtn);
		      oMapTypeBtn.setPosition({
			      bottom : 10,
			      right : 80
      		});

          //마커 아이콘
          var oSize = new nhn.api.map.Size(28, 37);
          var oOffset = new nhn.api.map.Size(14, 37);
          var oIcon = new nhn.api.map.Icon("http://static.naver.com/maps2/icons/pin_spot2.png", oSize, oOffset);
          var oInfoWnd = new nhn.api.map.InfoWindow();
          oInfoWnd.setVisible(false);
          oMap.addOverlay(oInfoWnd);
          oInfoWnd.setPosition({
	          top : 20,
	          left :20
          });

      		var oLabel = new nhn.api.map.MarkerLabel(); // - 마커 라벨 선언.
		      oMap.addOverlay(oLabel); // - 마커 라벨 지도에 추가. 기본은 라벨이 보이지 않는 상태로 추가됨.

      		oInfoWnd.attach("changeVisible", function(oCustomEvent) {
			      if (oCustomEvent.visible) {
				      oLabel.setVisible(false);
      			}
      		});
		
      		var oPolyline = new nhn.api.map.Polyline([], {
			      strokeColor : "#f00", // - 선의 색깔
			      strokeWidth : 5, // - 선의 두께
			      strokeOpacity : 0.5 // - 선의 투명도
		      }); // - polyline 선언, 첫번째 인자는 선이 그려질 점의 위치. 현재는 없음.
		      oMap.addOverlay(oPolyline); // - 지도에 선을 추가함.

      		oMap.attach("mouseenter", function(oCustomEvent) {
			      var oTarget = oCustomEvent.target;
			      // 마커위에 마우스 올라간거면
			      if (oTarget instanceof nhn.api.map.Marker) {
				      var oMarker = oTarget;
				      oLabel.setVisible(true, oMarker); // - 특정 마커를 지정하여 해당 마커의 title을 보여준다.
      			}
      		});

      		oMap.attach("mouseleave", function(oCustomEvent) {
			      var oTarget = oCustomEvent.target;
			      // 마커위에서 마우스 나간거면
			      if (oTarget instanceof nhn.api.map.Marker) {
				      oLabel.setVisible(false);
      			}
      		});

          //선택된 위치에 마커표시
          var marker_title = "'.$thisDocument->getExtraEidValue($addon_info->extra_eid).'";
  	      var oMarker = new nhn.api.map.Marker(oIcon, { title : marker_title });
		      oMarker.setPoint(oSeoulCityPoint);
		      oMap.addOverlay(oMarker);
          }
          </script>
        .';
        Context::addHtmlheader($header_content);

        $footer_content = '
          <script type="text/javascript">
        ';
        if($addon_info->map_width){
          $footer_content = $footer_content.'
            var width = '.$addon_info->map_width.';
          ';
        }
        else{
          $footer_content = $footer_content.'
            var width = jQuery(".xe_content[class*=document_]").eq(0).width() - 20;
          ';
        }
        if($addon_info->map_height){
          $footer_content = $footer_content.'
            var height = '.$addon_info->map_height.';
          ';
        }
        else{
          $footer_content = $footer_content.'
            var height = parseInt((width*3)/5);
          ';
        }
        $footer_content = $footer_content.'
            jQuery(".xe_content[class*=document_]").eq(0).append("<br /><div id=\'map\' style=\'position:relative; width:"+width+"px; height:"+height+"px; border:10px solid #ddd; margin:0px auto;\'></div>");
            insertMap();
            //ADDON "resize_image" noevent
            jQuery("#map img").mouseover(function(){
              return false;
            });
          </script>
        ';
        Context::addHtmlFooter($footer_content);
        }


      }
      else{
        $header_content = '
          <link href="https://developers.google.com/maps/documentation/javascript/examples/default.css" rel="stylesheet" type="text/css" />
          <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
          <script type="text/javascript">
          function insertMap(){
            var geocoder;
            var map;
            function initialize() {
              geocoder = new google.maps.Geocoder();
              var latlng = new google.maps.LatLng(-34.397, 150.644);
              var myOptions = {
                zoom: 15,
                center: latlng,
                disableDefaultUI: true,
                panControl: false,
                zoomControl: false,
                mapTypeControl: true,
                scaleControl: true,
                overviewMapControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              }
              map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
              var address = "'.$thisDocument->getExtraEidValue($addon_info->extra_eid).'";
              geocoder.geocode( { "address": address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  map.setCenter(results[0].geometry.location);
                  var marker = new google.maps.Marker({
                      map: map,
                      position: results[0].geometry.location,
                      title: "'.$thisDocument->getExtraEidValue($addon_info->extra_eid).'"
                  });
                }else{
                  alert("Geocode was not successful for the following reason: " + status);
                }
              });
            }
            google.maps.event.addDomListener(window, "load", initialize);
          };
          </script>
        ';
        Context::addHtmlheader($header_content);

        $footer_content = '
          <script type="text/javascript">
        ';
        if($addon_info->map_width){
          $footer_content = $footer_content.'
            var width = '.$addon_info->map_width.';
          ';
        }
        else{
          $footer_content = $footer_content.'
            var width = jQuery(".xe_content[class*=document_]").eq(0).width() - 20;
          ';
        }
        if($addon_info->map_height){
          $footer_content = $footer_content.'
            var height = '.$addon_info->map_height.';
          ';
        }
        else{
          $footer_content = $footer_content.'
            var height = parseInt((width*3)/5);
          ';
        }
        $footer_content = $footer_content.'
            jQuery(".xe_content[class*=document_]").eq(0).append("<br /><div id=\'map_canvas\' style=\'position:relative; width:"+width+"px; height:"+height+"px; border:10px solid #ddd; margin:0px auto;\'></div>");
            insertMap();
          </script>
        ';
        Context::addHtmlFooter($footer_content);
      }

      }



      }
    }
?>
