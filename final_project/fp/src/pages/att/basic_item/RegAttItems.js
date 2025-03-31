import React, { useState } from "react";
// import { useLocation } from "react-router-dom";   // 현재 경로를 알수있음
import { Button, Container } from "rsuite";
// import "../../../css/att.css";
import AttItemsTable from "../../../components/AttItemsTable";
import SearchItems from "../../../components/SearchItems";
import AttModal from "../../../components/AttModal";
import { Navigate } from "react-router-dom";

export const RegAttItems = () => {

  // 테이블에 들어갈 항목들의 제목을 미리 정해둔다.
  const columns = [
    { label: "근태코드", dataKey: "a_code", width: 100 },
    { label: "근태명", dataKey: "a_name", width: 150 },
    { label: "근태유형", dataKey: "a_type", width: 150 },
    { label: "사용유무", dataKey: "a_use", width: 100 },
    { label: "비고", dataKey: "a_note", width: 200 },
  ];

  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  
  // 검색 요청 함수
  const handleSearch = (term) => {
    setSearchTerm(term); // 검색어 상태 업데이트
  };

  // 모달 상태를 부모에서 관리
  // open이라는 상태 변수를 사용해서 모달이 열렸는지 닫혔는지를 관리함.
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    // console.log("모달 열기"); // 디버깅 로그
    setOpen(true);
  };
  const handleClose = () => {
    // console.log("모달 닫기"); // 디버깅 로그
    setOpen(false);
  };

  // 현재 URL 경로를 알 수 있음
  // const location = useLocation();
  // console.log(location.pathname);

  // 글 삭제처리
  const deleteAttItems = () => {
    fetch("http://localhost:8081/erp/regAttItems", {
      method: "PUT",
    })
      .then((res) => res.json()) // String 형은 .text() 로 받아야 한다.
      .then((res) => {
        if (res === "ok") {
          alert("삭제되었습니다.");
          Navigate("/regAttItems"); // true라면, 삭제버튼 누른 곳으로 이동.
        } else {
          alert("삭제에 실패했습니다.");
        }
      });
  };

  return (
    <>
      <Container className="attItems">
        <Container className="title">
          근태항목등록
          <SearchItems onSearch={handleSearch}/>
        </Container>
        <AttItemsTable
          url={`http://localhost:8081/erp/regAttItems?search=${searchTerm}`}
          columns={columns}
        />
        <Container style={{ display: "flex", flexDirection: "row" }}>
          {/* <Button className="addBtn" onClick={deleteAttItems}>
            삭제
          </Button> */}
          <Button className="addBtn" onClick={handleOpen}>
            추가
          </Button>
        </Container>
        <AttModal open={open} onClose={handleClose} />
        {/* 모달 상태와 닫기 함수를 props로 전달 */}
      </Container>
    </>
  );
};
