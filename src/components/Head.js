import { Link } from "react-router-dom";
import logo from "../image/logo.png";

function Head() {

  //토글 메뉴 만들기

  return (
    <div className="header-container">
      <div className="header-wrap">
        <div className="header-left-wrap">
          <Link style={{ display: 'flex' }} to='/'>
            <img
              src={logo}
              style={{ width: "150px", height: "50px" }}
              alt="아이데리GO!"
            />
          </Link>
          <ul>
          <li>
              <Link className="header-nav-item" to='/statistics'>
                서비스 소개
              </Link>
            </li>
            <li>
              <Link className="header-nav-item" to='/statistics'>
                통계 한눈에 보기
              </Link>
            </li>
            <li>
              <Link className="header-nav-item" to='/mypage'>
                로그인/회원가입
              </Link>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Head;