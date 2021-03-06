import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { OwnerContext } from "./common/context/Context";
import User from "./user/User";
import Educations from "./mvp/education/Educations";
import Certificates from "./mvp/certificate/Certificates";
import Awards from "./mvp/award/Awards";
import Career from "./mvp/career/Careers";
import TechStacks from "./mvp/techstack/TechStacks";
import NavBar from "./nav/NavBar";
import { UserContext } from "./common/context/UserContext";
import Projects from "./mvp/project/Projects";
import Comment from "./comment/Comments";
import * as Api from "../api";
import UserDelete from "./user/UserDelete";
import Empty from "./nav/Empty";
import NoneClick from "./nav/NoneClick";

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const { userState } = useContext(UserContext);
  const [userContext, setUserContext] = useState({});

  ///@ for showing 방금 누르신 항목을 한 번 더 클릭 하거나 전체보기를 눌려주세요!
  let count = 0;
  let count2 = 0;

  const newAr = [];
  const [navList, setNavList] = useState(newAr);

  ///@ toggle between showing components which have true state and showing only one component when navBar button is clicked(not the add or del button on the right side.)
  const [togglePage, setTogglePage] = useState(true);

  const fetchPorfolioOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get("users", ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
    let fromBack = res.data.user_mvp;
    // 컴포넌트 배열(NavBar)
    const compo = [
      { compo: <Educations />, show: false },
      { compo: <Awards />, show: false },
      { compo: <Projects />, show: false },
      { compo: <Certificates />, show: false },
      { compo: <Career />, show: false },
      { compo: <TechStacks />, show: false },
    ];
    // compo 배열과 res.data.user_mvp를 합쳐서 navBar의 상태로 쓸 수 있게 만듦
    for (let i = 0; i < compo.length; i++) {
      newAr.push({ ...compo[i], ...fromBack[i] });
    }
    setNavList(newAr);
    // portfolioOwner을 해당 사용자 정보로 세팅함.
    setUserContext((prev) => ({
      ...prev,
      isEditable: ownerData.id === userState.user?.id,
      portfolioOwnerId: ownerData.id,
      user_id: userState.user?.id,
    }));
    // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/", { replace: true });
      return;
    }

    if (params.userId) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user.id;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <OwnerContext.Provider value={userContext}>
      {userContext.isEditable ? (
        <Container fluid className="mb-5">
          <Row>
            {/* 마진값 높이 맞추기 위해 임시적으로 설정 */}
            <Col xl="3" style={{ marginTop: 54 }}>
              <User />
              <Comment />
            </Col>
            <Col>
              <NavBar
                navList={navList}
                setNavList={setNavList}
                setTogglePage={setTogglePage}
              />
              {togglePage
                ? navList.map((compAr, index) => {
                    if (compAr.state === true) {
                      count2 += 1;
                      return <div key={index}>{compAr.compo}</div>;
                    }
                    if (index === 5 && count2 === 0) {
                      return <Empty key={index} index={index} />;
                    }

                    if (index === 0) {
                      //just added this return like that because eslint bordered me
                      return null;
                    }
                    return null;
                  })
                : navList.map((compAr, index) => {
                    if (compAr.show === true) {
                      return <div key={index}>{compAr.compo}</div>;
                    } else {
                      count += 1;
                      if (count === 6) {
                        count = 0;
                        return <NoneClick key={index} index={index} />;
                      }
                    }
                    return null;
                  })}
              <UserDelete />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid className="mb-5">
          <Row>
            {/* 마진값 높이 맞추기 위해 임시적으로 설정 */}
            <Col xl="3" style={{ marginTop: 54 }}>
              <User />
              <Comment />
            </Col>
            <Col>
              <NavBar
                navList={navList}
                setNavList={setNavList}
                setTogglePage={setTogglePage}
              />
              {togglePage
                ? navList.map((compAr, index) => {
                    if (compAr.state === true) {
                      count2 += 1;
                      return <div key={index}>{compAr.compo}</div>;
                    }
                    if (index === 5 && count2 === 0) {
                      return <Empty key={index} index={index} />;
                    }
                    //just added this return like that because eslint bordered me
                    return null;
                  })
                : navList.map((compAr, index) => {
                    if (compAr.show === true) {
                      return <div key={index}>{compAr.compo}</div>;
                    } else {
                      count += 1;
                      if (count === 6) {
                        count = 0;
                        return <NoneClick key={index} index={index} />;
                      }
                    }
                    return null;
                  })}
              <UserDelete />
            </Col>
          </Row>
        </Container>
      )}
    </OwnerContext.Provider>
  );
}

export default Portfolio;
