/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
// import { useLocation } from "react-router-dom";   // 현재 경로를 알수있음
import { Button, Form, Modal, Table } from "rsuite";
import "../../../css/att.css";
import { AttItem } from "../../../components/AttItem";

const { Column, HeaderCell, Cell } = Table;
const data = AttItem(); // 데이터 반환

export const RegAttItems = (className) => {

  // 현재 URL 경로를 알 수 있음
  // const location = useLocation();
  // console.log(location.pathname);

  // 테이블
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);

  // 모달창
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 중복확인
  const [attOpen, setAttOpen] = React.useState(false);
  const attIdCheck = () => setAttOpen(true);
  const attClose = () => setAttOpen(false);

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
          근태항목등록
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
          <HeaderCell>근태코드</HeaderCell>
          <Cell dataKey="attId" />
        </Column>

        <Column width={200} fixed sortable>
          <HeaderCell>근태명</HeaderCell>
          <Cell dataKey="attName" />
        </Column>

        <Column width={100} sortable>
          <HeaderCell>근태그룹</HeaderCell>
          <Cell dataKey="attGroup" />
        </Column>

        <Column width={90} sortable>
          <HeaderCell>근태유형</HeaderCell>
          <Cell dataKey="attType" />
        </Column>

        <Column width={70} sortable>
          <HeaderCell>사용</HeaderCell>
          <Cell dataKey="attUse" />
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
          <h6 style={{ marginBottom: "10px" }}>근태항목등록</h6>
          <Form>
            <Form.Group
              controlId="attId"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Form.ControlLabel style={{ marginTop: "3px" }}>
                근태코드
              </Form.ControlLabel>
              <Form.Control name="attId" />
              <Button onClick={attIdCheck}>중복확인</Button>
            </Form.Group>
            <Form.Group
              controlId="attName"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Form.ControlLabel style={{ marginTop: "3px" }}>
                근태명
              </Form.ControlLabel>
              <Form.Control name="attName" />
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

      <Modal open={attOpen} onClose={attClose}>
        <Modal.Header>
          <Modal.Title>중복확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          사용가능한 아이디입니다.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={attClose} appearance="primary">
            확인
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
};
