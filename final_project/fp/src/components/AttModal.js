import React, { forwardRef } from "react";
import { Button, Form, Input, Modal, SelectPicker } from "rsuite";

/* 선택상자 데이터 */
const selectData = ["근태코드", "근태명", "근태유형", "Nancy", "Lloyd", "Alice"].map(
	(item) => ({ // 이렇게 하면, 둘다 같게 들어가서, 라벨따로 값따로 안넣어줘도 됩니다.
		label: item, // Eugenia
		value: item, // Eugenia
	})
);

const Textarea = forwardRef((props, ref) => (
	<Input {...props} as="textarea" ref={ref} />
));

const _attModal = { // ModalForm's 이용중인 변수 : 멤버변수처럼 이용중
	title: null,
	show: null, // useState[ state, stateSetter ] = show[0], show[1]
	buttons: {
		confirm: null,
		cancel: null,
	},
	getHandle: null,
	getFormData: null
};

/**
 * 모달에 Form양식이 들어간 컴포넌트(Component)입니다.
 *
 * @param {*} title 모달 제목
 * @param {*} confirm 확인 버튼 이름
 * @param {*} cancel 취소 버튼 이름
 */
const AttModal = ({ title, confirm, cancel } /* = props:속성 */) => {
	/* 이렇게 연결지어야지만, ModalForm안에서만 쓰겠다고 연결을 짓습니다. */
	const self = _attModal; // this라는 이름을 쓸수 없어서, self로 지음.
	/* 그래서, 왠만해서는 self.으로 변수를 다뤄주시는게 좋습니다. */

	/* ModalForm의 멤버변수처럼 연결 : 매개변수 생성자처럼 */
	self.title = title;
	self.buttons.confirm = confirm;
	self.buttons.cancel = cancel;
	const buttons = self.buttons;

	/*
	 *	Hook영역 : useState, useNavigate, useLocation...
	 */
	const show = React.useState(true);
	self.show = show;

	const handleOpen = () => show[1](true);
	const handleClose = () => show[1](false);
	self.getHandle = () => {
		return { open: handleOpen, close: handleClose };
	};

	const handler = self.getHandle();

	const [ formData, setFormData ] = React.useState({
		name: "",
		email: "",
		password: "",
		textarea: "",
	});
	self.getFormData = () => { return formData };

	/*
	 *	Hook영역 : useEffect(이걸 쓰는순간, 직접만든 훅이라고 React에서 말합니다.)
	 */


	return (
		<Modal open={self.show[0]} onClose={handler.close} size="xs">
			<Modal.Header>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form fluid onChange={setFormData} formValue={self.getFormData()}>
					<Form.Group controlId="name-9">
						<Form.ControlLabel>Username</Form.ControlLabel>
						<Form.Control name="name" />
						<Form.HelpText>Required</Form.HelpText>
					</Form.Group>
					<Form.Group controlId="email-9">
						<Form.ControlLabel>Email</Form.ControlLabel>
						<Form.Control name="email" type="email" />
						<Form.HelpText>Required</Form.HelpText>
					</Form.Group>
					<Form.Group controlId="password-9">
						<Form.ControlLabel>Password</Form.ControlLabel>
						<Form.Control
							name="password"
							type="password"
							autoComplete="off"
						/>
					</Form.Group>
					<Form.Group controlId="textarea-9">
						<Form.ControlLabel>Textarea</Form.ControlLabel>
						<Form.Control
							rows={5}
							name="textarea"
							accepter={Textarea}
						/>
					</Form.Group>
					<Form.Group controlId="select-10">
						<Form.ControlLabel>SelectPicker</Form.ControlLabel>
						<Form.Control
							name="select"
							data={selectData}
							accepter={SelectPicker}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button /* href="/" */ onClick={handler.close /* 다른 이벤트를 넣어도 됩니다. */} appearance="primary">
					{buttons.confirm}
				</Button>
				<Button onClick={handler.close} appearance="subtle">
					{buttons.cancel}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

AttModal.defaultProps = {
	// props가 설정이 안되어있으면, 기본(default)으로 들어갑니다.
    a_code: 30000,
    a_name: "근태명",
    a_type: "근태 유형", // 초기값 설정
    a_use: "근태 사용 여부",
    a_note: "비고",
};

// 이렇게 해놓으면, 다른곳에서 불러올수있습니다. ex) import { _modalForm } from "./../components/ModalForm"
export { _attModal /* ModalForm에서 사용중인 변수 */ }; // 주석처리하면, 다른곳에서 접근을 할수 없습니다.
export default AttModal;
