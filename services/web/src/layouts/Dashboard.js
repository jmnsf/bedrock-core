import React from 'react';
import { withSession } from 'stores';
import { NavLink } from 'react-router-dom';
import { Menu, Icon, Container, Accordion } from 'semantic';
import Footer from 'components/Footer';
import { Layout } from 'components';
import Protected from 'components/Protected';
import Sidebar from './Sidebar';

import logo from 'assets/bedrock.svg';
import favicon from 'assets/favicon.svg';

@withSession
export default class DashboardLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
    };
  }

  onClick = (evt, { index }) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <Sidebar>
        <Sidebar.Menu>
          <Layout style={{ height: '100%' }}>
            <Sidebar.Item as={NavLink} className="logo" to="/">
              <img style={{ height: '30px' }} src={logo} />
            </Sidebar.Item>
            <Layout vertical top spread>
              <Menu
                secondary
                vertical
                fluid
                style={{
                  overflowY: 'auto',
                  margin: '0.5em 0 0 0',
                  padding: '0 0 0 25px',
                }}>
                <Menu.Header>Main Menu</Menu.Header>
                <Menu.Item as={NavLink} to="/shops">
                  <Icon name="store" />
                  Shops
                </Menu.Item>
                <Protected endpoint="users">
                  <Accordion as={Menu} secondary vertical fluid>
                    <Accordion.Title
                      active={activeIndex === 0}
                      index={0}
                      onClick={this.onClick}>
                      <Icon name="users" /> Users
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                      <Menu.Item as={NavLink} to="/users">
                        Users
                      </Menu.Item>
                      <Menu.Item as={NavLink} to="/invites">
                        Invites
                      </Menu.Item>
                    </Accordion.Content>
                  </Accordion>
                </Protected>
              </Menu>
              <Layout
                style={{
                  flex: '0 0 auto',
                  paddingTop: '15px',
                  borderTop: '1px solid #ccc',
                }}>
                <Menu
                  secondary
                  vertical
                  fluid
                  style={{ margin: '0', padding: '0 0 10px 25px' }}>
                  <Menu.Item as={NavLink} to="/company">
                    <Icon name="building" />
                    Bedrock Inc.
                  </Menu.Item>
                  <Menu.Item as={NavLink} to="/settings">
                    <Icon name="cog" />
                    Settings
                  </Menu.Item>
                  <Menu.Item as={NavLink} to="/docs/api/getting-started">
                    <Icon name="terminal" />
                    Docs
                  </Menu.Item>
                  <Menu.Item as={NavLink} to="/logout">
                    <Icon name="sign-out-alt" />
                    Log Out
                  </Menu.Item>
                </Menu>
              </Layout>
            </Layout>
          </Layout>
        </Sidebar.Menu>
        <Sidebar.Content>
          <div className="mheader">
            <Layout horizontal spread center>
              <Layout.Group>
                <NavLink className="mlogo" to="/">
                  <img
                    style={{ height: '15px', marginTop: '2px' }}
                    src={favicon}
                  />
                </NavLink>
              </Layout.Group>
              <Layout.Group>
                <Sidebar.Trigger style={{ marginBottom: '20px' }}>
                  <Icon
                    name="bars"
                    style={{ verticalAlign: 'top', marginTop: '2px' }}
                  />
                </Sidebar.Trigger>
              </Layout.Group>
            </Layout>
          </div>
          <Container>
            <main>{this.props.children}</main>
            <Footer />
          </Container>
        </Sidebar.Content>
      </Sidebar>
    );
  }
}
