# tetris

배포 : https://woriwori.github.io/tetris/index.html

출처 : https://medium.com/@michael.karen/learning-modern-javascript-with-tetris-92d532bcd057

(http://localhost/toy-project/tetris/)

piece : 테트리스 블럭 1개
- x,y 좌표
- color
- shape : 블럭을 내부적으로 표현해주는 2차원 배열
- ctx : canvas 객체 (여기에 블럭을 추가해서 그려줌)

board : 테트리스 블럭들이 존재하는 곳
- DOM의 캔버스 객체(ctx)를 가지고 있음. (Board 자신이 그려지는 곳)
- grid : 아직 모르겠음. 
