import axios from "axios";
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

import {
  TbBabyBottle,
  TbPill,
} from "react-icons/tb";

import {
  MdLocalConvenienceStore,
} from "react-icons/md";

import {
  FaBars,
  FaStore,
  FaRegHospital,
  FaParking,
  FaRestroom,
  FaFireExtinguisher,
} from "react-icons/fa"

import {
  PiPoliceCarBold,
} from "react-icons/pi"


import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, BarChart, Bar, YAxis, XAxis, Tooltip, CartesianGrid } from 'recharts';


function MapTest() {

  //아이콘 클릭시 보이기 사라지기
  //수유실
  const [isNurseClick, setIsNurseClick] = useState(false);
  const nurseClicked = () => setIsNurseClick(!isNurseClick);

  //화장실
  const [isToiletClick, setIsToiletClick] = useState(false);
  const toiletClicked = () => setIsToiletClick(!isToiletClick);

  //편의점
  const [isConvClick, setIsConvClick] = useState(false);
  const convClicked = () => setIsConvClick(!isConvClick);

  //드러그스토어(다이소,올리브영 등)
  const [isStoreClick, setIsStoreClick] = useState(false);
  const storeClicked = () => setIsStoreClick(!isStoreClick);

  //약국
  const [isPillClick, setIsPillClick] = useState(false);
  const pillClicked = () => setIsPillClick(!isPillClick);

  //병원
  const [isHospitalClick, setIsHospitalClick] = useState(false);
  const hospitalClicked = () => setIsHospitalClick(!isHospitalClick);

  //경찰서
  const [isPoliceClick, setIsPoliceClick] = useState(false);
  const policeClicked = () => setIsPoliceClick(!isPoliceClick);

  //소방서
  const [isFireClick, setIsFireClick] = useState(false);
  const fireClicked = () => setIsFireClick(!isFireClick);

  //민영주차장
  // const [isParkClick, setIsParkClick] = useState(false);
  // const parkClicked = () => setIsParkClick(!isParkClick);

  //공영주차장
  const [isFreeClick, setIsFreeClick] = useState(false);
  const freeClicked = () => setIsFreeClick(!isFreeClick);

  //토글버튼 눌렸는지 확인
  const toggle = () => setIsOpen(!isOpen);

  //사이드바 열렸는지 확인
  const [isOpen, setIsOpen] = useState(false);

  //사이드바 메뉴 목록
  const menuItem = [
    {
      name: "수유실",
      icon: <TbBabyBottle color="#3170B9" />,
      clicked: nurseClicked,
    },
    {
      name: "화장실",
      icon: <FaRestroom color="#3170B9" />,
      clicked: toiletClicked,
    },
    {
      name: "편의점",
      icon: <MdLocalConvenienceStore color="#3170B9" />,
      clicked: convClicked,
    },
    {
      name: "드러그스토어",
      icon: <FaStore color="#3170B9" />,
      clicked: storeClicked,
    },
    {
      name: "약국",
      icon: <TbPill color="#3170B9" />,
      clicked: pillClicked,
    },
    {
      name: "병원",
      icon: <FaRegHospital color="#3170B9" />,
      clicked: hospitalClicked,
    },
    {
      name: "경찰서",
      icon: <PiPoliceCarBold color="#3170B9" />,
      clicked: policeClicked,
    },
    {
      name: "소방서",
      icon: <FaFireExtinguisher color="#3170B9" />,
      clicked: fireClicked,
    },
    {
      name: "공영주차장",
      icon: <FaParking color="#3170B9" />,
      clicked: freeClicked,
    },
  ]

  // Geolocation 예제
  const [location, setLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err) => {
          setLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setLocation((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }, [])


  //장소 데이터 받아오기
  //클라우드
  // 물놀이시설 데이터 받아오기
  // const [wptype1, setWptype1] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://server.childcarrymap.click/map/wptypeids/1')
  //     .then(json => {
  //       // console.log(json.data[0].waterplayvalue01);
  //       setWptype1(json.data); 
  //     })
  // }, []);

  //로컬
  const [wptype1, setWptype1] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/map/wptypeids/1')
      .then(json => {
        // console.log(json.data[0].waterplayvalue01);
        setWptype1(json.data);
      })
  }, []);


  //수영장 데이터 받아오기
  //클라우드
  // const [wptype2, setWptype2] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://server.childcarrymap.click/map/wptypeids/2')
  //     .then(json => {
  //       // console.log(json.data);
  //       // console.log(json.data[0].waterplayscorefacidesc);
  //       setWptype2(json.data);
  //     })
  // }, []);

  //로컬
  const [wptype2, setWptype2] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/map/wptypeids/2')
      .then(json => {
        // console.log(json.data);
        // console.log(json.data[0].waterplayscorefacidesc);
        setWptype2(json.data);
      })
  }, []);


  //바닥분수 데이터 받아오기
  //클라우드
  // const [wptype3, setWptype3] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://server.childcarrymap.click/map/wptypeids/3')
  //     .then(json => {
  //       // console.log(json.data);
  //       setWptype3(json.data);
  //     })
  // }, []);

  //로컬
  const [wptype3, setWptype3] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/map/wptypeids/3')
      .then(json => {
        // console.log(json.data);
        setWptype3(json.data);
      })
  }, []);



  //수유실 데이터 받아오기
  //클라우드
  // const [nurse, setNurse] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://server.childcarrymap.click/map/toilettypes/%EC%88%98%EC%9C%A0%EC%8B%A4/')
  //     .then(json => {
  //       // console.log(json.data);
  //       setNurse(json.data);
  //     })
  // }, []);

  //로컬
  const [nurse, setNurse] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/map/toilettypes/%EC%88%98%EC%9C%A0%EC%8B%A4/')
      .then(json => {
        // console.log(json.data);
        setNurse(json.data);
      })
  }, []);



  //화장실 데이터 받아오기
  //클라우드
  // const [toilet, setToilet] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://server.childcarrymap.click/map/toilettypes/%ED%99%94%EC%9E%A5%EC%8B%A4/')
  //     .then(json => {
  //       // console.log(json.data);
  //       setToilet(json.data);
  //     })
  // }, []);


  //로컬
  const [toilet, setToilet] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/map/toilettypes/%ED%99%94%EC%9E%A5%EC%8B%A4/')
      .then(json => {
        // console.log(json.data);
        setToilet(json.data);
      })
  }, []);


  //편의점 데이터 받아오기
  //클라우드
  // const [conv, setConv] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://server.childcarrymap.click/map/convtypes/%ED%8E%B8%EC%9D%98%EC%A0%90/')
  //     .then(json => {
  //       // console.log(json.data);
  //       setConv(json.data);
  //     })
  // }, []);

  //로컬
  const [conv, setConv] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/map/convtypes/%ED%8E%B8%EC%9D%98%EC%A0%90/')
      .then(json => {
        // console.log(json.data);
        setConv(json.data);
      })
  }, []);


  //드러그 스토어 데이터 받아오기
  //클라우드
  // const [store, setStore] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://server.childcarrymap.click/map/convtypes/%EB%93%9C%EB%9F%AC%EA%B7%B8%EC%8A%A4%ED%86%A0%EC%96%B4/')
  //     .then(json => {
  //       // console.log(json.data);
  //       setStore(json.data);
  //     })
  // }, []);

  //로컬
  const [store, setStore] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/map/convtypes/%EB%93%9C%EB%9F%AC%EA%B7%B8%EC%8A%A4%ED%86%A0%EC%96%B4/')
      .then(json => {
        // console.log(json.data);
        setStore(json.data);
      })
  }, []);


  //약국 데이터 받아오기
  //클라우드
  // const [pill, setPill] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://server.childcarrymap.click/map/meditypes/%EC%95%BD%EA%B5%AD/')
  //     .then(json => {
  //       // console.log(json.data);
  //       setPill(json.data);
  //     })
  // }, []);

  //로컬
  const [pill, setPill] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/map/meditypes/%EC%95%BD%EA%B5%AD/')
      .then(json => {
        // console.log(json.data);
        setPill(json.data);
      })
  }, []);


  //병원 데이터 받아오기
  //클라우드
  // const [hospital, setHospital] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://server.childcarrymap.click/map/meditypes/%EB%B3%91%EC%9B%90/')
  //     .then(json => {
  //       // console.log(json.data);
  //       setHospital(json.data);
  //     })
  // }, []);

  //로컬
  const [hospital, setHospital] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/map/meditypes/%EB%B3%91%EC%9B%90/')
      .then(json => {
        // console.log(json.data);
        setHospital(json.data);
      })
  }, []);



  //경찰서 데이터 받아오기
  //클라우드
  // const [police, setPolice] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://server.childcarrymap.click/map/safe112alls/')
  //     .then(json => {
  //       // console.log(json.data);
  //       setPolice(json.data);
  //     })
  // }, []);

  //로컬
  const [police, setPolice] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/map/safe112alls/')
      .then(json => {
        // console.log(json.data);
        setPolice(json.data);
      })
  }, []);


  //소방서 데이터 받아오기
  //클라우드
  // const [fire, setFire] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://server.childcarrymap.click/map/safe119alls/')
  //     .then(json => {
  //       // console.log(json.data);
  //       setFire(json.data);
  //     })
  // }, []);

  //로컬
  const [fire, setFire] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/map/safe119alls/')
      .then(json => {
        // console.log(json.data);
        setFire(json.data);
      })
  }, []);


  //민영 주차장 데이터 받아오기
  //클라우드
  // const [park, setPark] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://server.childcarrymap.click/map/parkingtypes/%EB%AF%BC%EC%98%81/')
  //     .then(json => {
  //       // console.log(json.data);
  //       setPark(json.data);
  //     })
  // }, []);

  //로컬
  const [park, setPark] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/map/parkingtypes/%EB%AF%BC%EC%98%81/')
      .then(json => {
        // console.log(json.data);
        setPark(json.data);
      })
  }, []);


  //공영 주차장 데이터 받아오기
  //클라우드
  // const [free, setFree] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://server.childcarrymap.click/map/parkingtypes/%EA%B3%B5%EC%98%81/')
  //     .then(json => {
  //       // console.log(json.data);
  //       setFree(json.data);
  //     })
  // }, []);

  //로컬
  const [free, setFree] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/map/parkingtypes/%EA%B3%B5%EC%98%81/')
      .then(json => {
        // console.log(json.data);
        setFree(json.data);
      })
  }, []);

  //물놀이 카테고리 만들기
  const markerImageSrc =
    "../image/sprite.png"
  // const imageSize = { width: 22, height: 26 }
  // const spriteSize = { width: 30, height: 90 }

  const [selectedCategory, setSelectedCategory] = useState("waterpark")

  useEffect(() => {
    const waterground = document.getElementById("waterpark")
    const fountain = document.getElementById("fountain")
    const pool = document.getElementById("pool")

    if (selectedCategory === "waterpark") {
      // 커피숍 카테고리를 선택된 스타일로 변경하고
      waterground.className = "menu_selected"

      // 편의점과 주차장 카테고리는 선택되지 않은 스타일로 바꿉니다
      fountain.className = ""
      pool.className = ""
    } else if (selectedCategory === "fountain") {
      // 편의점 카테고리가 클릭됐을 때

      // 편의점 카테고리를 선택된 스타일로 변경하고
      waterground.className = ""
      fountain.className = "menu_selected"
      pool.className = ""
    } else if (selectedCategory === "pool") {
      // 주차장 카테고리가 클릭됐을 때

      // 주차장 카테고리를 선택된 스타일로 변경하고
      waterground.className = ""
      fountain.className = ""
      pool.className = "menu_selected"
    }
  }, [selectedCategory])


  //커스텀 오버레이
  const CustomOverlay = ({ position, title, image, address, newAddress }) => {
    const [isCLick, setIsClick] = useState(false);
    return (
      <>
        <MapMarker
          position={position}
          onClick={() => setIsClick(true)}
          image={{
            src: image, // 마커이미지의 주소입니다
            size: {
              width: 30,
              height: 30
            }, // 마커이미지의 크기입니다
          }}
        />

        {/* 마커 클릭시 간단한 정보 알려주는 부분 */}
        {isCLick && (
          <CustomOverlayMap position={position}>
            <div className='t_wrap'>
              <div className='t_info'>
                <div className='t_title'>
                  {title}
                  <div
                    className='t_close'
                    onClick={() => setIsClick(false)}
                    title='닫기'
                  ></div>
                </div>
                <div className='t_body'>
                  <div className='t_img'>
                    <img
                      src={image}
                      width="73"
                      height="70"
                      alt={title}
                    />
                  </div>
                  <div className="t_desc">
                    <div className="t_jibun ellipsis">
                      구주소: {address}
                    </div>
                    <div>
                      <div>
                        {/* {phone} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </>
    )
  }


  const WaterCustomOverlay = ({
    position,
    markerImage,
    image,
    scoreImage,
    title,
    value01,
    value02,
    value03,
    value04,
    value05,
    value06,
    oAddress,
    phone,
    scoreToilet,
    scoreConv,
    scoreDrug,
    scoreMedi,
    score112,
    score119,
    scorePark,
    scoreToiletMean,
    scoreConvMean,
    scoreDrugMean,
    scoreMediMean,
    score112Mean,
    score119Mean,
    scoreParkMean,
    scoreReview,
    scoreMean,
    scoreTotal,
    name01,
    name02,
    name03,
    name04,
    name05,
    name06,
    wordcloud,
    shortvalue01,
  }) => {
    //마커 클릭시
    const [isWaterparkClick, setIsWaterparkClick] = useState(false);

    //상세페이지 클릭시
    const [isDetailClick, setIsDetailClick] = useState(false);

    //마우스오버 이벤트
    const [isMouseOver, setIsMouseOver] = useState(false);

    const routeLink = "https://map.naver.com/v5/search/"+ title +"?c=15,0,0,0,dh"
    //그래프데이터
    const data = [
      {
        subject: '화장실',
        A: scoreToilet,
        B: scoreToiletMean,
        fullMark: 5,
      },

      {
        subject: '편의점',
        A: scoreConv,
        B: scoreConvMean,
        fullMark: 5,
      },

      {
        subject: '드럭스토어',
        A: scoreDrug,
        B: scoreDrugMean,
        fullMark: 5,
      },

      {
        subject: '의약시설',
        A: scoreMedi,
        B: scoreMediMean,
        fullMark: 5,
      },

      {
        subject: '경찰서',
        A: score112,
        B: score112Mean,
        fullMark: 5,
      },

      {
        subject: '소방서',
        A: score119,
        B: score119Mean,
        fullMark: 5,
      },

      {
        subject: '주차장',
        A: scorePark,
        B: scoreParkMean,
        fullMark: 5,
      }
    ]

    const barData = [
      {
        name: 'compare',
        해당장소점수: scoreTotal,
        행정구역평균: scoreMean,
      },
    ]
    return (
      <>
        <MapMarker
          position={position}
          // onClick={() => setIsClick(true)}
          image={markerImage}
          onClick={() => setIsWaterparkClick(true)}
          onMouseOver={() => setIsMouseOver(true)}
          onMouseOut={() => setIsMouseOver(false)}
        >
          {isMouseOver && <div style={{ width: "200px", height: "20px", textAlign: "center", alignContent: "center" }}>{title}</div>}
        </MapMarker>

        {isWaterparkClick &&
          (
            <CustomOverlayMap position={position}>
              <div className='wrap'>
                <div className='info'>
                  <div className='title'>
                    {title}
                    <div
                      className='close'
                      onClick={() => setIsWaterparkClick(false)}
                      title='닫기'
                    >
                      <img src="/image/cls-img.png" style={{ width: "18px", height: "18px" }} />
                    </div>
                  </div>
                  <div className='body'>
                    <div className='img'>
                      <img
                        src={image}
                        width="73"
                        height="110"
                        alt={title}
                      />
                    </div>
                    <div className="desc">
                      <div className="jibun ellipsis">
                        <div
                          style={{
                            marginBottom: "15px",
                          }}>
                          주소 : {oAddress}
                          <br />
                          <pre>{name01}: {shortvalue01}</pre>
                          전화번호 : {phone}
                        </div>

                        <div>
                          <button onClick={() => setIsDetailClick(true)} style={{ fontSize: "12px", fontWeight: "bold", width: "90px", background: "#3170B9", color: "white", borderRadius: "10px", }}>상세페이지</button>
                          &nbsp;
                          <button onClick={() => setIsDetailClick(true)} 
                            style={{ 
                              fontSize: "12px", 
                              fontWeight: "bold", 
                              width: "90px", 
                              background: "#3170B9", 
                              color: "white", 
                              borderRadius: "10px", 
                              }}>
                                <a href={routeLink} target="_blank">길찾기</a>
                                
                          </button>
                        </div>
                      </div>

                      {/* 상세데이터 */}
                      {
                        isDetailClick && (
                          <CustomOverlayMap position={position}>
                            <div id="detail-wrap">
                              <div style={{width:"100%",}}>
                                <img
                                    alt="close"
                                    width="20"
                                    height="20"
                                    src="/image/aa.png"
                                    style={{
                                      position: "absolute",
                                      right: "15px",
                                      top: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setIsDetailClick(false)}
                                  />
                              </div>
                              

                              <div className="box" style={{border: "2px solid rgb(199, 192, 192)", borderRadius: "10px" }}>
                                <img
                                  alt={title}
                                  src={image}
                                  style={{ width: "900px", height: "95%", marginTop: "10px"}}
                                />
                              </div>

                              <div className="box" style={{marginTop:"20px", marginBottom:"20px"}}>
                                <div className="box-info" style={{padding: "5px",width:"70%",marginRight:"10px", textAlign:"left", overflow:"scroll", fontSize:"13px", lineHeight:"1.5", fontWeight:"bold"}}>
                                  <span className="highlight" style={{fontSize:"15px"}}>{title}</span> <br /><br />
                                  <span className="highlight">주소 </span> : 서울특별시 {oAddress} <br />
                                  <pre><span className="highlight">{name01}</span> : {value01}</pre>
                                  <pre><span className="highlight">{name02}</span> : {value02}</pre>
                                  <pre><span className="highlight">{name03}</span> : {value03}</pre>
                                  <pre><span className="highlight">{name04}</span>  {value04}</pre>
                                  <pre><span className="highlight">{name05}</span>  {value05}</pre>
                                  <pre><span className="highlight">{name06}</span>  {value06}</pre>
                                </div>

                                <div className="box-info" style={{width:"25%", textAlign:"center", padding: "5px", position:"relative"}}>
                                  <div style={{width:"95%", height:"130px", borderBottom: "2px solid rgb(199, 192, 192)"}}>
                                    <br/>
                                    <span style={{fontWeight:"bold",color:"#3170B9"}}>편의지수</span> : <span style={{color:"red",}}>{scoreTotal}</span>
                                    <br/><br/>
                                    <img
                                      src={scoreImage}
                                      style={{ width: "50px", height: "50px" }}
                                    />
                                  </div>

                                  <div style={{top: "150px"}}>
                                    <br/><br/>
                                    <span style={{fontWeight:"bold",color:"#3170B9"}}>긍정비율</span> : <span style={{color:"red",}}>{scoreReview}%</span>
                                    <br/>
                                    <progress id="progress" value={scoreReview} min="0" max="100"></progress>
                                    <br/>
                                    {scoreReview}% vs {100-scoreReview}%
                                  </div>
                                </div>
                              </div>

                              <div className="box">
                                <div className="box-graph" style={{}}>
                                <div style={{fontWeight: "bold", color:"#306CB5", marginBottom:"10px", paddingTop:"5px"}}>시설별 상세 편의지수</div>
                                  <ResponsiveContainer width="90%" height="90%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="50%" width={300} height={300} data={data}>
                                      <PolarGrid />
                                      <PolarAngleAxis dataKey="subject" />
                                      <PolarRadiusAxis angle={60} domain={[0, 5]} />
                                      <Radar name="해당 시설별 편의지수" dataKey="A" stroke="blue" fill="blue" fillOpacity={0.6} />
                                      <Radar name="시설별 평균" dataKey="B" stroke="red" fill="red" fillOpacity={0.6} />
                                      <Legend />
                                    </RadarChart>
                                  </ResponsiveContainer>
                                </div>

                                <div className="box-graph" style={{marginLeft:"10px", marginRight:"10px",}}>
                                  <div style={{fontWeight: "bold", color:"#306CB5", marginBottom:"10px", paddingTop:"5px"}}>행정구역 내 평균 편의지수와 비교</div>
                                  <ResponsiveContainer width="90%" height="90%">
                                    <BarChart
                                      width={150}
                                      height={40}
                                      data={barData}
                                      margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                      }}
                                    >
                                      <CartesianGrid strokeDasharray="3 3" />
                                      <XAxis dataKey="compare" />
                                      <YAxis />
                                      <Tooltip />
                                      <Legend />
                                      <Bar dataKey="해당장소점수" fill="blue" />
                                      <Bar dataKey="행정구역평균" fill="#82ca9d" />
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>

                                <div className="box-graph" style={{}}>
                                  <div style={{fontWeight: "bold", color:"#306CB5", marginBottom:"10px", paddingTop:"5px"}}>워드클라우드</div>
                                  <a href="https://ibb.co/JsHwC4M"><img src={wordcloud} style={{ width: "90%", height: "90%" }} alt="image" border="0" /></a>
                                </div>
                              </div>

                            </div>
                          </CustomOverlayMap>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </CustomOverlayMap>
          )}

      </>
    )
  }


  return (
    // 사이드바
    <div className="all-contents">
      <div className="side-bar">
        <div className="container">
          <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
            <div className="top_section">
              <div style={{ marginLeft: "0px" }} className="bars">
                <FaBars onClick={toggle} />
              </div>
            </div>
            {
              menuItem.map((item, index) => (
                <div key={index} className="link" activeclassname="active">
                  <div className="icon" onClick={item.clicked}>{item.icon}</div>
                  <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>


      <div className="map-area">

        <div>
          <div className="category">
            <ul>
              <li id="waterpark" onClick={() => setSelectedCategory("waterpark")}>
                <span className="ico_comm ico_waterpark"></span>
                물놀이장
              </li>
              <li id="fountain" onClick={() => setSelectedCategory("fountain")}>
                <span className="ico_comm ico_store"></span>
                바닥분수
              </li>
              <li id="pool" onClick={() => setSelectedCategory("pool")}>
                <span className="ico_comm ico_carpark"></span>
                수영
              </li>
            </ul>
          </div>
        </div>

        <div className="manual">
          <div style={{ color: '#3170B9' }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>편의지수란? &nbsp; <img src="/image/bar.png"></img></div>
          </div>
        </div>


        <div className="map-wrap">
          <Map
            id={`map`}
            center={location.center}
            style={{
              // 지도의 크기
              width: "100vw",
              height: "100vh",
              // border: '2px solid #3170B9',
              borderRadius: '10px',
              marginLeft: '5px',
            }}
            level={3} // 지도의 확대 레벨
          >
            {/* 수유실 아이콘 클릭시 */}
            {
              isNurseClick && (
                nurse.map((data) => (
                  <CustomOverlay
                    key={`${data.toiletid}`}
                    position={{ lat: data.toiletla, lng: data.toiletlo }}
                    image='https://cdn-icons-png.flaticon.com/128/469/469012.png'
                    title={data.toiletname}
                    address={data.toiletaddrold}
                    newAddress={data.toiletaddrnew}
                  />
                ))
              )

            }


            {/* 화장실 아이콘 클릭시 */}
            {
              isToiletClick && (
                toilet.map((data) =>
                  <CustomOverlay
                    key={`toilet-${data.toiletname}-${data.toiletla}-${data.toiletlo}`}
                    position={{ lat: data.toiletla, lng: data.toiletlo }}
                    image='https://cdn-icons-png.flaticon.com/128/325/325364.png'
                    title={data.toiletname}
                    address={data.toiletaddrold}
                    newAddress={data.toiletaddrnew}
                  />
                )
              )
            }

            {/* 편의점 아이콘 클릭시 */}
            {
              isConvClick && (
                conv.map((data) => (
                  <CustomOverlay
                    key={`conv-${data.convname}-${data.convla}-${data.convlo}`}
                    position={{ lat: data.convla, lng: data.convlo }}
                    image='https://cdn-icons-png.flaticon.com/128/3733/3733125.png'
                    title={data.convname}
                    address={`${data.convsido} ${data.convsigngu} ${data.convdong}`}
                    newAddress={null}
                  />
                ))
              )
            }

            {/* 드러그스토어 아이콘 클릭시 */}
            {
              isStoreClick && (
                store.map((data) => (
                  <CustomOverlay
                    key={`store-${data.convname}-${data.convla}-${data.convlo}`}
                    position={{ lat: data.convla, lng: data.convlo }}
                    image='https://cdn-icons-png.flaticon.com/128/5790/5790819.png'
                    title={data.convname}
                    address={`${data.convsido} ${data.convsigngu} ${data.convdong}`}
                    newAddress={null}
                  />
                ))
              )
            }

            {/* 약국 아이콘 클릭시 */}
            {
              isPillClick && (
                pill.map((data) => (
                  <MapMarker
                    key={`${data.mediid}-${data.mediname}-${data.medila}-${data.medilo}`}
                    position={{ lat: data.medila, lng: data.medilo }}
                    image={{
                      src: 'https://cdn-icons-png.flaticon.com/128/655/655968.png',
                      size: {
                        width: 35,
                        height: 35
                      }
                    }}
                  />
                ))
              )
            }

            {/* 병원 아이콘 클릭시 */}
            {
              isHospitalClick && (
                hospital.map((data) => (
                  <MapMarker
                    key={`${data.mediid}-${data.mediname}-${data.medila}-${data.medilo}`}
                    position={{ lat: data.medila, lng: data.medilo }}
                    image={{
                      src: 'https://cdn-icons-png.flaticon.com/128/527/527034.png',
                      size: {
                        width: 35,
                        height: 35
                      }
                    }}
                  />
                ))
              )
            }

            {/* 경찰 아이콘 클릭시 */}
            {
              isPoliceClick && (
                police.map((data) => (
                  <MapMarker
                    key={`${data.safe112id}`}
                    position={{ lat: data.safe112la, lng: data.safe112lo }}
                    image={{
                      src: 'https://cdn-icons-png.flaticon.com/128/3025/3025649.png',
                      size: {
                        width: 35,
                        height: 35
                      }
                    }}
                  />
                ))
              )
            }

            {/* 소방서 아이콘 클릭시 */}
            {
              isFireClick && (
                fire.map((data) => (
                  <MapMarker
                    key={`${data.safe119id}`}
                    position={{ lat: data.safe119la, lng: data.safe119lo }}
                    image={{
                      src: 'https://cdn-icons-png.flaticon.com/128/2991/2991301.png',
                      size: {
                        width: 35,
                        height: 35
                      }
                    }}
                  />
                ))
              )
            }

            {/* 공영주차장 아이콘 클릭시 */}
            {
              isFreeClick && (
                free.map((data) => (
                  <MapMarker
                    key={`${data.parkingid}`}
                    position={{ lat: data.parkingla, lng: data.parkinglo }}
                    image={{
                      src: 'https://cdn-icons-png.flaticon.com/128/2554/2554959.png',
                      size: {
                        width: 35,
                        height: 35
                      }
                    }}
                  />
                ))
              )
            }

            {/* 내위치표시 */}
            <MapMarker
              position={location.center}
              image={{
                src: 'https://cdn-icons-png.flaticon.com/128/4842/4842564.png',
                // src: {logo},
                size: {
                  width: 50,
                  height: 50
                }
              }}
            >
              <div style={{width: "200px", height: "20px", textAlign: "center", color:"red", fontWeight:"bold", alignContent: "center", paddingTop:"5px"}}>내 위치</div>
            </MapMarker>


            {/* 물놀이터 시설 위치 표시 */}
            {selectedCategory === "waterpark" &&
              wptype1.map((data) => (
                <WaterCustomOverlay
                  key={`wptype1-${data.waterplayname}-${data.waterplayla}-${data.waterplaylo}`}
                  position={{ lat: data.waterplayla, lng: data.waterplaylo }}
                  markerImage={
                    data.waterplayscorefacidesc == "red" ?
                      {
                        src: '/image/waterpark-p.png',
                        size: {
                          width: 50,
                          height: 50

                        }
                      }
                      :
                      data.waterplayscorefacidesc == "blue" ?
                        {
                          src: '/image/waterpark-b.png',
                          size: {
                            width: 50,
                            height: 50

                          }
                        }
                        :
                        {
                          src: '/image/waterpark-y.png',
                          size: {
                            width: 50,
                            height: 50

                          }
                        }}
                  image={
                    data.waterplayimgurl == '0' ?
                    '/image/nodata.png'
                    :
                    data.waterplayimgurl
                  }
                  scoreImage={
                    data.waterplayscorefacidesc == "red" ?
                      '/image/waterpark-p.png'
                      :
                      data.waterplayscorefacidesc == "blue" ?
                        '/image/waterpark-b.png'
                        :
                        '/image/waterpark-y.png'
                  }
                  title={data.waterplayname}
                  oAddress={data.waterplayaddrold}
                  nAddress={data.waterplayaddrnew}
                  value01={data.waterplayvalue01}
                  value02={data.waterplayvalue02}
                  value03={data.waterplayvalue03}

                  value04={
                    data.waterplayvalue04 == "0" ?
                    null
                    :
                    data.waterplayvalue04
                  }

                  value05={
                    data.waterplayvalue05 == "0" ?
                    null
                    :
                    data.waterplayvalue05
                  }
                  value06={
                    data.waterplayvalue06 == "0" ?
                    null
                    :
                    data.waterplayvalue06
                  }

                  name01={data.waterplayname01}
                  name02={data.waterplayname02}
                  name03={data.waterplayname03}

                  name04={
                    data.waterplayname04 == "0" ?
                    null
                    :
                    data.waterplayname04
                  }

                  name05={
                    data.waterplayname05 == "0" ?
                    null
                    :
                    data.waterplayname05
                  }

                  name06={
                    data.waterplayname06 == "0" ?
                    null
                    :
                    data.waterplayname06
                  }

                  phone={data.waterplaytelno}
                  scoreToilet={data.waterplayscoretoilet}
                  scoreConv={data.waterplayscoreconv}
                  scoreDrug={data.waterplayscoredrug}
                  scoreMedi={data.waterplayscoremedi}
                  score112={data.waterplayscoresafe112}
                  score119={data.waterplayscoresafe119}
                  scorePark={data.waterplayscoreparking}
                  scoreTotal={data.waterplayscorefaci}
                  scoreColor={data.waterplayscorefacidesc}
                  scoreReview={data.waterplayscorereview}
                  scoreMean={data.waterplayscoremean}
                  scoreToiletMean={data.waterplayscoretoiletmean}
                  scoreConvMean={data.waterplayscoreconvmean}
                  scoreDrugMean={data.waterplayscoredrugmean}
                  scoreMediMean={data.waterplayscoremedimean}
                  score112Mean={data.waterplayscoresafe112mean}
                  score119Mean={data.waterplayscoresafe119mean}
                  scoreParkMean={data.waterplayscoreparkingmean}
                  wordcloud={
                    data.waterplaywordcloudurl == "" ?
                      '/image/nodata.png'
                    :
                    data.waterplaywordcloudurl
                  }
                  shortvalue01={data.waterplayshortvalue01}
                />
              ))
            }

            {/* 수영 시설 위치 표시 */}
            {selectedCategory === "pool" &&
              wptype2.map((data) => (
                <WaterCustomOverlay
                  key={`wptype2-${data.waterplayname}-${data.waterplayla}-${data.waterplaylo}`}
                  position={{ lat: data.waterplayla, lng: data.waterplaylo }}
                  markerImage={
                    data.waterplayscorefacidesc == "red" ?
                      {
                        src: '/image/swim-p.png',
                        size: {
                          width: 50,
                          height: 50

                        }
                      }
                      :
                      data.waterplayscorefacidesc == "blue" ?
                        {
                          src: '/image/swim-b.png',
                          size: {
                            width: 50,
                            height: 50

                          }
                        }
                        :
                        {
                          src: '/image/swim-y.png',
                          size: {
                            width: 50,
                            height: 50

                          }
                        }
                  }
                  image={data.waterplayimgurl}
                  scoreImage={
                    data.waterplayscorefacidesc == "red" ?
                      '/image/waterpark-p.png'
                      :
                      data.waterplayscorefacidesc == "blue" ?
                        '/image/waterpark-b.png'
                        :
                        '/image/waterpark-y.png'
                  }
                  title={data.waterplayname}
                  oAddress={data.waterplayaddrold}
                  nAddress={data.waterplayaddrnew}
                  value01={data.waterplayvalue01}
                  value02={data.waterplayvalue02}
                  value03={data.waterplayvalue03}
                  value04={
                    data.waterplayvalue04 == "0" ?
                    null
                    :
                    data.waterplayvalue04
                  }

                  value05={
                    data.waterplayvalue05 == "0" ?
                    null
                    :
                    data.waterplayvalue05
                  }
                  value06={
                    data.waterplayvalue06 == "0" ?
                    null
                    :
                    data.waterplayvalue06
                  }
                  name01={data.waterplayname01}
                  name02={data.waterplayname02}
                  name03={data.waterplayname03}
                  name04={
                    data.waterplayname04 == "0" ?
                    null
                    :
                    data.waterplayname04
                  }

                  name05={
                    data.waterplayname05 == "0" ?
                    null
                    :
                    data.waterplayname05
                  }

                  name06={
                    data.waterplayname06 == "0" ?
                    null
                    :
                    data.waterplayname06
                  }
                  phone={data.waterplaytelno}
                  scoreToilet={data.waterplayscoretoilet}
                  scoreConv={data.waterplayscoreconv}
                  scoreDrug={data.waterplayscoredrug}
                  scoreMedi={data.waterplayscoremedi}
                  score112={data.waterplayscoresafe112}
                  score119={data.waterplayscoresafe119}
                  scorePark={data.waterplayscoreparking}
                  scoreToiletMean={data.waterplayscoretoiletmean}
                  scoreConvMean={data.waterplayscoreconvmean}
                  scoreDrugMean={data.waterplayscoredrugmean}
                  scoreMediMean={data.waterplayscoremedimean}
                  score112Mean={data.waterplayscoresafe112mean}
                  score119Mean={data.waterplayscoresafe119mean}
                  scoreParkMean={data.waterplayscoreparkingmean}
                  scoreTotal={data.waterplayscorefaci}
                  scoreColor={data.waterplayscorefacidesc}
                  scoreReview={data.waterplayscorereview}
                  scoreMean={data.waterplayscoremean}
                  wordcloud={
                    data.waterplaywordcloudurl == "" ?
                      '/image/nodata.png'
                    :
                    data.waterplaywordcloudurl
                  }
                  shortvalue01={data.waterplayshortvalue01}
                >
                </WaterCustomOverlay>
              ))
            }

            {/* 바닥분수 위치표시 */}
           {
              selectedCategory === "fountain" &&
              wptype3.map((data) => (
                <WaterCustomOverlay
                  key={`wptype3-${data.waterplayname}-${data.waterplayla}-${data.waterplaylo}`}
                  position={{ lat: data.waterplayla, lng: data.waterplaylo }}
                  markerImage={data.waterplayscorefacidesc == "red" ?
                    {
                      src: '/image/fountain-p.png',
                      size: {
                        width: 50,
                        height: 50

                      }
                    }
                    :
                    data.waterplayscorefacidesc == "blue" ?
                      {
                        src: '/image/fountain-b.png',
                        size: {
                          width: 50,
                          height: 50

                        }
                      }
                      :
                      {
                        src: '/image/fountain-y.png',
                        size: {
                          width: 50,
                          height: 50

                        }
                      }}
                  image={data.waterplayimgurl}
                  scoreImage={
                    data.waterplayscorefacidesc == "red" ?
                      '/image/waterpark-p.png'
                      :
                      data.waterplayscorefacidesc == "blue" ?
                        '/image/waterpark-b.png'
                        :
                        '/image/waterpark-y.png'
                  }
                  title={data.waterplayname}
                  oAddress={data.waterplayaddrold}
                  nAddress={data.waterplayaddrnew}
                  value01={data.waterplayvalue01}
                  value02={data.waterplayvalue02}
                  value03={data.waterplayvalue03}
                  value04={
                    data.waterplayvalue04 == "0" ?
                    null
                    :
                    data.waterplayvalue04
                  }

                  value05={
                    data.waterplayvalue05 == "0" ?
                    null
                    :
                    data.waterplayvalue05
                  }
                  value06={
                    data.waterplayvalue06 == "0" ?
                    null
                    :
                    data.waterplayvalue06
                  }
                  name01={data.waterplayname01}
                  name02={data.waterplayname02}
                  name03={data.waterplayname03}
                  name04={
                    data.waterplayname04 == "0" ?
                    null
                    :
                    data.waterplayname04
                  }

                  name05={
                    data.waterplayname05 == "0" ?
                    null
                    :
                    data.waterplayname05
                  }

                  name06={
                    data.waterplayname06 == "0" ?
                    null
                    :
                    data.waterplayname06
                  }
                  phone={data.waterplaytelno}
                  scoreToilet={data.waterplayscoretoilet}
                  scoreConv={data.waterplayscoreconv}
                  scoreDrug={data.waterplayscoredrug}
                  scoreMedi={data.waterplayscoremedi}
                  score112={data.waterplayscoresafe112}
                  score119={data.waterplayscoresafe119}
                  scorePark={data.waterplayscoreparking}
                  scoreToiletMean={data.waterplayscoretoiletmean}
                  scoreConvMean={data.waterplayscoreconvmean}
                  scoreDrugMean={data.waterplayscoredrugmean}
                  scoreMediMean={data.waterplayscoremedimean}
                  score112Mean={data.waterplayscoresafe112mean}
                  score119Mean={data.waterplayscoresafe119mean}
                  scoreParkMean={data.waterplayscoreparkingmean}
                  scoreTotal={data.waterplayscorefaci}
                  scoreColor={data.waterplayscorefacidesc}
                  scoreReview={data.waterplayscorereview}
                  scoreMean={data.waterplayscoremean}
                  wordcloud={
                    data.waterplaywordcloudurl == "" ?
                      '/image/nodata.png'
                    :
                    data.waterplaywordcloudurl
                  }
                  shortvalue01={data.waterplayshortvalue01}
                >
                </WaterCustomOverlay>
              ))
            }
          </Map>
        </div>
      </div>
    </div>
  )
};

export default MapTest;