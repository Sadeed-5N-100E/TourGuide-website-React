import React, { useState, useEffect } from 'react'
import { Card, List, Avatar, Typography, Row, Col } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

const PreviousMatch = () => {
  const [previousMatches, setPreviousMatches] = useState([])

  useEffect(() => {
    const fetchPreviousMatches = async () => {
      try {
        const response = await axios.get('/api/previous-matches')
        setPreviousMatches(response.data)
      } catch (error) {
        console.error('Error fetching previous matches:', error)
      }
    }

    fetchPreviousMatches()
  }, [])

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Previous Tour Guide Matches</Title>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={previousMatches}
        renderItem={(match) => (
          <List.Item>
            <Link to={`/tour-guide/${match.guideId}`}>
              <Card
                hoverable
                cover={<img alt={match.guideName} src={match.guideImage} />}
              >
                <Card.Meta
                  avatar={<Avatar src={match.guideAvatar} />}
                  title={match.guideName}
                  description={
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <Text strong>Location:</Text> {match.location}
                      </Col>
                      <Col span={24}>
                        <Text strong>Date:</Text> {match.date}
                      </Col>
                      <Col span={24}>
                        <Text strong>Rating:</Text> {match.rating}
                      </Col>
                    </Row>
                  }
                />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  )
}

export default PreviousMatch