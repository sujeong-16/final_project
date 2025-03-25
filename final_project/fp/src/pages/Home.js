import "rsuite/dist/rsuite.min.css";

import "rsuite/Container/styles/index.css";
import "rsuite/Header/styles/index.css";
import "rsuite/Content/styles/index.css";
import "rsuite/Footer/styles/index.css";
import "rsuite/Sidebar/styles/index.css";
import "rsuite/Drawer/styles/index.css";

import React, { useState } from "react";
import {
  Container,
  Header,
  Footer,
  Sidebar,
  Sidenav,
  Nav,
  HStack,
  Text,
  Navbar,
  Content,
  Stack,
  IconButton,
  Drawer,
  Button,
  Placeholder,
  Input,
} from "rsuite";

import HistoryTaskIcon from "@rsuite/icons/HistoryTask";

import TreemapIcon from "@rsuite/icons/Treemap";
import PeopleBranchIcon from "@rsuite/icons/PeopleBranch";
import SiteSettingIcon from "@rsuite/icons/SiteSetting";
import GearIcon from "@rsuite/icons/Gear";

import ArrowLeftLineIcon from "@rsuite/icons/ArrowLeftLine";
import ArrowRightLineIcon from "@rsuite/icons/ArrowRightLine";
import Icon from "@rsuite/icons/esm/Icon";

import SiteIcon from "@rsuite/icons/Site";
import PeopleRuleIcon from "@rsuite/icons/PeopleRule";
import HelpOutlineIcon from "@rsuite/icons/HelpOutline";
import { Link, Route, Routes } from "react-router-dom";

import "../css/Header.css";
import { RegAttItems } from "./att/basic_item/RegAttItems";
import { RegVacaItems } from "./att/basic_item/RegVacaItems";
import { ByEmployee } from "./att/basic_item/ByEmployee";
import { Attendance } from "./att/attendance/Attendance";
import { AttendanceList } from "./att/attendance/AttendanceList";

import { CommuStatus } from "./att/commute/CommuStatus";
import { CommuStatusList } from "./att/commute/CommuStatusList";
import { CommuRecords } from "./att/commute/CommuRecords";
import { CommuLate } from "./att/commute/CommuLate";
import { CommuLateList } from "./att/commute/CommuLateList";
import { CommuAttStatus } from "./att/commute/CommuAttStatus";
import { CommuAttStatusList } from "./att/commute/CommuAttStatusList";

