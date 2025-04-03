import React, { useState, forwardRef } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  SelectPicker,
  Radio,
  RadioGroup,
  Schema,
} from "rsuite";
import { useNavigate } from "react-router-dom";

// 선택상자 데이터
const selectData = ["근태코드", "근태명", "근태유형", "사용유무", "비고"].map(
  (item) => ({ label: item, value: item })
);

const Textarea = forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

// 유효성 검사 모델
const { StringType } = Schema.Types;
const model = Schema.Model({
  a_code: StringType().isRequired("근태코드를 입력해주세요"),
  a_name: StringType().isRequired("근태명을 입력해주세요"),
});

const AttModal = ({ open, onClose }) => {
  const [formError, setFormError] = useState({});
  const navigate = useNavigate();

  const [att, setAtt] = useState({
    a_code: 0,
    a_name: "",
    a_type: "기본",
    a_use: "",
    a_note: "",
  });

  const changeValue = (name, value) => {
    setAtt((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value) => {
    changeValue("a_type", value);
  };

  const submitAtt = () => {
    const checkResult = model.check(att);
    if (!checkResult.hasError) {
      fetch("http://localhost:8081/main/addAttItems", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(att),
      })
        .then((res) => (res.status === 201 ? res.json() : null))
        .then((res) => {
          if (res) {
            alert("등록되었습니다");
            navigate("/regAttItems");
            onClose();
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("오류 발생:", error);
          alert("등록에 실패했습니다");
        });
    } else {
      setFormError(checkResult);
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="xs">
      <Modal.Header>
        <Modal.Title>근태항목등록</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid onChange={setAtt} formValue={att} model={model}>
          <Form.Group controlId="a_code">
            <Form.ControlLabel>근태코드</Form.ControlLabel>
            <Form.Control
              name="a_code"
              errorMessage={formError.a_code}
              onChange={(value) => changeValue("a_code", value)}
            />
          </Form.Group>
          <Form.Group controlId="a_name">
            <Form.ControlLabel>근태명</Form.ControlLabel>
            <Form.Control
              name="a_name"
              errorMessage={formError.a_name}
              onChange={(value) => changeValue("a_name", value)}
            />
          </Form.Group>
          <Form.Group controlId="a_type">
            <Form.ControlLabel>근태유형</Form.ControlLabel>
            <RadioGroup
              inline
              name="a_type"
              value={att.a_type}
              onChange={handleTypeChange}
            >
              <Radio value="기본">기본</Radio>
              <Radio value="휴가">휴가</Radio>
              <Radio value="출/퇴근">출/퇴근</Radio>
            </RadioGroup>
          </Form.Group>
          <Form.Group controlId="a_note">
            <Form.ControlLabel>비고</Form.ControlLabel>
            <Form.Control
              name="a_note"
              accepter={Textarea}
              onChange={(value) => changeValue("a_note", value)}
            />
          </Form.Group>
          <Form.Group controlId="select">
            <Form.ControlLabel>추가 옵션</Form.ControlLabel>
            <Form.Control
              name="select"
              data={selectData}
              accepter={SelectPicker}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="subtle" onClick={onClose}>
          닫기
        </Button>
        <Button appearance="primary" onClick={submitAtt}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttModal;
