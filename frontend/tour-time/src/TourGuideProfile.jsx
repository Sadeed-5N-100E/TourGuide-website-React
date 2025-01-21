import React, { useState } from 'react'
import { Form, Input, Button, Typography, Layout, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { Title } = Typography
const { Content } = Layout

const TourGuideProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
    password: '',
    bio: '',
    phone_number: '123-456-7890',
    country: 'Country',
    tour_cities: [],
    has_vehicle: false,
    vehicle_info: '',
    tour_tags: [],
    languages_spoken: [],
    avatar: null,
  })

  const handleEdit = () => setIsEditing(true)

  const handleSave = () => {
    setIsEditing(false)
    console.log('Profile saved:', profile)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }))
  }

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      setProfile((prevProfile) => ({
        ...prevProfile,
        avatar: info.file.response.url,
      }))
    }
  }

  return (
    <Content style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
      <Title level={2} style={{ color: '#1890ff' }}>Tour Guide Profile</Title>
      <Form layout="vertical" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Form.Item label="Profile Picture">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/api/upload"
            onChange={handleAvatarChange}
            disabled={!isEditing}
          >
            {profile.avatar ? (
              <img src={profile.avatar} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <div>
                <UploadOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                <div style={{ marginTop: 8, color: '#1890ff' }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="First Name">
          <Input
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input
            name="last_name"
            value={profile.last_name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Form.Item>
        <Form.Item label="Phone Number">
          <Input
            name="phone_number"
            value={profile.phone_number}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Form.Item>
        <Form.Item label="Country">
          <Input
            name="country"
            value={profile.country}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Form.Item>
        <Form.Item label="Bio">
          <Input.TextArea
            rows={3}
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Form.Item>
        {isEditing ? (
          <Button type="primary" onClick={handleSave} style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>
            Save
          </Button>
        ) : (
          <Button onClick={handleEdit} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', color: 'white' }}>
            Edit
          </Button>
        )}
      </Form>
    </Content>
  )
}

export default TourGuideProfile