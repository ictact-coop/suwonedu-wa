<?php
    /**
     * @file    rssboard.class.php   
     * @class   rssboard
     * @author  ChoiHeeChul, KimJinHwan, ParkSunYoung
     * @brief   rssboard module의 최상위 클래스
     *    
     * @mainpage RSS board updater Module
     * @section intro 소개
     * RSS 게시판 업데이터 모듈은 RSS로 공개되어 있는 외부 컨텐츠를 지속적으로 특정 게시판에 수집하는 모듈입니다. \n
     * 기능
     * - crontab 에 등록하여 주기적으로 업데이트 된 글을 등록
     * - 출처에 따라 다른 분류로 등록
     **/

    class rssboard extends ModuleObject {

        /**
         * @brief 설치시 추가 작업이 필요할시 구현
         **/
        function moduleInstall() {
            return new Object();
        }

        /**
         * @brief 설치가 이상이 없는지 체크하는 method
         **/
        function checkUpdate() {
            return false;
        }

        /**
         * @brief 업데이트 실행
         **/
        function moduleUpdate() {
            return new Object();
        }

        /**
         * @brief 캐시 파일 재생성
         **/
        function recompileCache() {
        }
    }
?>
