import React, { useContext } from "react";
import "./ExamAll.css";
import { Exam2Context } from "../../../Helper/Context";

const Exam2 = () => {
  const { exam2Data, setExam2Data } = useContext(Exam2Context);
  // const [exam2Data, setexam2Data] = useState("");
  // console.log(exam2Data);
  return (
    <div className="topic">
      <p className="text">休假時,我會:</p>
      <div className="topic1">
        <input
          type="radio"
          name="IorE"
          id="I"
          value="I"
          defaultChecked={exam2Data === "I"}
          onChange={(e) => setExam2Data(e.currentTarget.value)}
        ></input>
        <label htmlFor="I" className="getOp">
          在家追劇
        </label>
      </div>
      <div className="topic1">
        <input
          type="radio"
          name="IorE"
          id="E"
          value="E"
          defaultChecked={exam2Data === "E"}
          onChange={(e) => setExam2Data(e.currentTarget.value)}
        ></input>
        <label htmlFor="E" className="getOp">
          出門和朋友聚會
        </label>
      </div>
    </div>
  );
};

export default Exam2;
