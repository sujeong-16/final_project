import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Radio, RadioGroup, Schema } from "rsuite";
import { useNavigate } from "react-router-dom";

// 필수 입력 필드에 대한 유효성 검사
const { StringType } = Schema.Types;
const model = Schema.Model({
  a_code: StringType().isRequired("근태코드를 입력해주세요"),
  a_name: StringType().isRequired("근태명을 입력해주세요"),
});

const AttModal = ({ open, onClose }) => {
  // 유효성 에러
  const [formError, setFormError] = useState({});

  const navigate = useNavigate();

  // 값 보관
  const [att, setAtt] = useState({
    a_code: "",
    a_name: "",
    a_type: "기본", // 초기값 설정
    a_use: "",
    a_note: "",
  });

  const changeValue = (name, value) => {
    setAtt((prevAtt) => ({
      ...prevAtt,
      [name]: value, // `name`을 직접 지정
    }));
  };

  // 라디오버튼 핸들러
  const handleTypeChange = (value) => {
    changeValue("a_type", value);
  };

  const submitAtt = (obj) => {
    // e. =>
      console.log(obj);

    const checkResult = model.check(att);
    if (!checkResult.hasError) {    // 에러가 아니라면
      fetch("http://localhost:8081/main/addAttItems", {
        method: "POST", // insert는 method:'POST'
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(att), // javascript 오브젝트를 json 으로 변경해서 넘긴다. 저장한 데이터를 스프링부트에서 insert 하고 201(create-생성)을 리턴한다.
      })  // 결과를 돌려받는 곳
      .then((res) => (res.status === 201 ? res.json() : null))  // 정상(201)이면 return true
      .then((res) => {
        if(res !== null) {
          alert("등록되었습니다");
          navigate("/regAttItems"); // 성공적으로 등록된 후 다른 페이지로 네비게이션
          onClose();
          window.location.reload(); // 새로 작성한 내용이 화면에 뜨도록, 화면을 강제로 새로고침.
          // useEffect => 자동으로 새로고침할 수 있음 바꿔야될듯
        }
      })
      .catch((error) => {   // 예외처리
        console.error("오류 발생:", error);
        alert("등록에 실패했습니다"); // 오류 발생 시 알림 표시
      });
      // console.log("보내는 데이터:", JSON.stringify(att));
    } else { setFormError(checkResult); }
  };

  const [attOpen, setAttOpen] = useState(false); // 중복확인
  // const attIdCheck = () => setAttOpen(true);
  const attClose = () => setAttOpen(false);

  useEffect(() => {
    console.log("돌아감?");
  }, [att]);

  return (
    <>
      {/* 부모에서 받은 open 값으로 모달 상태 관리 */}
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <Modal.Title>근태항목등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ marginBottom: "10px" }}>근태항목등록</h6>
          <Form onChange={setAtt} formValue={att}>
            <Form.Group
              controlId="a_code"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Form.ControlLabel style={{ marginTop: "3px" }}>
                근태코드
              </Form.ControlLabel>
              <Form.Control
                name="a_code"
                value={att.a_code}
                errorMessage={formError.a_code}
                onChange={(value) => changeValue("a_code", value)}
              />
              {/* <Button onClick={attIdCheck}>중복확인</Button> */}
            </Form.Group>

            <Form.Group
              controlId="a_name"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Form.ControlLabel style={{ marginTop: "3px" }}>
                근태명
              </Form.ControlLabel>
              <Form.Control
                name="a_name"
                value={att.a_name}
                errorMessage={formError.a_code}
                onChange={(value) => changeValue("a_name", value)}
              />
            </Form.Group>

            <Form.Group
              controlId="a_type"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Form.ControlLabel style={{ marginTop: "3px" }}>
                근태유형
              </Form.ControlLabel>
              {/* <Form.Control
                type="text"
                name="a_type"
                value={att.a_type}
                onChange={(value) => changeValue("a_type", value)}
              > */}
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
              {/* </Form.Control> */}
            </Form.Group>

            <Form.Group
              controlId="a_note"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Form.ControlLabel style={{ marginTop: "3px" }}>
                비고
              </Form.ControlLabel>
              <Form.Control
                name="a_note"
                value={att.a_note}
                onChange={(value) => changeValue("a_note", value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose} appearance="subtle">
            닫기
          </Button>
          <Button appearance="primary" onClick={submitAtt}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 중복확인 모달 */}
      <Modal open={attOpen} onClose={attClose}>
        <Modal.Header>
          <Modal.Title>중복확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>사용가능한 아이디입니다.</Modal.Body>
        <Modal.Footer>
          <Button onClick={attClose} appearance="primary">
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AttModal;
