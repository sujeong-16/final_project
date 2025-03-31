import React, { useState } from "react";
import { AutoComplete, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

const SearchItems = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

  const styles = {
    width: 300,
    marginBottom: 10,
  };

  return (
    <>
      <InputGroup inside style={styles}>
        <AutoComplete
          data={[]} // 자동완성 기능은 비활성화 (필요하면 검색어 추천 목록 추가 가능)
          value={searchTerm}
          onChange={setSearchTerm} // 입력값 변경 시 상태 업데이트
          placeholder="검색어를 입력하세요"
        />
        <InputGroup.Button onClick={() => onSearch(searchTerm)}>
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>
    </>
  );
};

export default SearchItems;
