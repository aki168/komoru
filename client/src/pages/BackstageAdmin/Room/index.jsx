import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import RoomViewEditsModal from "./RoomViewEditsModal";

function Room() {
  /* 20220616 YG
  初始化使用者資料
  初始化頁數*/
  // const [users, setUsers] = useState(HotelData.slice(0));
  const [pageNumber, setPageNumber] = useState(0);
  /*20220617 YG
  接後端資料初始化*/
  const [data, setData] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  /*20220617 YG
  接後端api取後端資料*/
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/room/getRoomDataListWithMainImgAndHotelNameAndCityName"
      )
      .then((res) => {
        // console.log(res.data.dataList);
        setData(res.data.dataList);
      })
      .catch((err) => console.log(err));
  }, []);

  /*20220616 YG
  設定畫面上資料個數*/
  const userPerPage = 6;
  /*20220616 YG
  總頁面資料個數 */
  const pageVisited = pageNumber * userPerPage;

  /*20220617 YG
  利用變數取畫面上顯示資料 */
  const arr = Object.values(data).map((values, index) => {
    return (
      // console.log(values.hotelTitle)
      <tr key={index} className="form-check-label">
        <td className="col-sm-1">{values.roomTitle}</td>
        <td className="col-sm-1">{values.hotelTitle}</td>
        <td className="col-sm-1">{values.cityName}</td>
        <td className="col-sm-1">{values.liveNum}</td>
        <td className="col-sm-1">
          <div
            className=" "
            style={{
              width: "100%",
              height: "200px",
              backgroundImage: `url("http://localhost:5000${values.roomImgPath}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </td>
        <td className="col-sm-1">
          <button
            className="me-1 btn btn-success"
            onClick={() => setModalShow(true)}
          >
            檢視/修改
          </button>

          <a href="" className="btn btn-success">
            移除
          </a>
        </td>
      </tr>
    );
  });
  /*20220617 YG
  arr變數(畫面)進行slice顯示資料 */
  const displayUsers = arr.slice(pageVisited, pageVisited + userPerPage);
  /*20220616 YG
  (react-paginate參數)
  取頁簽顯示數字 */
  const pageCount = Math.ceil(data.length / userPerPage);
  /*20220616 YG
  (react-paginate參數)
  點選後更換頁面 */
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="mx-5  mb-5">
        <h2 className="mt-5 mb-5">房型管理</h2>
        <div>
          <div className="row ms-5 mb-3">
            <div className="col-sm-4">
              <div className="d-flex justify-content-start">
                <input
                  className="form-control me-2 "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-success" type="submit">
                  Search
                </button>
                <select
                  className=" form-select ms-1"
                  aria-label="Default select example"
                >
                  <option defaultValue="地區搜尋">飯店搜尋</option>
                  <option value="1">北區</option>
                  <option value="2">中區</option>
                  <option value="3">南區</option>
                  <option value="4">東區</option>
                </select>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="d-flex justify-content-end">
                <a className="btn btn-success ms-2">新增房型</a>
              </div>
            </div>
            <div className="col-sm-2 d-flex justify-content-end">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <ReactPaginate
                    nextLabel=">"
                    previousLabel="<"
                    pageCount={pageCount}
                    onPageChange={changePage}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"active"}
                  />
                </ul>
              </nav>
            </div>
          </div>
          <div className="row ms-5">
            <div className=" col-sm-10">
              <table className=" table table-hover  text-center align-middle ">
                <thead>
                  <tr>
                    <td className="col-sm-1">房型</td>
                    <td className="col-sm-1">飯店名稱</td>
                    <td className="col-sm-1">區域</td>
                    <td className="col-sm-1">容納人數</td>
                    <td className="col-sm-1">圖片</td>
                    <td className="col-sm-1"></td>
                  </tr>
                </thead>
                <tbody
                  style={{
                    height: " 600px",
                    width: " 1217px",
                    overflowY: "auto",
                    position: "absolute",
                  }}
                >
                  {displayUsers}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <RoomViewEditsModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Room;