const Home = () => {
  const [open, setOpen] = React.useState(false); // open 초기값을 false로 설정
  const [placement, setPlacement] = React.useState(); // 상담 드로어 위치 지정

  const handleOpen = (key) => {
    setOpen(true);
    setPlacement(key);
  };

  // 사이드바를 확장/축소 관리
  const [expand, setExpand] = useState(true);

  return (
    <Container>
      <Sidebar
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        width={expand ? 260 : 56} // expand 가 T면 넓게, F면 좁게 설정
        collapsible // 접을 수 있는 기능 활성화
      >
        <Sidenav.Header>
          <Brand expand={expand} />
        </Sidenav.Header>
        <Sidenav expanded={expand} defaultOpenKeys={["3"]} appearance="subtle">
          {/* defaultOpenKeys={["3"]} => 기본적으로 3번째 키를 열어두겠다는 뜻 */}
          <Sidenav.Body>
            {/* 
              Nav => 상단 네비게이션 바
              Nav.Item => 일반 버튼(클릭하면 페이지 이동)
              Nav.Menu => 드롭다운 형태의 메뉴(하위 메뉴 포함 가능)
            */}
            <Nav defaultActiveKey="1">
              <Nav.Item eventKey="100" icon={<Icon as={TreemapIcon} />}>
                대시보드
              </Nav.Item>
              <Nav.Item eventKey="200" icon={<Icon as={PeopleBranchIcon} />}>
                부서연결
              </Nav.Item>
              <Nav.Menu
                eventKey="300"
                trigger="hover"
                title="기초등록"
                icon={<Icon as={SiteSettingIcon} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="310">기초등록</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                eventKey="400"
                trigger="hover"
                title="판매관리"
                icon={<Icon as={SiteSettingIcon} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="410">판매관리</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                eventKey="500"
                trigger="hover"
                title="구매관리"
                icon={<Icon as={SiteSettingIcon} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="510" href="/purchaseList">
                  구매조회
                </Nav.Item>
                <Nav.Item eventKey="520" href="/InsertPurchase">
                  구매입력
                </Nav.Item>
                <Nav.Item eventKey="530" href="/StatusPurchase">
                  구매현황
                </Nav.Item>
                <Nav.Item eventKey="540" href="/OrderManagement">
                  발주서 관리
                </Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                eventKey="600"
                trigger="hover"
                title="물류관리"
                icon={<Icon as={SiteSettingIcon} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="610">물류관리</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                eventKey="700"
                trigger="hover"
                title="회계관리"
                icon={<Icon as={SiteSettingIcon} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="710">회계관리</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                eventKey="800"
                // trigger="hover"
                title="인사관리"
                icon={<Icon as={SiteSettingIcon} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="810">인사관리</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                eventKey="900"
                // trigger="click"
                title="근태"
                icon={<Icon as={SiteSettingIcon} />}
                placement="rightStart"
              >
                <Nav.Menu
                  eventKey="910"
                  trigger="hover"
                  title="기본사항등록"
                  placement="rightStart"
                >
                  <Nav.Item
                    eventKey="911"
                    className="dot"
                    as={Link}
                    to="/regAttItems"
                  >
                    근태항목등록
                  </Nav.Item>
                  <Nav.Item
                    eventKey="912"
                    className="dot"
                    as={Link}
                    to="/regVacaItems"
                  >
                    휴가항목등록
                  </Nav.Item>
                  <Nav.Item
                    eventKey="913"
                    className="dot"
                    as={Link}
                    to="/byEmp"
                  >
                    사원별휴가일수조회
                  </Nav.Item>
                </Nav.Menu>
                <Nav.Menu
                  eventKey="920"
                  trigger="hover"
                  title="근태"
                  placement="rightStart"
                >
                  <Nav.Item eventKey="921" className="dot" as={Link} to="/att">
                    근태관리
                  </Nav.Item>
                  <Nav.Item eventKey="922" className="dot" as={Link} to="/attList">
                    근태현황
                  </Nav.Item>
                </Nav.Menu>
                <Nav.Menu
                  eventKey="930"
                  trigger="hover"
                  title="출/퇴근(사원)"
                  placement="rightStart"
                >
                  <Nav.Item
                    eventKey="931"
                    className="dot"
                    as={Link}
                    to="/commuRecords"
                  >
                    출/퇴근기록부(사원)
                  </Nav.Item>
                  <Nav.Item
                    eventKey="932"
                    className="dot"
                    as={Link}
                    to="/commuStatus"
                  >
                    출/퇴근현황(사원)
                  </Nav.Item>
                  <Nav.Item
                    eventKey="933"
                    className="dot"
                    as={Link}
                    to="/commuLate"
                  >
                    지각현황(사원)
                  </Nav.Item>
                  <Nav.Item
                    eventKey="934"
                    className="dot"
                    as={Link}
                    to="/commuAttStatus"
                  >
                    출퇴근/근태현황(사원)
                  </Nav.Item>
                </Nav.Menu>
              </Nav.Menu>

              <Nav.Menu
                eventKey="1000"
                trigger="hover"
                title="설정"
                icon={<Icon as={GearIcon} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="1010">로그인</Nav.Item>
                <Nav.Item eventKey="1020">로그아웃</Nav.Item>
                <Nav.Item eventKey="1030">Channels</Nav.Item>
                <Nav.Item eventKey="1040">Tags</Nav.Item>
                <Nav.Item eventKey="1050">Versions</Nav.Item>
              </Nav.Menu>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </Sidebar>
      <Container>
        <Header>
          <Navbar appearance="inverse" className="hd">
            <Nav>
              <Nav.Item as={Link} to="/home" icon={<Icon as={SiteIcon} />}>
                Home
              </Nav.Item>
              <Nav.Menu title="구매관리">
                <Nav.Item href="/purchaseList">구매조회</Nav.Item>
                <Nav.Item href="/InsertPurchase">구매입력</Nav.Item>
                <Nav.Item href="/StatusPurchase">구매현황</Nav.Item>
                <Nav.Item href="/OrderManagement">발주서 관리</Nav.Item>
              </Nav.Menu>
              <Nav.Menu icon={<Icon as={PeopleRuleIcon} />} title="HR">
                <Nav.Item>인사관리</Nav.Item>
                <Nav.Item as={Link} to="/att">
                  근태
                </Nav.Item>
              </Nav.Menu>
              <Nav.Item>News</Nav.Item>
              <Nav.Item>Products</Nav.Item>
              <Nav.Menu icon={<Icon as={HelpOutlineIcon} />} title="문의">
                <Nav.Item>Company</Nav.Item>
                <Nav.Item>Team</Nav.Item>
                <Nav.Item onClick={() => handleOpen("right")}>
                  상담하기
                </Nav.Item>
              </Nav.Menu>
            </Nav>
            <Nav pullRight>
              <Nav.Item icon={<Icon as={GearIcon} />}>설정</Nav.Item>
            </Nav>
          </Navbar>
          {/* <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="##">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>Overview</Breadcrumb.Item>
          </Breadcrumb> */}
        </Header>
        <Content>
          {/* 페이지 라우팅 처리 */}
          <Routes>
            <Route path="/home" /> {/* 메인화면 */}
            {/* 근태 */}
            <Route path="/regAttItems" element={<RegAttItems />} />{" "}
            {/* 기본-근태항목등록 */}
            <Route path="/regVacaItems" element={<RegVacaItems />} />{" "}
            {/* 기본-휴가항목등록 */}
            <Route path="/byEmp" element={<ByEmployee />} />{" "}
            {/* 기본-사원별휴가일수조회 */}
            <Route path="/att" element={<Attendance />} /> {/* 근태-근태관리 */}
            <Route path="/attList" element={<AttendanceList />} />{" "}
            {/* 근태-근태현황 */}
            <Route path="/commuStatus" element={<CommuStatus />} />{" "}
            {/* 출퇴근-출퇴근현황 */}
            <Route path="/commuStatusList" element={<CommuStatusList />} />{" "}
            {/* 출퇴근-출퇴근현황 리스트 */}
            <Route path="/commuRecords" element={<CommuRecords />} />{" "}
            {/* 출퇴근-출퇴근기록부 */}
            <Route path="/commuRecords" element={<CommuRecords />} />{" "}
            {/* 출퇴근-출퇴근기록부 리스트 */}
            <Route path="/commuLate" element={<CommuLate />} />{" "}
            {/* 출퇴근-지각현황 */}
            <Route path="/commuLateList" element={<CommuLateList />} />{" "}
            {/* 출퇴근-지각현황 리스트 */}
            <Route path="/commuAttStatus" element={<CommuAttStatus />} />{" "}
            {/* 출퇴근-출퇴근/근태현황 */}
            <Route
              path="/commuAttStatusList"
              element={<CommuAttStatusList />}
            />{" "}
            {/* 출퇴근-출퇴근/근태현황 리스트 */}
          </Routes>
        </Content>

        <Footer></Footer>
      </Container>
      {/*
	  	Drawer => 우측에서 나오는 패널
		open={open} => open 상태가 t면 열림
		placement={"right"} => 오른쪽에서 나타남
	  */}
      <Drawer
        size="md"
        style={{ height: "calc(42% + 120px)" }}
        placement={placement}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Chatbot 상담</Drawer.Title>
          <Drawer.Actions></Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Placeholder.Paragraph rows={8} />
          <Drawer.Actions>
            <HStack spacing={32}>
              <Input placeholder="상담을 시작하세요..."></Input>
              <Button onClick={() => setOpen(false)} appearance="primary">
                Confirm
              </Button>
            </HStack>
          </Drawer.Actions>
        </Drawer.Body>
      </Drawer>
    </Container>
  );
};

const NavToggle = ({ expand, onChange }) => {
  // 사이드바를 접었다 폈다 할 수 있는 버튼
  return (
    <Stack
      className="nav-toggle"
      justifyContent={expand ? "flex-end" : "center"}
    >
      <IconButton
        onClick={onChange}
        appearance="subtle"
        size="lg"
        icon={expand ? <ArrowLeftLineIcon /> : <ArrowRightLineIcon />}
      />
    </Stack>
  );
};

const Brand = ({ expand }) => {
  return (
    <HStack
      style={{ margin: 8 }}
      className="page-brand"
      justifyContent={"center"}
      spacing={12}
    >
      <HistoryTaskIcon width={28} height={28} />
      {expand && <Text size={24}>ERP닷</Text>}
    </HStack>
  );
};

export default Home;
