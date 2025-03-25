import React from "react";
import { Table } from "rsuite";
import { EmployeeLate } from "../../../components/EmployeeLate";

const { Column, HeaderCell, Cell } = Table;
const data = EmployeeLate(); // 데이터 반환

export const CommuLateList = (props) => {
  return (
    <div className="attItems">
      {/* ✅ 상단 바 정렬 */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <div
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}
        >
          지각현황(사원)
        </div>
      </div>

      <Table autoHeight data={data}>
        <Column width={100}>
          <HeaderCell>일자</HeaderCell>
          <Cell dataKey="e_regDate_late" />
        </Column>

        <Column width={80} fixed>
          <HeaderCell>사원명</HeaderCell>
          <Cell dataKey="e_name_late" />
        </Column>

        <Column width={200} align="center">
          <HeaderCell>출근시간</HeaderCell>
          <Cell dataKey="e_attTime" />
        </Column>

        <Column width={200} align="center">
          <HeaderCell>출근시간입력</HeaderCell>
          <Cell dataKey="e_attTime_late" />
        </Column>

        <Column width={100} align="center">
          <HeaderCell>출근적요</HeaderCell>
          <Cell dataKey="e_attTime_why" />
        </Column>
      </Table>
    </div>
  );
};
