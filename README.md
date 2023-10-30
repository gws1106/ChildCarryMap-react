
# Child Carry Map - 여름철 아이들 물놀이장 정보 제공 시스템 (2023.06.29 ~ 2023.08.08)

<img width="840" alt="main" src="https://github.com/liljw/ChildCarryMap/assets/129480514/559847e1-8506-478c-8dba-5b49cde8ece5">

## 개요

본 프로젝트는 **빅데이터, AI, 클라우드 세 전공이 융합**하여 진행한 최종 프로젝트이다.  
총 5주의 시간이 주어졌으며, 주어진 시간 안에 세 전공 모두의 결과를 서비스 할 수 있는 웹 사이트를 만드는 것을 목표로 한다.  

기술 스택은 Python, Django, AWS, React, JS, HTML, CSS, MySQL 등을 사용하였다.

저는 프론트(80%), 클라우드 인프라 구축(80%), 프론트-백엔드 연동(50%) 부분을 맡아 수행하였습니다.

본 프로젝트는 총 6개 팀의 참가 가운데 **최우수상**을 수상하였다.

---

## 목차

1. 프로젝트 결과 
    - 메인페이지
    - 상세페이지
2. 기획
    - 주제 선정 배경
    - 타겟
    - 기대효과
3. 구현
    - 클라우드
        - 인프라 설계 구성도
    - 웹
        - 데이터베이스 ERD
4. 기능
    - 데이터 분석
        - 편의지수 개발
            - 데이터 마트 구축
            - 활용 데이터 셋
            - 인덱스 도출 알고리즘
            - 만족거리 및 K값
            - 회귀 모형 및 예측
            - 편의지수 도출 최종 모형
            - 편의지수 범주화
        - 시각화
            - Folium
            - 랭킹
            - 방사형차트 (스버로 데이터 요청할 수 있음
- 백엔드는 2개의 가용영역을 두고 Private Subnet에 위치시켰고 Load Balancer를 연결, EC2에 Django app을 도커 이미지로 배포
- DB는 Private에 위치시켜 Public 접근을 막음
- 클라우드 운영자는 Bastion Host를 통해 Pirvate에 위치한 DB관리 
- 깃허브 액션을 통해 개발자의 workflow를 자동화

<br>

### 데이터베이스 ERD

<img width="1680" alt="erd" src="https://github.com/liljw/ChildCarryMap/assets/129480514/9f87e416-ef0e-420e-ae00-7ae315743b46">
---


# 데이터 분석

## 편의지수 개발

### 데이터 마트 구축 

<img width="1680" alt="datamart" src="https://github.com/liljw/ChildCarryMap/assets/129480514/7f6f0b0a-ed70-4439-8eb9-ba4d4bfda25a">

### 활용 데이터 셋

<img width="1680" alt="dataset" src="https://github.com/liljw/ChildCarryMap/assets/129480514/261b34f8-67a3-4722-8ff3-841364896323">

### 인덱스 도출 알고리즘

<img width="1680" alt="algorithm" src="https://github.com/liljw/ChildCarryMap/assets/129480514/04401f1e-f8ab-4954-b714-f74bcbb1bfdf">

### 만족거리 및 K값

<img width="1680" alt="K" src="https://github.com/liljw/ChildCarryMap/assets/129480514/bcc172fc-02fa-434f-8ae2-6268d6ec3542">

### 회귀 모형 및 예측

<img width="1680" alt="regression" src="https://github.com/liljw/ChildCarryMap/assets/129480514/285d6f9e-5081-41b7-8801-b15f49b0112c">

### 편의지수 도출 최종 모형

<img width="1680" alt="final model" src="https://github.com/liljw/ChildCarryMap/assets/129480514/899ff772-8455-4f83-90b4-cb9756e40371">

### 편의지수 범주화

<img width="1680" alt="binning" src="https://github.com/liljw/ChildCarryMap/assets/129480514/e3208f9a-d887-46ea-b706-5e2b452c8d54">

---

## 시각화 

### Folium

<img width="1680" alt="Folium" src="https://github.com/liljw/ChildCarryMap/assets/129480514/0bf98158-6cbc-4c97-a33a-180ed6467d54">

### 랭킹

<img width="1680" alt="Ranking" src="https://github.com/liljw/ChildCarryMap/assets/129480514/d3181f59-3180-4621-ac16-72f11cbbd9d7">

## 방사형 차트 (스파이더넷)

<img width="1680" alt="spidernet" src="https://github.com/liljw/ChildCarryMap/assets/129480514/c8673194-45a1-4b30-a0f7-5d2badb062d6">

---

# AI

## 긍/부정 감성분석

### 자연어처리

<img width="1680" alt="nlp" src="https://github.com/liljw/ChildCarryMap/assets/129480514/0a2d8e86-4b94-4853-953c-791050d94cce">

### 딥러닝 (LSTM)

<img width="1680" alt="lstm" src="https://github.com/liljw/ChildCarryMap/assets/129480514/0dc2374f-f723-49b9-8bcc-30d9f296a3af">

### 감성분석 결과 예시

<img width="1680" alt="example" src="https://github.com/liljw/ChildCarryMap/assets/129480514/f304b355-ff7f-4625-91fa-4c23e98b7eb2">

## 리뷰 키워드 추출

### 자연어처리 (워드클라우드)

<img width="1680" alt="wordcloud" src="https://github.com/liljw/ChildCarryMap/assets/129480514/fb9cac57-f1fa-46bf-8c95-5b176fa7fcb8">



## 확장가능성

<img width="1680" alt="availability" src="https://github.com/liljw/ChildCarryMap/assets/129480514/aa71d7db-d5f1-46a7-8e32-b457090e2b95">

---
