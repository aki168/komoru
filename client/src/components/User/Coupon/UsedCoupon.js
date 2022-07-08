import {Card} from 'react-bootstrap'


export default function UsedCoupon(props){

  return(
    <div className="p-3 ">
        <Card
          text="secondary"
          style={{ width: '100%', background:'#d9d9d9'  }}
          className="mb-1 p-4"
        >
          {/* <Card.Header>Header</Card.Header> */}
          <Card.Body>
            <Card.Title>
              優惠代碼 {props.couponTitle}
            </Card.Title>
            <Card.Text>
              <p className='fs-3'>折扣 {props.discount} 元</p>
            </Card.Text>
          </Card.Body>
        </Card>
{/* 
      <h3 className="text-secondary">優惠代碼 {props.couponTitle}</h3>
      <p>折扣 {props.discount} 元</p> */}
    </div>
  )
}