import { hover } from "@testing-library/user-event/dist/hover";
import "../css/att.css";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Modal, Table } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

// form에 onChange={함수명} 추가. 값이 change 될 때마다 changeValue의 (e)에 이벤트 컨텍스트가 넘어간다.
// const changeValue = (e) => {
//   // 값을 바꿀 때마다(입력한 value값이) onChange 함수로 인해 이쪽으로 넘어옴
//   setBoard({
//     ...board, // 각각의 input에 입력한 값이 지워지지 않게 함. 이 문장을 생략시 앞서 작성한 input 값들이 다 날라가고, 마지막 input 값만 저장된다.
//     [e.target.name]: e.target.value, // 동적으로 key값 만들기(compute properties names) -> input 값이 바뀔때 마다 value가 name으로 들어간다.
//   });
// };

// 기본사항등록 테이블 컴포넌트
// columns : columns 를 props로 받아 동적으로 설정할 수 있도록 변경
const AttItemsTable = ({ url, columns }) => {
  const [attList, setAttList] = useState([]);
  const [sortColumn, setSortColumn] = useState(null); // sortColumn: 어떤 컬럼(이름,나이 등)으로 정렬할지 확인하는 변수
  const [sortType, setSortType] = useState(null); // 오름차순인지 내림차순인지 확인하는 변수
  const [selectedRows, setSelectedRows] = useState({}); // 객체 형태로 변경 (더 효율적)

  // const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창의 열림/닫힘 상태를 관리하는 state
  // const [editingRow, setEditingRow] = useState(null); // 현재 수정 중인 행의 데이터

  // fetch(url)을 통해 데이터를 서버에서 가져와 attList에 저장
  useEffect(() => {
    // fetch("http://localhost:8081/erp/regAttItems", { method: "GET" })
    // url : 컴포넌트를 선언한 곳에서 지정한 url 에서 데이터를 가져옴.
    fetch(url, { method: "GET" }) // 서버에서 데이터를 받아옴
      .then((res) => res.json()) // 가져온 데이터를 컴퓨터가 이해할 수 있도록, 응답을 JSON으로 변환
      .then((res) => {
        console.log("데이터 수신: ", res); // 돌아갈때 마다 F12->console창에 찍힘
        setAttList(res); // 데이터를 저장해서 화면에 표시, 즉, 화면에 보여주기 위해 저장함
      })
      .catch((error) => console.error("데이터를 불러오지 못했습니다:", error));
  }, [url]);
  // [url] : url이 변경될 때마다 fetch 실행

  // 테이블 정렬 함수. 특정 컬럼을 클릭하면 해당 컬럼을 기준으로 정렬함(오름차순/내림차순)
  const getSortedData = () => {
    // 정렬할 열이 없으면, 정렬할 필요가 없으니 그대로 원본 데이터(=attList) 반환
    if (!sortColumn || !sortType) return attList;

    // sort()를 하면 원본이 변경될 수 있으니, 스프레드 연산자로 데이터를 복사한 후 그 배열을 정렬.
    // sort()는 배열의 두 요소(a,b)를 비교하면서 정렬을 수행하는 함수. a와 b를 비교해서 정렬 순서를 결정할 거임
    return [...attList].sort((a, b) => {
      let x = a[sortColumn]; // 현재 비교할 첫 번째 값
      let y = b[sortColumn]; // 현재 비교할 두 번째 값

      // 문자열이면 모두 소문자로 변환(=toLowerCase())
      // 대문자 vs 소문자이면, 대문자가 무조건 먼저 오기 때문에 전부 소문자로 변경
      if (typeof x === "string") x = x.toLowerCase();
      if (typeof y === "string") y = y.toLowerCase();

      return sortType === "asc" ? (x > y ? 1 : -1) : x < y ? 1 : -1; // 오름차순 또는 내림차순 비교
    });
  };

  // 개별 행 체크함수.
  // rowIndex: 사용자가 체크한 줄
  const handleRowSelect = (rowIndex) => {
    setSelectedRows((prev) => {
      const newSelection = { ...prev, [rowIndex]: !prev[rowIndex] };

      // 전체 선택 체크박스 상태 자동 업데이트
      const selectedCount = Object.values(newSelection).filter(Boolean).length; // 모든 줄이 체크되면 "전체 선택"도 체크됨
      setAllChecked(selectedCount === attList.length);
      // 전체 선택 = setAllChecked(true).

      return newSelection; // 상태를 업데이트해서 화면에 반영함.
    });
  };

  // ✅ 전체 선택 체크박스 상태 관리
  const [allChecked, setAllChecked] = useState(false);

  // 전체 선택 토글
  const handleSelectAll = () => {
    setSelectedRows((prevSelected) => {
      const allSelected = Object.keys(prevSelected).length === attList.length; // 이미 전체가 선택된 상태인지 확인
      const newSelection = allSelected
        ? {} // 전체 해제
        : attList.reduce((acc, _, index) => {
            acc[index] = true;
            return acc;
          }, {});

      setAllChecked(!allSelected); // 전체 선택 여부 설정. 모두 해제로 변경=setAllChecked(false), 모두 체크로 변경=setAllChecked(true)
      return newSelection;
    });
  };

  // // 셀 클릭 시 해당 행의 모든 데이터를 편집할 수 있도록 설정
  // const handleEdit = (rowData) => {
  //   setEditingRow({ ...rowData });
  //   setIsModalOpen(true);
  // };

  // // 입력값 변경 핸들러
  // const handleChange = (key, value) => {
  //   setEditingRow((prev) => ({ ...prev, [key]: value }));
  // };

  // // 저장 버튼 클릭 시 데이터 업데이트
  // const handleSave = () => {
  //   setAttList((prevList) =>
  //     prevList.map((row) =>
  //       row.id === editingRow.id ? { ...editingRow } : row
  //     )
  //   );
  //   setIsModalOpen(false);
  // };

  return (
    <>
      <Table
        autoHeight
        style={{ marginBottom: "24px" }}
        width={800}
        data={getSortedData()}
        cellBordered
        onSortColumn={(column, type) => {
          setSortColumn(column);
          setSortType(type);
        }}
        sortColumn={sortColumn}
        sortType={sortType}
        onRowClick={(rowData) => {
          console.log(rowData);
        }}
      >
        {/* <Column width={50} align="center" style={{ alignContent: "center" }}>
          <HeaderCell>
            <Checkbox checked={allChecked} onChange={handleSelectAll} />
          </HeaderCell>
          <Cell>
            {(_, rowIndex) => (
              <Checkbox
                checked={!!selectedRows[rowIndex]}
                onChange={() => handleRowSelect(rowIndex)}
              />
            )}
          </Cell>
        </Column> */}

        {/* 동적으로 컬럼 생성
      true && expression 형식 : 조건이 참이면 && 뒤의 요소가 출력됨*/}
        {columns &&
          columns.map((col) => (
            <Column key={col.dataKey} width={col.width} align="center" sortable>
              <HeaderCell>{col.label}</HeaderCell>
              <Cell dataKey={col.dataKey} />
            </Column>
          ))}

        {/* <Column width={50} align="center">
          <HeaderCell>
            <Checkbox />
          </HeaderCell>
          <Cell>
            {(_, rowIndex) => <Checkbox checked={!!selectedRows[rowIndex]} />}
          </Cell>
        </Column>

        {columns.map((col) => (
          <Column key={col.dataKey} width={col.width} align="center" sortable>
            <HeaderCell>{col.label}</HeaderCell>
            <Cell dataKey={col.dataKey}>
              {(rowData) => (
                <span className="col"
                  onClick={() => handleEdit(rowData)}
                >
                  {rowData[col.dataKey]}
                </span>
              )}
            </Cell>
          </Column>
        ))} */}
      </Table>

      {/* 수정 모달 */}
      {/* <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>데이터 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingRow &&
            columns.map((col) => (
              <div key={col.dataKey} style={{ marginBottom: 10 }}>
                <label>{col.label}</label>
                <Input
                  value={editingRow[col.dataKey] || ""}
                  onChange={(value) => handleChange(col.dataKey, value)}
                />
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave} appearance="primary">
            저장
          </Button>
          <Button onClick={() => setIsModalOpen(false)} appearance="subtle">
            취소
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default AttItemsTable;
