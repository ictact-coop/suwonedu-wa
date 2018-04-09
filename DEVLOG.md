# 개발 일지

## 2018/02/28 - xe 1 프로젝트 깃 저장소 만들기

기존 소스에 XE 최신 버전을 덮어써볼까 했지만 코어가 제공하는 기본 모듈, 위젯, 애드온, 레이아웃, 스킨 등과 구분이 되지 않아서
일단 최신 버전의 XE 소스에 기존 프로젝트에서 쓰던 모듈, 위젯 등을 역으로 추가해가며 커밋을 하고 
안전하다거나 믿을 수 있는 코드베이스를 만들어보자! 좀 더 구체적으로 아래 디렉토리를 살펴봐야....

```
addons
layouts
modules
module-board-skins
module-member-skins
widgets
```

좀 꼴때리는게 이 디렉토리들은 모두 코어가 제공하는 디렉토리인데 이거 자체는 문제가 안되는데
코어 애드온, 코어 모듈, 코어 레이아웃과 커뮤니티 프로젝트(드루팔로 치면 contributed module)가 구분이 안된다는...
눈으로 확인해서 코어 프로젝트를 제외하고 레거시 프로젝트에서 사용하는 디렉토리를 각각의 디렉토리로 복사를 해야...
게다가 더 짜치는 건 실제 웹사이트에서 어떤 애드온, 모듈, 위젯, 스킨 등을 사용하는지 직관적으로 파악하기가 어렵다는...
일단 돌려보면서 에러가 없으면 안 쓰는거 같은 프로젝트를 삭제하는 방식으로...

어쨌든 하나씩 차분히 해봅시다 ㅋ
