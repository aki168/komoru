import React from "react"

export default function OrderListDaily(props) {
  return (
    <div className="OrderListDaily p-2 row">
      <h2 className="pt-3 pb-2">{props.date}</h2>
      <ul className="text-secondary col-4">
        <li className="pt-2 pb-2 ">
          <h4>・10:00 - 11:00    Check in</h4>
          <p>　　前往預定飯店並參觀飯店空間</p>
        </li>
        <li className="pt-2 pb-2 ">
          <h4>・11:00 - 12:00    改變的開始</h4>
          <p>　　前往飯店櫃檯領取上一位旅客的回饋</p>
        </li>
        <li className="pt-2 pb-2 ">
          <h4>・12:00 - 14:00    不一樣的用餐體驗</h4>
          <button src="#" className="bg-white text-primary fw-bold ms-3">
            前往 創作麵坊・鮭の大助 餐廳用餐
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
          </button>
        </li>
      </ul>

      <ul className="text-secondary col-4">
        <li className="pt-2 pb-2 ">
          <h4>・14:00 - 16:00    探索時刻</h4>
          <button src="#" className="bg-white text-primary fw-bold ms-3">
            勤美誠品書店挑選暢銷排行一本閱讀  
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
          </button>
        </li>
        <li className="pt-2 pb-2 ">
          <h4>・16:00 - 17:00    Tea Time</h4>
          <button src="#" className="bg-white text-primary fw-bold ms-3">
            coffee stopover 點選一杯淺培風味咖啡  
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
          </button>
        </li>
        <li className="pt-2 pb-2 ">
          <h4>・17:00 - 18:00    沈澱＆聆聽</h4>
          <p>　　自由活動 / 晚餐 / 與自己對話</p>
        </li>
      </ul>

      <ul className="text-secondary col-4">
        <li className="pt-2 pb-2 ">
          <h4>・21:00 - 23:00    永續傳承</h4>
          <p>　　前往飯店櫃檯留言你今日的觀察及改變</p>
        </li>
      </ul>

    </div>
  )

}