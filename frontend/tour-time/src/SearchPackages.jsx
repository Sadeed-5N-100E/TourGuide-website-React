import React, { useState } from 'react';
import { Input, Button, Space, Tooltip } from 'antd';
import { DownOutlined, UpOutlined, SearchOutlined, LeftOutlined } from '@ant-design/icons';
import CardPackages from './CardPackages';
import { FaLanguage } from 'react-icons/fa';

const SearchBar = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showLocation, setShowLocation] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [fullSearch, setFullSearch] = useState({
    name: '', location:'', language:'', tourism_style:''
  })

  const filterGuides = ({key, event})=>{
    setFullSearch({...fullSearch,
      [key]:event.target.value}
    )

  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Space direction="vertical" style={{ width: 700, marginBottom: 20 }}>
        {showLocation && (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Input
              placeholder="Search by location..."
              allowClear
              size="middle"
              style={{ width: '100%' }}
              onChange={(e)=>filterGuides({key:"location", event:e})}
            />
            <Button
              icon={<SearchOutlined />}
              style={{ marginLeft: 8 }}
            />
            <Tooltip title={showAdvanced ? "Hide Advanced Search" : "Show Advanced Search"}>
              <Button
                icon={showAdvanced ? <UpOutlined /> : <DownOutlined />}
                onClick={() => setShowAdvanced(!showAdvanced)}
                style={{ marginLeft: 8 }}
              />
            </Tooltip>
          </div>
        )}
        {showAdvanced && showLocation && (
          <>
            <Input placeholder="Name" style={{ width: '100%' }} />
            <Input placeholder="Language" style={{ width: '100%' }} />
            <Input placeholder="Tourism Style" style={{ width: '100%' }} />
          </>
        )}
        {showDescription ? (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Input.TextArea
              placeholder="Describe the Type of Tour and Guide you Dream of.."
              style={{ width: '100%', height: '100px', marginBottom: 8 }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" onClick={() => {setShowDescription(false); setShowLocation(true);}} style={{ width: 'calc(100% - 40px)' }}>
                Find Match !
              </Button>
              <Button icon={<LeftOutlined />} onClick={() => {setShowDescription(false); setShowLocation(true);}} style={{ width: '32px' }} />
            </div>
          </div>
        ) : (
          <Button type="primary" onClick={() => {setShowDescription(true); setShowLocation(false);}} style={{ width: '100%' }}>
            Find Me a Match !
          </Button>
        )}
      </Space>
      <CardPackages/>
    </div>
  );
};

export default SearchBar;