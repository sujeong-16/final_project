import React from "react";
import { Button, Form, Modal, Table } from "rsuite";
import "../../../css/att.css";
import { VacaItem } from "../../../components/VacaItem";

const { Column, HeaderCell, Cell } = Table;
const data = VacaItem(); // 데이터 반환

export const RegVacaItems = () => {
  // 테이블
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);

  // 모달창
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 항목 테이블
  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

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

      <Table
        autoHeight
        data={getData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
      >
        <Column width={100} align="center" sortable>
          <HeaderCell>휴가코드</HeaderCell>
          <Cell dataKey="vacaId" />
        </Column>

        <Column width={200} fixed sortable>
          <HeaderCell>휴가명</HeaderCell>
          <Cell dataKey="vacaName" />
        </Column>

        <Column width={300} sortable>
          <HeaderCell>사용기간</HeaderCell>
          <Cell dataKey="vacaGroup" />
        </Column>

        <Column width={70} sortable>
          <HeaderCell>사용</HeaderCell>
          <Cell dataKey="vacaUse" />
        </Column>
      </Table>

      <Button
        variant="primary"
        className="addBtn"
        onClick={handleOpen}
      >
        추가
      </Button>

      {/* 추가버튼 클릭했을 때, 모달창 */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Modal.Header>
          <Modal.Title>휴가항목등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ marginBottom: "10px" }}>휴가항목등록</h6>
          <Form>
            <Form.Group
              controlId="vacaId"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Form.ControlLabel style={{ marginTop: "3px" }}>휴가코드</Form.ControlLabel>
              <Form.Control name="vacaId" />
            </Form.Group>
            <Form.Group
              controlId="vacaName"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Form.ControlLabel style={{ marginTop: "3px" }}>휴가명</Form.ControlLabel>
              <Form.Control name="vacaName" />
            </Form.Group>
          </Form>
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
