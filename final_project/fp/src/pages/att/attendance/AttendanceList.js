import React from "react";
import attAddBtn from "../../../components/attAddBtn.png";

export const AttendanceList = (props) => {
  return (
    <div className="attItems">
      {/* ✅ 상단 바 정렬 */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <div
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}
        >
          근태현황
        </div>
      </div>

      <div>
        <img src={attAddBtn} alt="근태추가" width={700}/>
      </div>
    </div>
  );
};
