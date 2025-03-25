import React from 'react'
import { Table } from "rsuite";
import { Employee } from "../../../components/Employee";

const { Column, HeaderCell, Cell } = Table;
const data = Employee(); // 데이터 반환

export const CommuStatusList = (props) => {
  return(
    <div className="attItems">
      {/* ✅ 상단 바 정렬 */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <div
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}
        >
          출/퇴근 현황(사원)
        </div>
      </div>

    <Table
        autoHeight
        data={data}
      >

        <Column width={120} align="center">
          <HeaderCell>일자</HeaderCell>
          <Cell dataKey="e_regDate" />
        </Column>

        <Column width={100} align="center" fixed>
          <HeaderCell>사원명</HeaderCell>
          <Cell dataKey="e_name" />
        </Column>

        <Column width={200} align="center">
          <HeaderCell>출근시간</HeaderCell>
          <Cell dataKey="e_attTime" />
        </Column>

        <Column width={200} align="center">
          <HeaderCell>퇴근시간</HeaderCell>
          <Cell dataKey="e_leaveTime" />
        </Column>
      </Table>
    </div>
   );
 }