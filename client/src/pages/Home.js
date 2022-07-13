import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { loginOrNot } from '../App'
import ActionAreaCard from '../components/Card/Card';
import Example from '../components/Carousel/Carousel';
import QuiltedImageList from '../components/ImageList/ImageList'

import "../pages/Home.css"


export default function Home() {
  return (
    <div className='wrap'>
      <Navbar />
      <div>
        <img className='backImg' src='探索照片.webp'>
        </img>
      </div>

      <div className='container-xxl'>

        <button onClick={loginOrNot}>是否有登入，有的話回傳檔案在res.data[0]</button>

        <br />
        <br />
        <h3>KOMORU 亞洲第一日租旅人平台</h3>
        <br />
        <p>Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."1914 translation by H. Rackham
          "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
        </p>
        <br />
        <br />
        <div className='Komoruthree'>

          <div>
            <ActionAreaCard />
          </div>

          <div>
            <ActionAreaCard />
          </div>

          <div>
            <ActionAreaCard />
          </div>

        </div>
        <br />
        <br />
        <div className='Stepseven'>
          <Example />
        </div>
        <br />
        <br />

        <div className='RoomList'>
          <QuiltedImageList />
        </div>

        <br />
        <br />
        <br />
        <br />
        
      </div>
      <div>
          <Footer />
        </div>
    </div>
  )
}