import React from 'react'
import { Card, Row, Col, Button, Typography } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const SubscriptionPlan = () => {
  const plans = [
    {
      title: 'Basic',
      price: '$9.99',
      features: ['1 User', '5 Tours', 'Basic Support'],
      color: '#fafafa',
    },
    {
      title: 'Pro',
      price: '$19.99',
      features: ['5 Users', 'Unlimited Tours', 'Priority Support', 'Analytics'],
      color: '#f0f5ff',
    },
    {
      title: 'Enterprise',
      price: '$49.99',
      features: ['Unlimited Users', 'Unlimited Tours', '24/7 Support', 'Advanced Analytics', 'Custom Features'],
      color: '#f6ffed',
    },
  ]

  return (
    <div style={{ padding: '50px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>Choose Your Subscription Plan</Title>
      <Row gutter={[16, 16]} justify="center">
        {plans.map((plan, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              hoverable
              style={{ backgroundColor: plan.color, height: '100%' }}
              bodyStyle={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <Title level={3} style={{ textAlign: 'center' }}>{plan.title}</Title>
              <Title level={2} style={{ textAlign: 'center', margin: '20px 0' }}>{plan.price}<Text type="secondary" style={{ fontSize: '16px' }}>/month</Text></Title>
              <ul style={{ flexGrow: 1, paddingLeft: '20px' }}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} style={{ marginBottom: '10px' }}>
                    <CheckOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button type="primary" size="large" block style={{ marginTop: '20px' }}>
                Subscribe Now
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default SubscriptionPlan
