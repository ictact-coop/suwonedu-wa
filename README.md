# [수원시 평생학습관 웹진 와](http://wasuwon.net/)

웹진 와는 다양한 현장 학습에서 느끼는 철학적, 실천적 고민들을 이야기하는 평생학습의 공론장이 되고자 합니다.

## 로컬 개발

```bash

# 데이터베이스 복원
$ mysql -u root -p -e 'create database `wa_local`;'
$ gunzip < dump/wa.20180227221830.sql.gz | mysql -u root -p wp_local

# 파일 디렉토리 놓기
$ tar zxvf dump/files.tar.gz -C ./docroot/

# xe 데이터베이스 설정 파일 위치에 놓기
$ mkdir -p docroot/files/config/
$ cp dump/db.config.php.local docroot/files/config/db.config.php

# php 내장 웹서버 실행
$ cd docroot
$ php -S localhost:8888

```