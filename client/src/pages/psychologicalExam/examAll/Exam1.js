import React, { useContext, useState } from "react";
import "./ExamAll.css";
import { Exam1Context } from "../../../Helper/Context";

function Exam1() {
  // const [exam1Data, setexam1Data] = useState("");
  // console.log(exam1Data);
  const { exam1Data, setExam1Data } = useContext(Exam1Context);

  return (
    <>
      <div>
        <p className="text">今天去一間咖啡廳,你喜歡:</p>
        <div className="topic1">
          <input
            type="radio"
            name="AorB"
            id="A"
            value="A"
            defaultChecked={exam1Data === "A"}
            onChange={(e) => setExam1Data(e.target.value)}
          ></input>
          <label htmlFor="A" className="introOp">
            室外花園座位
          </label>
        </div>
        <div className="topic1">
          <input
            type="radio"
            name="AorB"
            id="B"
            value="B"
            defaultChecked={exam1Data === "B"}
            onChange={(e) => setExam1Data(e.target.value)}
          ></input>
          <label htmlFor="B" className="introOp">
            坐在店內聞咖啡香
          </label>
        </div>
      </div>
    </>
  );
}

export default Exam1;
