import React from "react";
import { Button, Checkbox, CheckboxGroup, Modal, Table } from "rsuite";
import "../../../css/att.css";
import { VacaItem } from "../../../components/VacaItem";

const { Column, HeaderCell, Cell } = Table;
const data = VacaItem(); // 데이터 반환

export const ByEmployee = () => {

  // 모달창
  const [open, setOpen] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState('static'); // 모달창 바깥 눌렀을 때, false
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
          사원별휴가일수조회
        </div>
      </div>

      <Table
        autoHeight
        data={data}
        value={backdrop}
        onChange={value => setBackdrop(value)}
      >
        <Column width={50} align="center">
          <HeaderCell
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Checkbox></Checkbox>
          </HeaderCell>
          <Cell
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginLeft: "5px",
            }}
          >
            <CheckboxGroup>
              <Checkbox></Checkbox>
            </CheckboxGroup>
          </Cell>
        </Column>

        <Column width={100} align="center">
          <HeaderCell>휴가코드</HeaderCell>
          <Cell dataKey="vacaId" />
        </Column>

        <Column width={200} fixed>
          <HeaderCell>휴가명</HeaderCell>
          <Cell dataKey="vacaName" />
        </Column>

        <Column width={200}>
          <HeaderCell>사용기간</HeaderCell>
          <Cell dataKey="vacaGroup" />
        </Column>

        <Column width={110} align="center">
          <HeaderCell>등록인원수</HeaderCell>
          <Cell dataKey="vacaNumber" />
        </Column>
      </Table>

      <Button variant="primary" className="addBtn" onClick={handleOpen}>
        선택삭제
      </Button>
      
      {/* 삭제버튼 클릭했을 때, 모달창 */}
      <Modal backdrop={backdrop} keyboard={false} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>삭제하시겠습니까?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>삭제하면 되돌릴 수 없습니다.</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            취소
          </Button>
          <Button onClick={handleClose} appearance="primary">
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
