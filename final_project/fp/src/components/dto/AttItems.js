import React, { useEffect, useState } from "react";
import { Table } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

// 컴포넌트에서 공유할 전역 객체. 멤버변수 선언...이라고 보면 될 거 같음
const _attItems = {
  a_code: null,
  a_name: null,
  a_type: null,
  a_use: null,
  a_note: null,
};

// 근태항목 테이블 컴포넌트
// const AttItemsTable = ({ a_code, a_name, a_type, a_use, a_note }) => {

//   /* 이렇게 연결지어야지만, 컴포넌트안에서만 쓰겠다고 연결을 짓습니다. */
//   // { 여기s } => 여기s 라는 props를 받음.
//   const self = _attItems; // this 대용으로 self 사용함.

//   // 컴포넌트의 멤버변수처럼 연결 : 매개변수 생성자처럼
//   self.a_code = a_code;
//   self.a_name = a_name;
//   self.a_type = a_type;
//   self.a_use = a_use;
//   self.a_note = a_note;
const AttItemsTable = ({ url }) => {
  // 근태등록 리스트 변수와 setter
  const [attList, setAttList] = useState([]);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortType, setSortType] = useState(null);

  useEffect(() => {
    // fetch("http://localhost:8081/erp/regAttItems", { method: "GET" })
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        console.log("데이터 수신: ", res);
        setAttList(res);
      })
      .catch((error) => console.error("데이터를 불러오지 못했습니다:", error));
  }, [url]);
  // [url] : url이 변경될 때마다 fetch 실행

  // 정렬 함수
  const getSortedData = () => {
    if (!sortColumn || !sortType) return attList;

    return [...attList].sort((a, b) => {
      let x = a[sortColumn];
      let y = b[sortColumn];

      if (typeof x === "string") x = x.toLowerCase();
      if (typeof y === "string") y = y.toLowerCase();

      if (sortType === "asc") return x > y ? 1 : -1;
      if (sortType === "desc") return x < y ? 1 : -1;
      return 0;
    });
  };

  return (
    <Table
      height={400}
      width={700}
      data={getSortedData()}
      cellBordered
      onSortColumn={(column, type) => {
        setSortColumn(column);
        setSortType(type);
      }}
      sortColumn={sortColumn}
      sortType={sortType}
    >
      <Column width={30} align="center" sortable>
        <HeaderCell></HeaderCell>
        <Cell dataKey="" />
      </Column>
      
      <Column width={100} align="center" sortable>
        <HeaderCell>근태코드</HeaderCell>
        <Cell dataKey="a_code" />
      </Column>

      <Column width={150} align="center" sortable>
        <HeaderCell>근태명</HeaderCell>
        <Cell dataKey="a_name" />
      </Column>

      <Column width={120} align="center" sortable>
        <HeaderCell>근태유형</HeaderCell>
        <Cell dataKey="a_type" />
      </Column>

      <Column width={100} align="center" sortable>
        <HeaderCell>사용유무</HeaderCell>
        <Cell dataKey="a_use" />
      </Column>

      <Column width={200} align="center" sortable>
        <HeaderCell>비고</HeaderCell>
        <Cell dataKey="a_note" />
      </Column>
    </Table>
  );
};

// 변수에 값이 없을 경우 기본값 설정
AttItemsTable.defaultProps = {
  // 에러 : Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead. Error Component Stack
  // React 사이트에선 사용하고 있어서, 일단 무시하고 사용 go
  a_code: "근태코드",
  a_name: "근태명",
  a_type: "근태유형",
  a_use: "사용유무",
  a_note: "비고",
};

// - 컴포넌트 및 변수 내보내기. 외부에서 import하여 공유가능하다.   ex) import { _attItems } from "./../components/dto/AttItems"
export { _attItems /* AttItems 에서 사용중인 변수 */ }; // 주석처리하면, 다른곳(import)에서 접근을 할 수 없다.
export default AttItemsTable;
