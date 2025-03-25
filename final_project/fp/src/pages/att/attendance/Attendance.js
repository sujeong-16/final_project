import React from "react";
import { Button, Modal, Table } from "rsuite";
import "../../../css/att.css";
import { Employee } from "../../../components/Employee";
import att from "../../../components/att.png";

const { Column, HeaderCell, Cell } = Table;
let data = Employee();

// 근태조회
export const Attendance = () => {

  // 모달창
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="attItems">
      {/* ✅ 상단 바 정렬 */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <div
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}
        >
          근태조회
        </div>
      </div>

      <Table
        autoHeight
        data={data}
      >
        <Column width={100} align="center">
          <HeaderCell>근태번호</HeaderCell>
          <Cell dataKey="e_regDate" />
        </Column>

        <Column width={100} align="center">
          <HeaderCell>사원명</HeaderCell>
          <Cell dataKey="e_name" />
        </Column>

        <Column width={100} align="center">
          <HeaderCell>근태코드</HeaderCell>
          <Cell dataKey="e_attCode" />
        </Column>
        
        <Column width={100} align="center">
          <HeaderCell>근태수</HeaderCell>
          <Cell dataKey="e_att" />
        </Column>

        <Column width={100} align="center">
          <HeaderCell>휴가명</HeaderCell>
          <Cell dataKey="e_attCode" />
        </Column>
        
        <Column width={100} align="center">
          <HeaderCell>적요</HeaderCell>
          <Cell dataKey="e_text" />
        </Column>
      </Table>

      <Button variant="primary" className="addBtn" onClick={handleOpen}>
        추가
      </Button>

      {/* 추가버튼 클릭했을 때, 모달창 */}
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>근태항목등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={att} alt="근태추가" width={550}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            닫기
          </Button>
          <Button onClick={handleClose} appearance="primary">
            추가
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
