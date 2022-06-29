import React, { useState, useContext, useEffect } from "react";
import "./ExamAll.css";
import Exam1 from "./Exam1";
import Exam2 from "./Exam2";
import Exam3 from "./Exam3";
import Exam4 from "./Exam4";
import Exam5 from "./Exam5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Exam1Context,
  Exam2Context,
  Exam3Context,
  Exam4Context,
  Exam5Context,
  BookContext,
} from "../../../Helper/Context";

const ExamAll = () => {
  const [exam1Data, setExam1Data] = useState("");
  const [exam2Data, setExam2Data] = useState("");
  const [exam3Data, setExam3Data] = useState("");
  const [exam4Data, setExam4Data] = useState("");
  const [exam5Data, setExam5Data] = useState("");
  console.log(exam1Data, exam2Data, exam3Data, exam4Data, exam5Data);

  const [page, setPage] = useState(0);
  const FormTitles = ["第一題", "第二題", "第三題", "第四題", "第五題"];

  const [memberId, setMemberId] = useState("");
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/member/isLogin",
      data: {
        token: localStorage.token,
      },
    })
      .then((res) => {
        //有登入的話，回傳「會員資訊」在res.data[0] ｜ 沒登入則回傳message
        let userData = res.data[0];
        console.log(userData);
        setMemberId(userData.memberId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // //是否參與活動
  const { activityState, setActivityState } = useContext(BookContext);
  // const ExamResultHandler = (event) => {
  //   event.preventDefault();

  //   const ExamDetails = {
  //     isActive: activityState,
  //     memberId: memberId,
  //     qOneAnsValue: exam1Data,
  //     q2AnsValue: exam2Data,
  //     q3AnsValue: exam3Data,
  //     q4AnsValue: exam4Data,
  //     q5AnsValue: exam5Data,
  //   };
  //   console.log({
  //     isActive: activityState,
  //     memberId: memberId,
  //     qOneAnsValue: exam1Data,
  //     q2AnsValue: exam2Data,
  //     q3AnsValue: exam3Data,
  //     q4AnsValue: exam4Data,
  //     q5AnsValue: exam5Data,
  //   });
  //   fetch("http://localhost:5000/exam/getAndSaveExamData", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //     body: JSON.stringify(ExamDetails),
  //   })
  //     .then((response) => response.json())
  //     .then(console.log("ok"))
  //     .catch(console.error);
  // };

  //2022-06-16 -ZH
  //在同一分頁展示不同測驗題目
  const PageDisplay = () => {
    if (page === 0) {
      return (
        <Exam1Context.Provider value={{ exam1Data, setExam1Data }}>
          <Exam1 />
        </Exam1Context.Provider>
      );
    } else if (page === 1) {
      return (
        <Exam2Context.Provider value={{ exam2Data, setExam2Data }}>
          <Exam2 />
        </Exam2Context.Provider>
      );
    } else if (page === 2) {
      return (
        <Exam3Context.Provider value={{ exam3Data, setExam3Data }}>
          <Exam3 />
        </Exam3Context.Provider>
      );
    } else if (page === 3) {
      return (
        <Exam4Context.Provider value={{ exam4Data, setExam4Data }}>
          <Exam4 />
        </Exam4Context.Provider>
      );
    } else if (page === 4) {
      return (
        <Exam5Context.Provider value={{ exam5Data, setExam5Data }}>
          <Exam5 />
        </Exam5Context.Provider>
      );
    }
  };

  //做完題目後，跳轉到examResult
  const navigate = useNavigate();
  const nextPage = () => {
    if (page < 4) {
      setPage((currentPage) => currentPage + 1);
    } else {
      navigate("/examResult");
    }

    if (page === 4) {
      const ExamDetails = {
        isActive: activityState,
        memberId: memberId,
        qOneAnsValue: exam1Data,
        q2AnsValue: exam2Data,
        q3AnsValue: exam3Data,
        q4AnsValue: exam4Data,
        q5AnsValue: exam5Data,
      };
      console.log({
        isActive: activityState,
        memberId: memberId,
        qOneAnsValue: exam1Data,
        q2AnsValue: exam2Data,
        q3AnsValue: exam3Data,
        q4AnsValue: exam4Data,
        q5AnsValue: exam5Data,
      });
      fetch("http://localhost:5000/examItem/getAndSaveExamData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(ExamDetails),
      })
        .then((response) => response.json())
        .then(console.log("ok"))
        .catch(console.error);
    }
  };

  return (
    <div className="form">
      <div className="progressbar">
        <div
          style={{
            width:
              page === 0
                ? "20%"
                : page === 1
                ? "40%"
                : page === 2
                ? "60%"
                : page === 3
                ? "80%"
                : "100%",
          }}
        ></div>
      </div>
      <div className="examFormCantainer">
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>

        <div className="footer">
          <button
            disabled={page === 0}
            onClick={() => {
              setPage((page) => page - 1);
            }}
            className="prevBtn"
          >
            上一步
          </button>
          <button onClick={nextPage} className="nextBtn">
            下一步
          </button>
          {/* {(page = 5) && <button onClick={ExamResultHandler}>完成測驗</button>} */}
        </div>
      </div>
    </div>
  );
};

export default ExamAll;
