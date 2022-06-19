import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import OrderData from "./db_OrderList.json";

function Order() {

  /* 20220616 YG
  初始化使用者資料
  初始化頁數*/
  const [users, setUsers] = useState(OrderData.slice(0));
  const [pageNumber, setPageNumber] = useState(0);


  /*20220616 YG
  設定畫面上資料個數*/
  const userPerPage = 10;
  /*20220616 YG
  總頁面資料個數 */
  const pageVisited = pageNumber * userPerPage;
  /*20220616 YG
  利用變數取畫面上顯示資料 */
  const displayUsers = users
    .slice(pageVisited, pageVisited + userPerPage)
    .map((user) => {
      return (
        <tr key={user.id} className="form-check-label" htmlFor="flexRadioDefault1">
          <td>
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
          </td>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.room}</td>
          <td>{user.date}</td>
          <td>{user.day}</td>
          <td>{user.status}</td>
          <td>
            <a href="" className="btn btn-success">
              檢視
            </a>
          </td>
        </tr>
      );
    }); 
  /*20220616 YG
  (react-paginate參數)
  取頁簽顯示數字 */
  const pageCount = Math.ceil(users.length / userPerPage);
  /*20220616 YG
  (react-paginate參數)
  點選後更換頁面 */
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      <div className="mx-5  mb-5">
        <h2 className="mt-5 mb-5">訂單管理</h2>
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
            <div className="col-sm-5">
              <div className="d-flex justify-content-end">
                <a className=" btn btn-success">未入住</a>
                <a className="btn btn-success ms-2">已入住</a>
                <a className="btn btn-success ms-2">退房</a>
              </div>
            </div>
            <div className="col-sm-2 d-flex justify-content-end">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <ReactPaginate
                    nextLabel='>'
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
            <div className="col-sm-10">
              <table className="table table-hover table-striped text-center align-middle ">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
