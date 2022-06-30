import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import RoomViewEdits from "./RoomViewEdits";
import RoomAdd from "./RoomAdd";
import { Modal } from "react-bootstrap";

function Room() {
  /* 20220616 YN
  初始化使用者資料
  初始化頁數*/
  // const [users, setUsers] = useState(HotelData.slice(0));
  const [pageNumber, setPageNumber] = useState(0);
  /*20220617 YN
  接後端資料初始化*/
  const [data, setData] = useState([]);
  /*20220622 YN
  增加表單modal顯示狀態初始化*/
  const [addShow, setAddShow] = useState(false);
  /*20220622 YN
  檢視表單modal顯示狀態初始化*/
  const [editShow, setEditShow] = useState(false);
  /*20220624 YN
  取當下選取列表時的data狀態初始化*/
  const [editData, setEditData] = useState();
  /*20220617 YN
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

  /*20220616 YN
  設定畫面上資料個數*/
  const userPerPage = 6;
  /*20220616 YN
  總頁面資料個數 */
  const pageVisited = pageNumber * userPerPage;

  /*20220617 YN
  利用變數取畫面上顯示資料 */
  const arr = data.map((data, index) => {
    return (
      // console.log(values.hotelTitle)
      <tr key={index} className="form-check-label">
        <td className="col-sm-1">{data.roomType}</td>
        <td className="col-sm-1">{data.hotelTitle}</td>
        <td className="col-sm-1">{data.cityName}</td>
        <td className="col-sm-1">{data.liveNum}</td>
        <td className="col-sm-1">
          <div
            className=" "
            style={{
              width: "100%",
              height: "200px",
              backgroundImage: `url("http://localhost:5000${data.roomImgPath}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </td>
        <td className="col-sm-1">
          <button
            className="me-1 btn btn-success"
            onClick={() => handleEditShow(index)}
          >
            檢視/修改
          </button>

          <button
            onClick={() => deletFormHandle(index)}
            className="btn btn-success"
          >
            移除
          </button>
        </td>
      </tr>
    );
  });
  /*20220617 YN
  arr變數(畫面)進行slice顯示資料 */
  const displayUsers = arr.slice(pageVisited, pageVisited + userPerPage);
  /*20220616 YN
  (react-paginate參數)
  取頁簽顯示數字 */
  const pageCount = Math.ceil(data.length / userPerPage);
  /*20220616 YN
  (react-paginate參數)
  點選後更換頁面 */
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  /*20220620 YN
  移除功能 */
  const deletFormHandle = (index) => {
    setData(
      data.filter((dataList) => {
        return data[index].roomId !== dataList.roomId;
      })
    );
    // console.log(dataList.partnershipId);
  };
  /*20220622 YN
  新增表單時，modal顯示狀態設定*/
  const handleAddShow = () => setAddShow(true);
  const handleAddClose = () => setAddShow(false);
  /*20220622 YN
  修改表單時，modal顯示狀態設定*/
  const handleEditShow = (index) => {
    setEditShow(true);
    setEditData(data[index]);
    // console.log(data[index])
  };

  // const handleEditShow = () => setEditShow(true);
  const handleEditClose = () => setEditShow(false);
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
                <button
                  onClick={handleAddShow}
                  className="btn btn-success ms-2"
                >
                  新增房型
                </button>
                <Modal
                  size="xl"
                  // aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={addShow}
                  onHide={handleAddClose}
                >
                  <Modal.Header closeButton></Modal.Header>
                  <RoomAdd
                    data={data}
                    addShow={addShow}
                    setAddShow={setAddShow}
                  />
                </Modal>
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
      <Modal
        size="xl"
        // aria-labelledby="contained-modal-title-vcenter"
        centered
        show={editShow}
        onHide={handleEditClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <RoomViewEdits />
      </Modal>
    </>
  );
}

export default Room;
