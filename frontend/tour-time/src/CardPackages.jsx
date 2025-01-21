import React, { useState, useEffect } from 'react';
import { Card, Button, Rate, Modal } from 'antd';
import axios from 'axios';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { Input, Space, Tooltip } from 'antd';
import { DownOutlined, UpOutlined, SearchOutlined, LeftOutlined } from '@ant-design/icons';
import { FaLanguage } from 'react-icons/fa';

const PackageHolder = () => {
  const [tourGuides, setTourGuides] = useState([]);
  const [filteredTourGuides, setFilteredTourGuides] = useState([]);
  const [selectedTourGuide, setSelectedTourGuide] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tourGuidesReview, setTourGuidesReview] = useState([]);
  const [Description, setDescription] = useState('')


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

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://gotour.today/api/tourguides', {
        params: fullSearch,
        headers: {"authorization": "Bearer " + localStorage.getItem("token")}
      });
      setTourGuides(response.data);
    } catch (error) {
      console.error('Error searching tour guides:', error);
    }
  }

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const response = await axios.get('http://gotour.today/api/tourguides',
          {headers:{"authorization": "Bearer " + localStorage.getItem("token")} } 
        );
        setTourGuides(response.data);
        // setFilteredTourGuides(response.data);
      } catch (error) {
        console.error('Error fetching tour guides:', error);
      }
    };

    const fetchTourGuidesReview = async () => {
      try {
        const response = await axios.get('http://gotour.today/api/reviews');
        setTourGuidesReview(response.data);
      } catch (error) {
        console.error('Error fetching tour guides review:', error);
      }
    };

    

    fetchTourGuides();
    fetchTourGuidesReview();
  }, []);

  const sentGuideID = async (tourGuideId) => {
    try {
      console.log(tourGuides)
      const response = await axios.get('http://gotour.today/api/match_request?tourguide_id='+tourGuideId,  
        {headers: {"authorization": "Bearer " + localStorage.getItem("token")}
        
      })
    } catch (error) {
      console.error('Error sending guide ID:', error)
    }
  }

  const sentDescription = async(descriptions) => {
    const response = await axios.get('http://gotour.today/api/find_match?user_input='+descriptions)
    console.log(response)
    const guides = Array.from(response.data);
    console.log(guides)
    setTourGuides(guides);
  }

  const showModal = (tourGuide) => {
    setSelectedTourGuide(tourGuide);
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

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
            onClick={handleSearch}
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
          <Input placeholder="Name" style={{ width: '100%' }} onChange={(e)=>filterGuides({key:"name", event:e})} />
          <Input placeholder="Language" style={{ width: '100%' }} onChange={(e)=>filterGuides({key:"language", event:e})} />
          <Input placeholder="Tourism Style" style={{ width: '100%' }} onChange={(e)=>filterGuides({key:"tourism_style", event:e})} />
        </>
      )}
      {showDescription ? (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Input.TextArea
            placeholder="Describe the Type of Tour and Guide you Dream of.."
            style={{ width: '100%', height: '100px', marginBottom: 8 }}
            onChange={(e)=> setDescription(e.target.value) }
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" onClick={() => {setShowDescription(false); setShowLocation(true); sentDescription(Description)}} style={{ width: 'calc(100% - 40px)' }}>
              Find Match !
            </Button>
            <Button icon={<LeftOutlined />} onClick={() => {setShowDescription(false); setShowLocation(true);}} style={{ width: '32px' }} />
          </div>
        </div>
      ) : (
        <Button type="primary" onClick={() => {setShowDescription(true); setShowLocation(false); }} style={{ width: '100%' }}>
          Find Me a Match !
        </Button>
      )}
    </Space>
    <Space direction="vertical" size={16}>
      {Array.isArray(tourGuides) && tourGuides.map((tourGuide, index) => (
        <Card
          key={index}
          style={{
            width: 700,
            border: '2px solid #4CAF50',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            transition: 'transform 0.3s ease-in-out',
            ':hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', padding: '20px' }}>
            <div style={{ marginRight: '24px' }}>
              <img
                src="https://via.placeholder.com/150/000000/FFFFFF/?text=Avatar"
                alt="Tour Guide"
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ margin: '0 0 10px 0' }}>{tourGuide.first_name} {tourGuide.last_name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {tourGuide.whatsapp && <FaWhatsapp style={{ marginRight: '10px', fontSize: '20px', color: '#25D366' }} />}
                    {tourGuide.telegram && <FaTelegram style={{ marginRight: '10px', fontSize: '20px', color: '#0088cc' }} />}
                  </div>
                </div>
                <div>
                  <p style={{ margin: '0 0 5px 0' }}>Rating: <Rate disabled defaultValue={4.5} /></p>
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '0 0 10px 0' }}><strong>Bio:</strong> {tourGuide.bio}</p>
                <p style={{ margin: '0 0 5px 0' }}><strong>Location:</strong> {tourGuide.country + ": " + tourGuide.tour_cities.join(', ')}</p>
                <p style={{ margin: '0 0 5px 0' }}><strong>Language:</strong> {tourGuide.languages_spoken.join(', ')}</p>
                <p style={{ margin: '0 0 5px 0' }}><strong>Tourism Style:</strong> {tourGuide.tour_tags.join(', ')}</p>
                <p style={{ margin: '0 0 5px 0' }}><strong>Vehicle:</strong> {tourGuide.vehicle_info}</p>
              </div>
              <Button type="primary" style={{ float: 'right' }} onClick={() => showModal(tourGuide)}>View Profile</Button>
            </div>
          </div>
        </Card>
      ))}

      <Modal
        title="Tour Guide Profile"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="match" type="primary" onClick={() => sentGuideID(selectedTourGuide.id)}>Match</Button>,    
          <Button key="back" onClick={handleCancel}>Close</Button>,
        ]}
        width={800} // Increase the width of the modal
      >
        {selectedTourGuide && (
          <div>
            <div style={{ display: 'flex', marginBottom: 16 }}>
              <img
                src="https://via.placeholder.com/150/000000/FFFFFF/?text=Avatar"
                alt="Tour Guide"
                style={{ width: 150, height: 150, borderRadius: '50%', marginRight: 16 }}
              />
              <div>
                <h3>{selectedTourGuide.first_name} {selectedTourGuide.last_name}</h3>
                <p>Rating: <Rate disabled defaultValue={4.5} /></p> 
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <p>Bio: {selectedTourGuide.bio}</p>
                <p>Location: {selectedTourGuide.country}</p>
                <p>Language: {selectedTourGuide.languages_spoken.join(', ')}</p>
                <p>Tourism Style: {selectedTourGuide.tour_tags.join(', ')}</p>
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <h4>Reviews</h4>
              {/* Placeholder for reviews */}
            </div>
          </div>
        )}
      </Modal>
    </Space>
    </div>
  );
};

export default PackageHolder;