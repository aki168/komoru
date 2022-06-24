import React, { useContext } from "react";
import "./ExamAll.css";
import {
  Exam1Context,
  Exam2Context,
  Exam3Context,
  Exam4Context,
  Exam5Context,
} from "../../../Helper/Context";

const Exam3 = () => {
  const { exam3Data, setExam3Data } = useContext(Exam3Context);
  // const [exam3Data, setexam3Data] = useState("");
  // console.log(exam3Data);
  return (
    <div className="topic">
      <p className="text">當新款3C產品推出,你會覺得?</p>
      <input
        type="radio"
        name="NorS"
        id="N"
        value="N"
        defaultChecked={exam3Data === "N"}
        onChange={(e) => setExam3Data(e.currentTarget.value)}
      ></input>
      <label htmlFor="N" className="getOp">
        哇！這想法太創新了,如何做到的？想立刻嘗試
      </label>
      <input
        type="radio"
        name="NorS"
        id="S"
        value="S"
        defaultChecked={exam3Data === "S"}
        onChange={(e) => setExam3Data(e.currentTarget.value)}
      ></input>
      <label htmlFor="S" className="getOp">
        好酷，但不知道到底好不好用....CP值符不符合？
      </label>
    </div>
  );
};

export default Exam3;
