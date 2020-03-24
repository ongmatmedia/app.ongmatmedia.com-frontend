import { Modal, Row, Col, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { isMobileDevice, getRandomInt, range, randomDate } from '../../../helpers/utils';

const dataPlan = {
  labels: [
    'Playing',
    'Remaining'
  ],
  datasets: [{
    data: [100, 900],
    backgroundColor: [
      '#36A2EB',
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#36A2EB',
      '#FFCE56'
    ]
  }]
};

const dataViewers = {
  labels: [...range(1, 100)].map(el => randomDate(new Date(2012, 0, 1), new Date()).toLocaleTimeString("vi", {
    hour12: true
  })),
  datasets: [
    {
      label: 'Real-time viewers',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [...range(1, 100)].map(el => getRandomInt(1, 1000))
    }
  ]
};

const options = {
  scales: { xAxes: [{ display: false, }], yAxes: [{ display: true, }], },
};

export const BuffViewersDetailModal = (props: {
  visible: boolean
  onClose: Function
}) => {

  const [data, setData] = useState(dataPlan)

  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        ...data,
        datasets: [{
          data: [...data.datasets[0].data.map((el, index) => index == 0 ? el + 10 : el - 10)],
          backgroundColor: [
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#36A2EB',
            '#FFCE56'
          ]
        }]
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [props.visible])

  return (
    <Modal
      width="80%"
      visible={props.visible}
      destroyOnClose
      closable={true}
      title="Buff viewers for livestream"
      style={{ textAlign: "center", top: 0 }}
      onCancel={() => props.onClose()}
      footer={null}
    >
      <Row>
        <Col xs={24}>
          <Line data={dataViewers} options={options} />
        </Col>
        <Col xs={24} style={{ marginTop: 15 }}>
          <Doughnut data={data} />{"Plan"}
        </Col>
      </Row>
    </Modal>
  )
}