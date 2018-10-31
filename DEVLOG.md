# 개발 일지

## 2018/02/28 - xe 1 프로젝트 깃 저장소 만들기

기존 소스에 XE 최신 버전을 덮어써볼까 했지만 코어가 제공하는 기본 모듈, 위젯, 애드온, 레이아웃, 스킨 등과 구분이 되지 않아서
일단 최신 버전의 XE 소스에 기존 프로젝트에서 쓰던 모듈, 위젯 등을 역으로 추가해가며 커밋을 하고
안전하다거나 믿을 수 있는 코드베이스를 만들어보자! 좀 더 구체적으로 아래 디렉토리를 살펴봐야....

```
addons
layouts
modules
modules/board/skins
modules/member/skins
widgets
```

좀 꼴때리는게 이 디렉토리들은 모두 코어가 제공하는 디렉토리인데 이거 자체는 문제가 안되는데
코어 애드온, 코어 모듈, 코어 레이아웃과 커뮤니티 프로젝트(드루팔로 치면 contributed module)가 구분이 안된다는...
눈으로 확인해서 코어 프로젝트를 제외하고 레거시 프로젝트에서 사용하는 디렉토리를 각각의 디렉토리로 복사를 해야...
게다가 더 짜치는 건 실제 웹사이트에서 어떤 애드온, 모듈, 위젯, 스킨 등을 사용하는지 직관적으로 파악하기가 어렵다는...
일단 돌려보면서 에러가 없으면 안 쓰는거 같은 프로젝트를 삭제하는 방식으로...

어쨌든 하나씩 차분히 해봅시다 ㅋ

# 2018/05/21

xe 최신 버전으로 업그레이드 후 글쓰기 화면의 에디터에도 이전과 다르게 텍스트 붙혀넣기, 워드에서 붙혀넣기 버튼이 없어졌다.
확인해보니 코어 버전이 올라가면서 ckeditor 버전도 올라가며 내부 구조가 변해서 내장되어 있던게 추가 플러그인으로 전환된 문제였...
관련 플러그인을 추가로 설치해준다.

```
common/js/plugins/ckeditor/ckeditor/plugins
- clipboard
- notification
- pastefromword
- pastetext
```

# 2018/10/31

## Family site 목록 변경

-수원시평생학습관 https://learning.suwon.go.kr/
-인문사회공유카페 https://cafe.naver.com/suwonlearn
-거북이공방 http://blog.naver.com/suwonedu2011
-고고장 http://gogospace.org/notice
-뭐라도학교 http://cafe.daum.net/3rd-Age
-누구나학교 http://nuguna.suwonedu.org/
-웹진와 페이스북 https://www.facebook.com/suwonwa/

## 오시는 길 오류 수정

```
<div class="mapouter">
<div class="gmap_canvas"><iframe frameborder="0" height="500" id="gmap_canvas" marginheight="0" marginwidth="0" scrolling="no" src="https://maps.google.com/maps?q=%EC%88%98%EC%9B%90%EC%8B%9C%ED%8F%89%EC%83%9D%ED%95%99%EC%8A%B5%EA%B4%80&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" width="740"></iframe></div>
<style type="text/css">.mapouter{text-align:right;height:500px;width:740px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:740px;}
</style>
</div>
```

## 사이드바 최신 콘텐츠

이슈/칼럼/현장 => 63051,111513,110608

```

63051,84933,98144,80699
=>
63051,111513,110608

<img class="zbxe_widget_output" widget="content" skin="tb_sb_wa_side" content_type="document" module_srls="63051,111513,110608" list_type="normal" tab_type="none" markup_type="table" list_count="8" page_count="1" subject_cut_size="25" option_view="title" show_browser_title="N" show_comment_count="N" show_trackback_count="N" show_category="N" show_icon="N" order_target="regdate" order_type="desc" thumbnail_type="crop" />
```


## 태그 최신 순

태그 페이지를 잘 보는 사람들이 없으므로 그냥 레이아웃에서 더 보기 링크를 제거하기로 한다.

```
<div style="text-align:right"><a href="/index.php?mid=keywords"><i class="xi-plus-square"></i> 더보기</a></div>
제거
```
