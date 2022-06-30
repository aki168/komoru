import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ExamResult = () => {
  const navigator = useNavigate();
  const ToOrderPage = () => {
    navigator("/bookingorderPage");
  };
  return (
    <div className="examFormCantainer">
      <h1>測驗結果</h1>
      <h2>霸道總裁</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
        inventore, alias doloremque eveniet totam iste magni sed amet molestias
        ad necessitatibus illum quos error optio ea accusantium quaerat. Aliquam
        adipisci dicta nobis ad accusamus delectus impedit autem exercitationem
        dolorum et enim quae aperiam laudantium at in, similique minus fuga
        necessitatibus.
      </p>
      <img src="https://picsum.photos/300/300" alt="" />
      <button onClick={ToOrderPage} className="nextBtn">
        下一步
      </button>
    </div>
  );
};

export default ExamResult;
