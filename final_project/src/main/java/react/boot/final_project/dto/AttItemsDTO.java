package react.boot.final_project.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data				// getter/setter
@AllArgsConstructor	// 매개변수 생성자
@NoArgsConstructor	// 디폴트 생성자
@ToString			// toString
@Builder			// 매개변수 생성자에 순서없이 값을 입력해서 셋팅해도 마지막에 build()를 통해 빌더를 작동, 같은 타입의 다른 변수명의 값을 서로 바꿔넣는 것을 방지한다.
@Entity
@Table(name="attendance_tbl")
public class AttItemsDTO {

	// 근태항목등록 dto
	@Id
	@Column(name="a_code")
	private String a_code;			// 근태코드, PK
	private String a_name;		// 근태명, UK
	private String a_type;			// 근태유형
	private String a_use;			// 근태 사용여부(Y/N)
	private String a_note;		// 비고
}
//create table attendance_tbl(
//-- 	a_listNo INT(3) auto_increment primary key,	-- 근태 게시글번호(자동증가)
//	a_code VARCHAR(100) primary key,			-- 근태번호, PK
//	a_name VARCHAR(100) unique not null,  		-- 근태명, UK
//	a_type VARCHAR(40) not null,        		-- 근태유형
//	a_use VARCHAR(1) not null,         			-- 근태 사용여부(Y/N)
//	a_note VARCHAR(200)        				-- 비고
//	a_keywords VARCHAR(255)			-- 검색 키워드
//-- 	am_no VARCHAR(100) foreign key        -- 사원번호
//);