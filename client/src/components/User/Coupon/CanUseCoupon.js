import { Card } from 'react-bootstrap'

export default function CanUseCoupon(props) {

  return (
    <div className="p-3">
      <Card
        text="white"
        style={{ width: '100%', background:'#ED8C4E' }}
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
      {/* <h3 className="text-danger">優惠代碼 {props.couponTitle}</h3>
      <p>折扣 {props.discount} 元</p> */}
    </div>
  )
}