import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "rsuite";
import { useNavigate } from "react-router-dom";

const AttModal = ({ open, onClose }) => {
  // handleClose → onClose 변경

  const navigate = useNavigate();

  // 값 보관
  const [att, setAtt] = useState({
    a_code: "",
    a_name: "",
    a_type: "",
    a_use: "",
    a_note: "",
  });

  const changeValue = (name, value) => {
    setAtt((prevAtt) => ({
      ...prevAtt,
      [name]: value, // `name`을 직접 지정
    }));
  };

  const submitAtt = (e) => {
    // (e) = (event)
    e.preventDefault(); // submit이 action 을 안타고 자기 할 일을 그만 두도록
    fetch("http://localhost:8081/erp/addAttItems", {
      // insert는 method:'POST'
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(att), // javascript 오브젝트를 json 으로 변경해서 넘긴다. 저장한 데이터를 스프링부트에서 insert 하고 201(create-생성)을 리턴한다.
    })
      // 결과를 돌려받는 곳
      .then((res) => {
        console.log("응답: ", res);

        if (res.status === 201) return res.json(); // 정상(201)이면 return true
        else return null;
      })
      .then((res) => {
        // catch는 여기서 오류가 발생해야 실행된다.
        console.log("정상임~!", res);
        alert("등록이 완료되었습니다.");

        // 성공적으로 등록된 후 다른 페이지로 네비게이션
        if(res !== null) navigate('/regAttItems');
        onClose();
        window.location.reload();   // 화면을 강제로 새로고침
      })
      // 예외처리
      .catch((error) => {
        console.error("오류 발생:", error);
        alert("글 작성 실패"); // 오류 발생 시 알림 표시
      });

    console.log("보내는 데이터:", JSON.stringify(att));
  };

  const [attOpen, setAttOpen] = useState(false); // 중복확인
  const attIdCheck = () => setAttOpen(true);
  const attClose = () => setAttOpen(false);

  return (
    <>
      {/* 부모에서 받은 open 값으로 모달 상태 관리 */}
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <Modal.Title>근태항목등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ marginBottom: "10px" }}>근태항목등록</h6>
          <Form>
            <Form.Group
              controlId="a_code"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Form.ControlLabel style={{ marginTop: "3px" }}>
                근태코드
              </Form.ControlLabel>
              <Form.Control
                type="text"
                name="a_code"
                value={att.a_code}
                onChange={(value) => changeValue("a_code", value)}
              />
              <Button onClick={attIdCheck}>중복확인</Button>
            </Form.Group>

            <Form.Group
              controlId="a_name"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Form.ControlLabel style={{ marginTop: "3px" }}>
                근태명
              </Form.ControlLabel>
              <Form.Control
                type="text"
                name="a_name"
                value={att.a_name}
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
              <Form.Control
                type="text"
                name="a_type"
                value={att.a_type}
                onChange={(value) => changeValue("a_type", value)}
              />
            </Form.Group>

            <Form.Group
              controlId="a_note"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Form.ControlLabel style={{ marginTop: "3px" }}>
                비고
              </Form.ControlLabel>
              <Form.Control
                type="text"
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
