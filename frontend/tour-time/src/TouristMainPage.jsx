import React, { useState } from 'react';
import SearchBar from './SearchPackages';
import { Breadcrumb, Layout, Menu, theme, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import gotour from './gotour.png'
import TouristProfile from './TouristProfile';
import PreviousMatch from './PreviousMatch';
import CardPackages from './CardPackages'

const { Header, Content } = Layout;


const items1 = [
  { key: '1', label: 'Discover' },
  { key: '2', label: 'Profile' },
  { key: '3', label: 'Previous Match' },
];

const TouristMainPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState('1');
  

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <CardPackages />;
      case '2':
        return <div><TouristProfile/></div>;
      case '3':
        return <div><PreviousMatch/></div>;
      default:
        return <CardPackages />;
    }
  };

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" style={{ marginRight: '20px', marginLeft: '-24px', display: 'flex', alignItems: 'flex-end' }}>
          <img src={gotour} alt="GoTour" style={{ height: '50px', width: 'auto', objectFit: 'contain', marginBottom: '5px' }} />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
          onClick={({ key }) => setSelectedKey(key)}
        />
        <div className="welcome-message" style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar size={32} icon={<UserOutlined />} style={{ marginRight: '10px' }} />
            <h3 style={{ color: 'white', margin: 0 }}> Welcome User </h3>
        </div>
        
      </Header>
      <Layout>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TouristMainPage;