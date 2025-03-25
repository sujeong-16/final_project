import React, { useState } from "react";
import { Button, ButtonToolbar, Modal, Placeholder, Table } from "rsuite";
import "../../../css/att.css";

const { Column, HeaderCell, Cell } = Table;

export const RegVacaItems = () => {

  // 휴가항목
  const data = [
    {
      vacaId: 20194,
      vacaName: "2025 연차",
      vacaGroup: "2025/01/01 ~ 2025/12/31",
      vacaUse: "Y",
    },
    {
      vacaId: 20192,
      vacaName: "2024 연차",
      vacaGroup: "2024/01/01 ~ 2024/12/31",
      vacaUse: "Y",
    },
    {
      vacaId: 20193,
      vacaName: "2024 경조사휴가",
      vacaGroup: "2024/01/01 ~ 2024/12/31",
      vacaUse: "Y",
    },
  ];

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
          휴가항목등록
        </div>
      </div>

      <Table data={data} autoHeight bordered>
        <Column width={70} align="center">
          <HeaderCell>휴가코드</HeaderCell>
          <Cell dataKey="vacaId" />
        </Column>

        <Column width={200}>
          <HeaderCell>휴가명</HeaderCell>
          <Cell dataKey="vacaName" />
        </Column>

        <Column width={300}>
          <HeaderCell>사용기간</HeaderCell>
          <Cell dataKey="vacaGroup" />
        </Column>

        <Column width={50}>
          <HeaderCell>사용</HeaderCell>
          <Cell dataKey="vacaUse" />
        </Column>
      </Table>

      <ButtonToolbar>
        <Button onClick={handleOpen} className="addBtn">추가</Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>휴가항목등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Placeholder.Paragraph /> */}
          <div>휴가항목등록</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            닫기
          </Button>
          <Button onClick={handleClose} appearance="primary">
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

