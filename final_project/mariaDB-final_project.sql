show databases;	-- db 목록 확인
create database yeomdb;	-- db 계정ID 생성

-- alter database 계정ID default character set utf8;    -- 한글 안깨지게 처리
alter database yeomdb default character set utf8;    -- 한글 안깨지게 처리

----------------------------------------------------------------------
-- DBeaver에서 계정ID 연결
--- Server Host : 192.168.0.44
--- Username : erp_mdb
--- Password : ict04

-- 데이터베이스 생성하는 방법
-- 1. create database db명
create database yeomdb default character set utf8;

-- 2. db 보기
show databases;

-- 3. database db명으로 이동
use yeomdb	 -- use db명;


-- yeomdb 계정에서 실행
-- [근태항목관리 테이블] ---------------------------------------------------
drop table attendance_tbl;
create table attendance_tbl(
-- 	a_listNo INT(3) auto_increment primary key,	-- 근태 게시글번호(자동증가)
	a_code VARCHAR(100) primary key,			-- 근태번호, PK
	a_name VARCHAR(100) unique not null,  		-- 근태명, UK
	a_type VARCHAR(40) not null,        		-- 근태유형
	a_use VARCHAR(1) not null,         			-- 근태 사용여부(Y/N)
	a_note VARCHAR(200)        				-- 비고
-- 	am_no VARCHAR(100) foreign key        -- 사원번호
);
select * from attendance_tbl;	-- 테이블 확인

insert into attendance_tbl(a_code,a_name,a_type,a_use,a_note)
values('a-100','주말근무','기본','Y','');
insert into attendance_tbl(a_code,a_name,a_type,a_use,a_note)
values('a-200','연장근무','기본','Y','');
insert into attendance_tbl(a_code,a_name,a_type,a_use,a_note)
values('a-024','2024연차','휴가','Y','');
insert into attendance_tbl(a_code,a_name,a_type,a_use,a_note)
values('a-025','2025연차','휴가','Y','');
insert into attendance_tbl(a_code,a_name,a_type,a_use,a_note)
values('a-020','2020연차','휴가','N','');
insert into attendance_tbl(a_code,a_name,a_type,a_use,a_note)
values('a-021','2021연차','휴가','Y','연차 사용');
select * from attendance_tbl;	-- 테이블 확인

-- 근태 게시글 목록
-- rn 기준. 서브쿼리에서 rn을 만든 후 외부 쿼리에서 정렬한다.
-- ROW_NUMBER()로 만든 rn은 즉시 사용할 수 없으므로, 서브쿼리를 통해 먼저 생성 후 사용한다.
SELECT *
  FROM (SELECT *
  			 , ROW_NUMBER() OVER (ORDER BY a_code DESC) AS rn
    	  FROM attendance_tbl
		) AS subquery
 where a_use = 'Y'
 ORDER BY rn DESC;

-- SELECT *,
--        ROW_NUMBER() OVER (ORDER BY a_code DESC) AS rn
-- FROM attendance_tbl
-- ORDER BY rn DESC;
-- => 일부 DBMS(MySQL, PostgreSQL 등)에서 selete문 내에서 바로 정렬이 가능하지만 MariaDB에서는 불가능

-- 검색
--- 1. 가장 일반적인 방법
-- select * from attendance_tbl
--  where a_name like '%21%'
-- 	or a_type like '%%'
-- 	or a_note like '%%';

-- 2. 검색 최적화를 위한 검색 컬럼추가(ERP에서 자주 사용)
-- 검색키워드 컬럼 추가
ALTER TABLE attendance_tbl 
  ADD COLUMN a_keywords VARCHAR(255);
-- a_keywords 컬럼은 검색을 위해 a_name, a_type, a_note 등의 값을 합쳐 저장하는 역할.
-- 이 컬럼을 활용하면 검색할 때 한 컬럼만 검색하면 되므로 속도가 빨라짐.
 
-- 검색키워드 컬럼에 기존 데이터 넣기
UPDATE attendance_tbl 
   SET a_keywords = CONCAT(a_name, ' ', a_type, ' ', a_note, ' ');
-- a_name, a_type, a_note 값을 한 문자열로 결합해서 a_keywords에 저장한다.
-- 공백(' ')을 넣어주는 이유는 검색할 때 단어 구분을 명확하게 하기 위해서이다.
  
-- 검색하기
SELECT * FROM attendance_tbl 
 WHERE a_keywords LIKE '%휴가%'
   and a_use = 'Y';

-- 새로운 데이터가 추가될 때 a_keywords 자동 업데이트
DELIMITER //
CREATE TRIGGER trg_update_keywords
BEFORE INSERT ON attendance_tbl
FOR EACH ROW
BEGIN
    SET NEW.a_keywords = CONCAT(NEW.a_name, ' ', NEW.a_type, ' ', NEW.a_note);
END;
//
DELIMITER ;


-- [사원 테이블] ---------------------------------------------------
-- drop table employee_tbl;
create table employee_tbl(
-- 	m_listNo INT(3) auto_increment,		-- 사원 게시글번호(자동증가)
	e_id VARCHAR(100) primary key,		-- 사원번호, PK
	e_name VARCHAR(60) not null,  		-- 사원 이름
	e_tel VARCHAR(60) not null,     	-- 사원 전화번호
	e_email VARCHAR(100),				-- 사원 이메일
	e_birth INT(6),						-- 사원 생년월일
	e_position VARCHAR(40) not null,	-- 사원 직위(사원,대리,과장, ...)
	e_reg_date DATE sysdate,			-- 사원 카드 등록일
	e_status VARCHAR(100),         		-- 사원 재직상태(재직,퇴직,휴직,...)
	e_resignation_date DATE,			-- 사원 퇴사날짜
	e_resignation_reason VARCHAR(200),	-- 사원 퇴사이유
	ed_code VARCHAR(100) foreign key    -- 부서번호
);
select * from employee_tbl;	-- 테이블 확인

-- [부서 테이블] ---------------------------------------------------
-- drop table department_tbl;
create table department_tbl(
-- 	m_listNo INT(3) auto_increment,		-- 사원 게시글번호(자동증가)
	e_id VARCHAR(100) primary key,		-- 사원번호, PK
	e_name VARCHAR(60) not null,  		-- 사원 이름
	e_tel VARCHAR(60) not null,     	-- 사원 전화번호
	e_email VARCHAR(100),				-- 사원 이메일
	e_birth INT(6),						-- 사원 생년월일
	e_position VARCHAR(40) not null,	-- 사원 직위
	e_regdate DATE sysdate,				-- 사원 등록일
	e_status VARCHAR(100),         		-- 비고
	e_resignation_date DATE,			-- 사원 퇴사날짜
	e_resignation_reason VARCHAR(200),	-- 사원 퇴사이유
	ed_code VARCHAR(100) foreign key    -- 부서번호
);