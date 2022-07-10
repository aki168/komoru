import axios from 'axios';
import React, { useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import './RainbowCard.css'

export default function RainbowCard(props) {

  // 0708 aki-彩虹卡顯示開關
  const [show, setShow] = useState(true);
  // // 0708 aki-金句內容資料獲取
  const [rainbowCard, setRainbowCard] = useState('')


  // // 0708 彩虹卡背景色產生
  // const getRainbowColor = () => {
  //   const colors = ['#ff0000','#ffa500','#ffff00','#008000','#0000ff','#4b0082','#ee82ee'];
  //   setRandom
  // }

  // 0708 獲取金句
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/rainbowCard/getRainbowCard",
      data: {
        token: localStorage.token
      }
    }).then((res) => {
      console.log(res)
      setRainbowCard(res.data.dataList.getRainbowCard[0].rainbowCardContent)
      setShow(true)
    })
    .catch((err) => {
      console.log(err)
    })
  }
    , [])



  return (
    <>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        className="w-100"
        aria-labelledby="example-custom-modal-styling-title"
      >
        {/* <Modal.Header closeButton>
        </Modal.Header> */}
        <Modal.Body>
          <div className="rainbowCard">
            <p className="rainbowCard--EN">KOMORU想送給你一句話...</p>
            <p className="rainbowCard--CN">{rainbowCard}</p>
            {/* <a className="rainbowCard--download" href="/user">
              <img src="icon-download.png" alt="download" />
            </a> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
