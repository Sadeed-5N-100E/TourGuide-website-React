import React, { useState } from 'react'
import { Form, Input, Button, Typography, Layout, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { Title } = Typography
const { Content } = Layout

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
    avatar: null,
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically send the updated profile to your backend
    console.log('Profile saved:', profile)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }))
  }

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      setProfile(prevProfile => ({
        ...prevProfile,
        avatar: info.file.response.url // Assuming the server returns the URL of the uploaded image
      }))
    }
  }

  return (
    <Content style={{ padding: '50px' }}>
      <Title level={2}>User Profile</Title>
      <Form layout="vertical">
        <Form.Item label="Profile Picture">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/api/upload" // Replace with your actual upload API endpoint
            onChange={handleAvatarChange}
            disabled={!isEditing}
          >
            {profile.avatar ? (
              <img src={profile.avatar} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="Name">
          <Input
            name="name"
            value={profile.name}
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
        <Form.Item label="Phone">
          <Input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Form.Item>
        <Form.Item label="Address">
          <Input.TextArea
            rows={3}
            name="address"
            value={profile.address}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Form.Item>
        {isEditing ? (
          <Button type="primary" onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={handleEdit}>Edit</Button>
        )}
      </Form>
    </Content>
  )
}

export default UserProfile