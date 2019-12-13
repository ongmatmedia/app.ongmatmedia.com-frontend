import { Button, Card, Col, Form, Row, Spin, Alert, message } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { InputNumberAutoSelect } from '../../components/InputNumberAutoSelect';
import { GraphQLWrapper } from '../../containers/GraphQLWrapper';
import { update_pricing } from '../../relayjs-mutations/update_pricing';
import { ServicePricing } from '../../schema/User/ServicePricing';
import { fetchQuery } from 'relay-runtime';
import { RelayEnvironment } from '../../configs/relayjs';
import { User } from '../../schema/User/User';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

const query = graphql`
    query UpdatePriceQuery{
        pricing{
            buff_viewers_livestream
            vip_viewers_livestream
            livestream{
              p480
              p720
              p1080
            }
        }
        me{
          pricing{
            buff_viewers_livestream
            vip_viewers_livestream
            livestream{
              p480
              p720
              p1080
            }
          }
        }
    }
`

const reloadPricingData = () => fetchQuery(RelayEnvironment, query, {});

const UpdatePriceWithData = (props: { pricing: ServicePricing, me: User }) => {

  const [loading, set_loading] = useState<boolean>(false);
  const [error, set_error] = useState<string | null>(null);
  const [priceBuffViewers, setPriceBuffViewers] = useState<number>(props.pricing.buff_viewers_livestream);
  const [priceVipViewers, setPriceVipViewers] = useState<number>(props.pricing.vip_viewers_livestream);

  const handleSubmit = async () => {
    set_loading(true)
    set_error('');
    try {
      await update_pricing({
        buff_viewers_livestream: priceBuffViewers,
        vip_viewers_livestream: priceVipViewers,
        livestream: {
          p480: 1000000,
          p720: 1000000,
          p1080: 1000000
        }
      })
      set_loading(false)
      message.success("Updated successfully")
      reloadPricingData();
    } catch (e) {
      set_error(e.source.errors[0].message)
      set_loading(false)
    }
  }
  return (
    <Form {...formItemLayout}>
      {
        error && <Alert type="error" message={error} />
      }
      <Form.Item label="Buff Viewers Livestream">
        <InputNumberAutoSelect onChangeValue={value => setPriceBuffViewers(value)} defaultValue={props.me.pricing ? props.me.pricing.buff_viewers_livestream : 0} />
        <div>Root's pricing: {props.pricing.buff_viewers_livestream * props.me.price_percent * 0.01}</div>
      </Form.Item>
      <Form.Item label="Vip Viewers Livestream">
        <InputNumberAutoSelect onChangeValue={value => setPriceVipViewers(value)} defaultValue={props.me.pricing ? props.me.pricing.vip_viewers_livestream : 0} />
        <div>Root's pricing: {props.pricing.vip_viewers_livestream * props.me.price_percent * 0.01}</div>
      </Form.Item>
      {/* <Form.Item label="Livestream 480P">
        <InputNumberAutoSelect onChangeValue={() => ''} defaultValue={props.pricing.livestream.p480} />
      </Form.Item>
      <Form.Item label="Livestream 720P">
        <InputNumberAutoSelect onChangeValue={() => ''} defaultValue={props.pricing.livestream.p720} />
      </Form.Item>
      <Form.Item label="Livestream 1080P">
        <InputNumberAutoSelect onChangeValue={() => ''} defaultValue={props.pricing.livestream.p1080} />
      </Form.Item> */}
      <Form.Item wrapperCol={{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 11 }
      }}>
        <Button
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Update
      </Button>
      </Form.Item>
    </Form>
  )
}

export const UpdatePrice = GraphQLWrapper<{ pricing: ServicePricing, me: User }>(query, {}, ({ loading, data }) => (
  <>
    <Row>
      <Col>
        <Card title="Update Price" bordered={false}>
          {(data && !loading) ? <UpdatePriceWithData pricing={data.pricing} me={data.me} /> : (
            <Row type="flex" justify="space-around">
              <Col>
                <Spin size="large" style={{ paddingTop: 50 }} />
              </Col>
            </Row>
          )}
        </Card>
      </Col>
    </Row>
  </>
))


// const UpdatePrice = Form.create<FormComponentProps>()((props: FormComponentProps
// ) => {
//   const [loading, set_loading] = useState<boolean>(false);
//   const [error, set_error] = useState<string | null>(null)

//   const handleSubmit = () => {
//     props.form.validateFields(async (err, values) => {
//       if (!err) {
//         set_loading(true)
//         try {
//           await update_pricing({
//             buff_viewers_livestream: values.buff_viewers_livestream,
//             vip_viewers_livestream: values.vip_viewers_livestream,
//             livestream: {
//               p480: values.p480,
//               p720: values.p720,
//               p1080: values.p1080
//             }
//           })
//           set_loading(false)
//         } catch (e) {
//           set_error(e.source.errors[0].message)
//           set_loading(false)
//         }
//       }
//     });
//   }

//   const hasErrors = (fieldsError: any) => {
//     return Object.keys(fieldsError).some(field => fieldsError[field]);
//   }

//   return (
//     <>
//       <Row>
//         <Col>
//           <Card title="Update Price" bordered={false}>
//             {
//               error && <Alert type="error" message={error} />
//             }
//             <Form {...formItemLayout}>
//               <Form.Item label="Buff Viewers Livestream">
//                 {
//                   props.form.getFieldDecorator('buff_viewers_livestream', {
//                     rules: [{ required: true, type: 'number' }]
//                   })(
//                     <InputNumberAutoSelect onChangeValue={() => ''} defaultValue={123}/>
//                   )
//                 }
//               </Form.Item>
//               <Form.Item label="Vip Viewers Livestream">
//                 {
//                   props.form.getFieldDecorator('vip_viewers_livestream', {
//                     rules: [{ required: true }]
//                   })(
//                     <InputNumberAutoSelect onChangeValue={() => ''} defaultValue={123}/>
//                   )
//                 }
//               </Form.Item>
//               <Form.Item label="Livestream 480P">
//                 {
//                   props.form.getFieldDecorator('p480', {
//                     rules: [{ required: true }]
//                   })(
//                     <InputNumberAutoSelect onChangeValue={() => ''} defaultValue={123}/>
//                   )
//                 }
//               </Form.Item>
//               <Form.Item label="Livestream 720P">
//                 {
//                   props.form.getFieldDecorator('p720', {
//                     rules: [{ required: true }]
//                   })(
//                     <InputNumberAutoSelect onChangeValue={() => ''} defaultValue={123}/>
//                   )
//                 }
//               </Form.Item>
//               <Form.Item label="Livestream 1080P">
//                 {
//                   props.form.getFieldDecorator('p1080', {
//                     rules: [{ required: true }]
//                   })(
//                     <InputNumberAutoSelect onChangeValue={() => ''} defaultValue={123}/>
//                   )
//                 }
//               </Form.Item>
//               <Form.Item wrapperCol={{
//                 xs: { span: 24, offset: 0 },
//                 sm: { span: 16, offset: 11 }
//               }}>
//                 <Button
//                   type="primary"
//                   disabled={hasErrors(props.form.getFieldsError())}
//                   onClick={handleSubmit}
//                   loading={loading}
//                 >
//                   Update
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   )
// })