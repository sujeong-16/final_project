package react.boot.final_project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import react.boot.final_project.dto.AttItemsDTO;
import react.boot.final_project.dto.VacaItemsDTO;
import react.boot.final_project.service.AttendanceService;

@RestController		// return 타입이 JSON이다.
@RequestMapping("/erp")
@CrossOrigin		// (중요) F12 브라우저에서 CORS policy 에러났을 때, 이 어노테이션을 붙여야 안난다.
public class AttendanceController {
	
	@Autowired
	private AttendanceService service;
	
	// http://localhost:8081/erp/
	@GetMapping("/")
	public String test() {
		return "test 실행성공!";
	}	// 주소에 url 복붙해서 화면에 return 값이 뿌려지는지 확인하기

	// 기본사항등록 - 근태 항목 등록 리스트
	// http://localhost:8081/erp/regAttItems
	@GetMapping("/regAttItems")
	public ResponseEntity<List<AttItemsDTO>> regAttItems() {
		System.out.println("▶ 근태Controller - 근태 항목 등록 리스트");
		
		return new ResponseEntity<>(service.regAttList(), HttpStatus.OK);		// 200 리턴(select)
	}

	// 기본사항등록 - 근태 항목 등록; 검색
	// http://localhost:8081/erp/attSearch
	@GetMapping("/regAttItems/attSearch")
	public ResponseEntity<List<AttItemsDTO>> attSearch() {
		System.out.println("▶ 근태Controller - 근태 항목 등록; 검색");
		
		return new ResponseEntity<>(service.regAttList(), HttpStatus.OK);		// 200 리턴(select)
	}
    
	// 기본사항등록 - 휴가 항목 등록 리스트
	// http://localhost:8081/erp/regVacaItems
	@GetMapping("/regVacaItems")
	public ResponseEntity<List<VacaItemsDTO>> regVacaItems() {
		System.out.println("▶ 근태Controller - 휴가 항목 등록 리스트");
		
		return new ResponseEntity<>(service.regVacaList(), HttpStatus.OK);		// 200 리턴(select)
	}

	// 기본사항등록 - 근태 항목 등록(Post) => http://localhost:8081/erp/addAttItems
	// @RequestBody => 등록/수정에만 존재
	@PostMapping("/addAttItems")
	public ResponseEntity<?> save(@RequestBody AttItemsDTO dto) {
		// ResponseEntity<?> 또는 ResponseEntity<Integer> => ?로 주게 되면 HttpStatus.CREATED의 상태값(201)을 리턴한다.
		
		return new ResponseEntity<>(service.saveAtt(dto), HttpStatus.CREATED);	// 201 리턴
	}
	
	// 항목 등록 삭제
	@DeleteMapping("/regAttItems/{a_code}")
	public ResponseEntity<?> deleteAttItems(@PathVariable String a_code){
		System.out.println("▶ 근태Controller - 항목 등록 삭제: " + a_code);
		
	    int result = service.deleteAttItems(a_code);  // 삭제 결과 (1: 성공, 0: 실패)
	    
	    if (result > 0) {
	        return new ResponseEntity<>("ok", HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
	    }
	}
}
