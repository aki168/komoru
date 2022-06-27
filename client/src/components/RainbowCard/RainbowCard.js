// import { useState } from "react"
import './RainbowCard.css'
import { Modal } from 'react-bootstrap';




export default function RainbowCard() {


  return (

    
    <Modal.Dialog
      size="lg">
      <Modal.Header closeButton/>
      <Modal.Body>
      <div className="rainbowCard mb-32">
      <p className="rainbowCard--CN">生命就是自我探索的旅程。</p>
      <p className="rainbowCard--EN">Title 3Title 3Title 3Title 3Title 3Title 3T</p>
      <a className="rainbowCard--download" href="/user">
        <img src="icon-download.png" alt="download" />
      </a>
    </div>
      </Modal.Body>
    </Modal.Dialog>


  )

}