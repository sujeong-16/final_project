import "../css/att.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Modal, Table } from "rsuite";
// import { AttUpdateModal } from "./AttUpdateModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창
  const [editingRow, setEditingRow] = useState(null); // 수정 중인 행 데이터

  // 삭제 관련
  const propsParam = useParams();
  const a_code = propsParam.a_code;
  const navigate = useNavigate();

  // fetch(url)을 통해 데이터를 서버에서 가져와 attList에 저장
  useEffect(() => {
    // fetch("http://localhost:8081/main/regAttItems", { method: "GET" })
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

  // 편집 버튼 클릭 → 모달 열기
  const handleEdit = (rowData) => {
    setEditingRow({ ...rowData });
    setIsModalOpen(true);
  };

  // 입력값 변경
  const handleChange = (key, value) => {
    setEditingRow((prev) => ({ ...prev, [key]: value }));
  };

  // 저장 버튼 클릭 → 변경 사항 적용
  const handleSave = () => {
    setAttList((prevList) =>
      prevList.map((row) =>
        row.id === editingRow.id ? { ...editingRow } : row
      )
    );
    setIsModalOpen(false);
  };

  // 삭제
  const deleteAtt = () => {

    if (!a_code) {
      alert("삭제할 항목의 코드가 없습니다.");
      return;
    }

    fetch(`http://localhost:8081/main/deleteAttItems/${a_code}`, {
      method: "DELETE",
    })
      .then((res) => res.text()) // String 형은 .text() 로 받아야 한다.
      .then((res) => {
        if (res === "ok") {
          alert("삭제되었습니다.");
          navigate('/regVacaItems');   // true라면, 게시글 목록으로 이동
        } else {
          alert("삭제에 실패했습니다.");
        }
      })
      .catch((error) => console.error("삭제 중 오류 발생:", error));
  };

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
        {/* 동적으로 컬럼 생성
      true && expression 형식 : 조건이 참이면 && 뒤의 요소가 출력됨*/}
        {columns &&
          columns.map((col) => (
            <Column key={col.dataKey} width={col.width} align="center" sortable>
              <HeaderCell>{col.label}</HeaderCell>
              <Cell dataKey={col.dataKey} />
            </Column>
          ))}
        {/* 버튼 컬럼 추가 */}
        <Column width={100} align="center">
          <HeaderCell>작업</HeaderCell>
          <Cell>
            {(rowData) => (
              <>
                <Button
                  size="xs"
                  appearance="primary"
                  onClick={() => handleEdit(rowData)}
                >
                  수정
                </Button>
                <Button
                  size="xs"
                  appearance="ghost"
                  color="red"
                  onClick={() => deleteAtt(rowData.a_code)}  // 클릭할 때 해당 a_code 전달
                >
                  삭제
                </Button>
              </>
            )}
          </Cell>
        </Column>
      </Table>

      {/* <AttUpdateModal /> */}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
      </Modal>
    </>
  );
};

export default AttItemsTable;
