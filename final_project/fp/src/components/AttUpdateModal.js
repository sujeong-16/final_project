// import React, { useState } from 'react'
// import { Button, Input, Modal, Table } from "rsuite";

export const AttUpdateModal = ({columns}) => {

//   const [isModalOpen, setIsModalOpen] = useState(false);  // 모달창
//   const [editingRow, setEditingRow] = useState(null); // 수정 중인 행 데이터


  return(
    <>
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
   )

 }