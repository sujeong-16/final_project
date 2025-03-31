import React, { useState } from "react";
import { Button, Container } from "rsuite";
import "../../../css/att.css";
import AttItemsTable from "../../../components/AttItemsTable";
import SearchItems from "../../../components/SearchItems";
import AttModal from "../../../components/AttModal";

export const RegVacaItems = () => {
  const columns = [
    { label: "휴가코드", dataKey: "v_code", width: 100 },
    { label: "휴가명", dataKey: "v_name", width: 150 },
    { label: "사용기간", dataKey: "v_periode", width: 200 },
    { label: "사용유무", dataKey: "v_use", width: 90 },
    { label: "비고", dataKey: "v_note", width: 210 },
  ];
  
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

  return (
    <Container className="attItems">
      <Container className="title">
        휴가항목등록
        <SearchItems />
      </Container>

      <AttItemsTable
          url="http://localhost:8081/erp/regVacaItems"
          columns={columns}
        />
      <Container style={{ display:"flex", flexDirection:"row" }}>
          {/* <Button className="addBtn" style={{ marginRight: "10px" }}>삭제</Button> */}
          <Button className="addBtn" onClick={handleOpen}>
            추가
          </Button>
        </Container>
        <AttModal open={open} onClose={handleClose} />
        {/* 모달 상태와 닫기 함수를 props로 전달 */}
    </Container>
  );
};
