import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate } from 'react-router-dom'
import { Modal } from "react-bootstrap";
// import OrderData from "./db_OrderList.json";
import OrderView from './OrderView'
import BackstageLoding from "../../../components/BackstageLoading";

function Order() {
  /* 20220616 YG
  初始化使用者資料
  初始化頁數*/
  // const [users, setUsers] = useState(OrderData.slice(0));
  const [pageNumber, setPageNumber] = useState(0);
  /*20220617 YN
  接後端資料初始化*/
  const [data, setData] = useState([]);
  /*20220628 YN
  入住資料狀態初始化*/
  const [orderData, setOrderData] = useState([]);

  /*20220622 YN
  檢視表單modal顯示狀態初始化*/
  const [editShow, setEditShow] = useState(false);

  /*20220624 YN
 取當下選取列表時的data狀態初始化*/
  const [editData, setEditData] = useState();

  /*20220707 YN
 資料載入過程初始化*/
  const [loading, setLoading] = useState(false);

  /*20220704 YN
  登入狀態為false自動轉跳Login頁面 */
  let navigate = useNavigate()
  useEffect(() => {
    axios({
      method: "POST",
      url: "http://localhost:5000/employee/checkIsLogin",
      withCredentials: true
    })
      .then((res) => {
        if (res.data.status === false) {
          navigate('/BackstageLogin', { replace: true })
          // console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }, [])


  /*20220617 YN
  接後端api取後端資料*/
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/order/getOrderDataListWithRoomDescAndStayNight"
      )
      .then((res) => {
        // console.log(res.data.dataList);
        setData(res.data.dataList);
        setLoading(true)
      })
      .catch((err) => console.log(err));
  }, []);

  /*20220628 YN
  取得目前選取列表orderData資料，並設定orderData狀態*/
  const orderStatusChange = (index) => {
    setOrderData(data[index]);
  };
  /*20220628 YN
  判斷目前取得的orderStatus狀態資料是否為"未入住"，並轉換狀態*/
  const unCheckInHandle = () => {
    // console.log(orderData.orderStatus)
    if (orderData.orderStatus !== "未入住") {
      if (window.confirm("確定修改嗎?")) {
        const orderLists = {
          orderId: orderData.orderId,
          orderStatus: "0",
          employeeId: "1",
        };
        console.log(orderLists);
        fetch("http://localhost:5000/order/updateOrderStatusByOrderId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(orderLists),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((e) => {
            console.error(e);
          });
        window.location.reload(false);
        alert("修改成功");
      }
    } else {
      alert("目前以'未入住'狀態");
    }
  };
  /*20220628 YN
  判斷目前取得的orderStatus狀態資料是否為"已入住"，並轉換狀態*/
  const checkInHandle = () => {
    // console.log(orderData.orderStatus)

    if (orderData.orderStatus !== "已入住") {
      if (window.confirm("確定修改嗎?")) {
        const orderLists = {
          orderId: orderData.orderId,
          orderStatus: "1",
          employeeId: "1",
        };
        console.log(orderLists);
        fetch("http://localhost:5000/order/updateOrderStatusByOrderId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(orderLists),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((e) => {
            console.error(e);
          });
        window.location.reload(false);
        alert("修改成功");
      }
    } else {
      alert("目前為'已入住'狀態");
    }
  };

  /*20220628 YN
  判斷目前取得的orderStatus狀態資料是否為"已退房"，並轉換狀態*/
  const checkOutHandle = () => {
    // console.log(orderData.orderStatus)
    if (orderData.orderStatus !== "已退房") {
      if (window.confirm("確定修改嗎?")) {
        const orderLists = {
          orderId: orderData.orderId,
          orderStatus: "2",
          employeeId: "1",
        };
        console.log(orderLists);
        fetch("http://localhost:5000/order/updateOrderStatusByOrderId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(orderLists),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((e) => {
            console.error(e);
          });
        window.location.reload(false);
        alert("修改成功");
      }
    } else {
      alert("目前以'已退房'狀態");
    }
    window.location.reload(false);
  };

  /*20220617 YN
  利用變數取畫面上顯示資料 */
  const arr = data.map((data, index) => {
    return (
      // console.log(values.hotelTitle)
      <tr key={index} className="form-check-label">
        <td>
          <input
            className="form-check-input"
            type="radio"
            value={data.orderId}
            name="flexRadioDefault"
            onChange={() => orderStatusChange(index)}
          />
        </td>
        <td>{data.orderId}</td>
        <td>{data.orderNumber}</td>
        <td>{data.roomType}</td>
        <td>{data.orderStartDate}</td>
        <td>{data.stayNight}</td>
        <td>{data.orderStatus}</td>
        <td>
          <button
            onClick={() => handleViewShow(index)}
            className="btn btn-success"
          >
            檢視
          </button>
        </td>
      </tr>
    );
  });

  /*20220705 YN
 檢視表單，modal顯示狀態設定*/
  const handleViewShow = (index) => {
    setEditShow(true);
    setEditData(data[index]);
    // console.log(data[index].orderId)
  };

  // const handleEditShow = () => setEditShow(true);
  const handleEditClose = () => setEditShow(false)

  /*20220616 YG
  設定畫面上資料個數*/
  const userPerPage = 10;
  /*20220616 YG
  總頁面資料個數 */
  const pageVisited = pageNumber * userPerPage;
  /*20220616 YG
  利用變數取畫面上顯示資料 */
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
  // console.log(loading)
  return (
    <>
      <div className="mx-5  mb-5">
        <h2 className="mt-3 mb-5">訂單管理</h2>
        <div>
          <div className="row ms-5 mb-3">
            <div className="col-sm-3">
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
              </div>
            </div>
            <div className="col-sm-7">
              <div className="d-flex justify-content-end">
                <button onClick={unCheckInHandle} className=" btn btn-success">
                  未入住
                </button>
                <button
                  onClick={checkInHandle}
                  className="btn btn-success ms-2"
                >
                  已入住
                </button>
                <button
                  onClick={checkOutHandle}
                  className="btn btn-success ms-2"
                >
                  已退房
                </button>
              </div>
            </div>
            <div className="col-sm-2 d-flex justify-content-end">
              <nav aria-label="Page navigation example">
                <ul className="pagination">

                </ul>
              </nav>
            </div>
          </div>
          <div className="row ms-5">
            <div className="col-sm-10">
              {loading ? <>
                <table className="table table-hover text-center align-middle data-click-to-select='true' ">
                  <thead>
                    <tr>
                      <td></td>
                      <td>訂單編號</td>
                      <td>訂購姓名</td>
                      <td>區域/房型</td>
                      <td>入住日期</td>
                      <td>入住天數</td>
                      <td>入住狀態</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>{displayUsers}</tbody>
                </table>
              </> : <div className="d-flex justify-content-center"><BackstageLoding /></div>}
              <div className="d-flex justify-content-center">
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
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      <Modal
        size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        centered
        show={editShow}
        onHide={handleEditClose}
      >
        <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
        {editData && <OrderView
          // editShow={editShow}
          setEditShow={setEditShow}
          editData={editData}
        />}
      </Modal>
    </>
  );
}

export default Order;
