package react.boot.final_project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import react.boot.final_project.dto.AttItemsDTO;
import react.boot.final_project.dto.VacaItemsDTO;

@Mapper		// DAOImpl을 만들지 않고 여기서 만들겠다는 의미
@Repository
public interface AttMapper {

	// 기본사항등록 - 근태 항목 등록 리스트
	public List<AttItemsDTO> regAttList();

	// 기본사항등록 - 근태 항목 등록
	public List<VacaItemsDTO> regVacaList();

	// 기본사항등록 - 근태 항목 등록 추가
	public int insertAtt(AttItemsDTO dto);
	
	// 기본사항등록 - 근태 항목 등록; 검색
	public AttItemsDTO attSearch(String a_keywords);

	// 항목 등록 삭제
	public int deleteAttItems(String a_code);
}
