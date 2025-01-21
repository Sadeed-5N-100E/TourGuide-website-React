import React from 'react'
import { Card, Avatar, Button, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const dummyTourists = [
  {
    name: "John Doe",
    language: "English",
    country: "United States"
  },
  {
    name: "Maria Garcia",
    language: "Spanish",
    country: "Spain"
  },
  {
    name: "Maria Garcia",
    language: "Spanish",
    country: "Spain"
  },
  {
    name: "Maria Garcia",
    language: "Spanish",
    country: "Spain"
  },
  {
    name: "Maria Garcia",
    language: "Spanish",
    country: "Spain"
  }
]

const UserProfileCard = ({ name, language, country }) => {
  return (
    <Card
      hoverable
      style={{
        marginTop: 16,
        borderRadius: 8,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        width: 300
      }}
    >
      <Card.Meta
        avatar={<Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />}
        title={<Title level={4} style={{ color: '#1890ff' }}>{name}</Title>}
        description={
          <>
            <Text strong style={{ color: '#52c41a' }}>Language:</Text> <Text>{language}</Text>
            <br />
            <Text strong style={{ color: '#faad14' }}>Country:</Text> <Text>{country}</Text>
          </>
        }
      />
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>
          Accept
        </Button>
        <Button type="primary" danger>
          Reject
        </Button>
      </div>
    </Card>
  )
}

const Request = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {dummyTourists.map((tourist, index) => (
        <UserProfileCard
          key={index}
          name={tourist.name}
          language={tourist.language}
          country={tourist.country}
        />
      ))}
    </div>
  )
}

export default Request