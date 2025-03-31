import React, { useEffect, useState } from "react";
import { Table } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

// 근태항목 테이블 컴포넌트
// url : 컴포넌트를 선언한 곳에서 지정한 url 주소를 받음
// columns : columns 를 props로 받아 동적으로 설정할 수 있도록 변경
const VacaItemsTable = ({ url, columns }) => {
  const [attList, setAttList] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortType, setSortType] = useState(null);

  useEffect(() => {
    // fetch("http://localhost:8081/erp/regAttItems", { method: "GET" })
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        console.log("데이터 수신: ", res); // 돌아갈때 마다 F12->console창에 찍힘
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
    <>
      <Table
        height={400}
        width={750}
        data={getSortedData()}
        cellBordered
        onSortColumn={(column, type) => {
          setSortColumn(column);
          setSortType(type);
        }}
        sortColumn={sortColumn}
        sortType={sortType}
      >
        {/* ✅ 동적으로 컬럼 생성
      true && expression 형식 : 조건이 참이면 && 뒤의 요소가 출력됨*/}
        {columns &&
        columns.map((col, index) => (
          <Column key={index} width={col.width} align="center" sortable>
            <HeaderCell>{col.label}</HeaderCell>
            <Cell dataKey={col.dataKey} />
          </Column>
        ))}
        {/* <Column width={100} align="center" sortable>
          <HeaderCell>휴가코드</HeaderCell>
          <Cell dataKey="v_code" />
        </Column>

        <Column width={150} align="center" sortable>
          <HeaderCell>휴가명</HeaderCell>
          <Cell dataKey="v_name" />
        </Column>

        <Column width={200} align="center" sortable>
          <HeaderCell>사용기간</HeaderCell>
          <Cell dataKey="v_periode" />
        </Column>

        <Column width={100} align="center" sortable>
          <HeaderCell>사용유무</HeaderCell>
          <Cell dataKey="v_use" />
        </Column>

        <Column width={200} align="center" sortable>
          <HeaderCell>비고</HeaderCell>
          <Cell dataKey="v_note" />
        </Column> */}
      </Table>
    </>
  );
};

export default VacaItemsTable;
