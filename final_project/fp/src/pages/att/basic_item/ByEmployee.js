import React from "react";
import { Button, Checkbox, Table } from "rsuite";
import "../../../css/att.css";
import { VacaItem } from "../../../components/VacaItem";

const { Column, HeaderCell, Cell } = Table;
const data = VacaItem(); // 데이터 반환

export const ByEmployee = () => {

  // 테이블
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);

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
          사원별휴가일수조회
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

        <Column width={110} align="center" sortable>
          <HeaderCell>등록인원수</HeaderCell>
          <Cell dataKey="vacaNumber" />
        </Column>
      </Table>

      <Button variant="primary" className="addBtn">
        선택삭제
      </Button>
    </div>
  );
};
