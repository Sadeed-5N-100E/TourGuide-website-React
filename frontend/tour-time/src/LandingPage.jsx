import React from 'react';
import AppCarousel from './AppCarousel';
import styled from 'styled-components';
import gotour from './gotour.png'
import { Menu, Dropdown, Card, Rate, Button, Form, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import img6 from './Images/image6.jpg'
import img7 from './Images/image7.jpg'
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const StyledButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Paper = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  padding: 100px 0;
`;

const FeatureIcon = styled.i`
  font-size: 48px;
  color: #3498db;
  margin-bottom: 20px;
`;

const MenuBar = styled.nav`
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 60px;
  width: auto;
`;

const MenuItems = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-left: 30px;
`;

const MenuLink = styled.a`
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;

const StyledDropdown = styled(Dropdown)`
  .ant-dropdown-menu {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .ant-dropdown-menu-item {
    padding: 10px 20px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const TourGuideSection = styled.div`
  background: url('path/to/your/carousel/image.jpg') no-repeat center center;
  background-size: cover;
  padding: 50px 0;
`;

const ContactFormSection = styled.div`
  background-color: #f5f5f5;
  padding: 50px 0;
`;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  padding: 40px 0;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FooterColumn = styled.div`
  flex: 1;
  margin-right: 20px;
  margin-bottom: 20px;

  &:last-child {
    margin-right: 0;
  }
`;

const FooterHeading = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
`;

const FooterLink = styled.a`
  color: #ddd;
  text-decoration: none;
  display: block;
  margin-bottom: 10px;

  &:hover {
    color: white;
  }
`;

const Copyright = styled.p`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #555;
`;

const LandingPage = () => {
  const loginMenu = (
    <Menu>
      <Menu.Item key="1">
        <MenuLink href="/login">Tourist Login</MenuLink>
      </Menu.Item>
      <Menu.Item key="2">
        <MenuLink href="/login-guide">Tour Guide Login</MenuLink>
      </Menu.Item>
    </Menu>
  );

  const tourGuides = [
    {
      first_name: "John",
      last_name: "Doe",
      whatsapp: true,
      telegram: true,
      bio: "Experienced tour guide with a passion for adventure.",
      country: "USA",
      languages_spoken: ["English", "Spanish"],
      tour_tags: ["Adventure", "Nature"],
      vehicle_info: "4x4 Jeep"
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      whatsapp: true,
      telegram: false,
      bio: "Cultural expert specializing in historical tours.",
      country: "Italy",
      languages_spoken: ["Italian", "English", "French"],
      tour_tags: ["History", "Culture"],
      vehicle_info: "Minivan"
    }
  ];

  const showModal = (tourGuide) => {
    // Implement modal logic here
    console.log("Show modal for", tourGuide.first_name);
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const navigate = useNavigate();
  return (
    <div>
      <MenuBar>
        <MenuContainer>
          <a href="/" rel="noopener noreferer">
            <Logo src={gotour} alt="Go-Tour Logo" />
          </a>
          <MenuItems>
            <MenuItem>
              <StyledDropdown overlay={loginMenu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Login <DownOutlined />
                </a>
              </StyledDropdown>
            </MenuItem>
            <MenuItem><MenuLink href="#">About Us</MenuLink></MenuItem>
            <MenuItem><MenuLink href="#">Contact Us</MenuLink></MenuItem>
          </MenuItems>
        </MenuContainer>
      </MenuBar>
      <HeroSection>
        <Container>
          <Grid style={{ alignItems: 'center', minHeight: '70vh' }}>
            <div>
              <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: 'bold' }}>Discover Your Next Adventure</h1>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', fontWeight: '300' }}>Explore the world with Go-Tour</h3>
              
              <StyledButton onClick={()=>{navigate("/login")}}>
                Start Your Journey
              </StyledButton>
            </div>
            <div>
              <Paper style={{ overflow: 'hidden', borderRadius: '10px' }}>
                <AppCarousel />
              </Paper>
            </div>
          </Grid>
        </Container>
      </HeroSection>
      <Container>
        <Grid style={{ margin: '6rem 0' }}>
          <Paper>
            <FeatureIcon className="fas fa-compass" />
            <h4 style={{ marginBottom: '15px', fontSize: '1.5rem' }}>Unique Experiences</h4>
            <p>Discover hidden gems and off-the-beaten-path adventures.</p>
          </Paper>
          <Paper>
            <FeatureIcon className="fas fa-users" />
            <h4 style={{ marginBottom: '15px', fontSize: '1.5rem' }}>Expert Local Guides</h4>
            <p>Immerse yourself in local culture with knowledgeable guides.</p>
          </Paper>
          <Paper>
            <FeatureIcon className="fas fa-shield-alt" />
            <h4 style={{ marginBottom: '15px', fontSize: '1.5rem' }}>Worry-Free Booking</h4>
            <p>Flexible cancellation and top-notch customer support.</p>
          </Paper>
        </Grid>
      </Container>
      <TourGuideSection>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: 'black' }}>Our Experienced Local Tour Guide</h1>
        <Container>
          
          <Grid>
            {tourGuides.map((tourGuide, index) => (
              <Card
                key={index}
                style={{
                  width: '100%',
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
                      src={index === 0 ? img6 : img7}
                      alt="Tour Guide"
                      style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div>
                        <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>{tourGuide.first_name} {tourGuide.last_name}</h2>
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
                      <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem' }}><strong>Bio:</strong> {tourGuide.bio}</p>
                      <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}><strong>Location:</strong> {tourGuide.country}</p>
                      <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}><strong>Language:</strong> {tourGuide.languages_spoken.join(', ')}</p>
                      <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}><strong>Tourism Style:</strong> {tourGuide.tour_tags.join(', ')}</p>
                      <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}><strong>Vehicle:</strong> {tourGuide.vehicle_info}</p>
                    </div>
                    <Button type="primary" style={{ float: 'right' }} onClick={() => showModal(tourGuide)}>View Profile</Button>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </TourGuideSection>
      <ContactFormSection>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Contact Us</h2>
          <Form
            name="contact"
            onFinish={onFinish}
            layout="vertical"
            style={{ maxWidth: '500px', margin: '0 auto' }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: 'Please input your message!' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Container>
      </ContactFormSection>
      <Footer>
        <Container>
          <FooterContainer>
            <FooterColumn>
              <FooterHeading>About Us</FooterHeading>
              <FooterLink href="#">Our Story</FooterLink>
              <FooterLink href="#">Team</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
            </FooterColumn>
            <FooterColumn>
              <FooterHeading>Services</FooterHeading>
              <FooterLink href="#">Tour Guide</FooterLink>
            </FooterColumn>
            <FooterColumn>
              <FooterHeading>Support</FooterHeading>
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </FooterColumn>
            <FooterColumn>
              <FooterHeading>Follow Us</FooterHeading>
              <FooterLink href="#">Facebook</FooterLink>
              <FooterLink href="#">Twitter</FooterLink>
              <FooterLink href="#">Instagram</FooterLink>
            </FooterColumn>
          </FooterContainer>
        </Container>
      </Footer>
    </div>
  )
}
export default LandingPage;