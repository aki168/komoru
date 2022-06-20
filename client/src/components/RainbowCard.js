import React from "react"
import './RainbowCard.css'


export default function RainbowCard() {
  return (
    <div className="rainbowCard mb-32">
      <p className="rainbowCard--CN">生命就是自我探索的旅程。</p>
      <p className="rainbowCard--EN">Title 3Title 3Title 3Title 3Title 3Title 3T</p>
      <a className="rainbowCard--download" href="localhost:3000">
        <img src="icon-download.png" alt="download" />
      </a>
    </div>
  )

}