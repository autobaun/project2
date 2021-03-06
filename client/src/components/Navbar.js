import React, { useContext } from 'react';
import { RiMenu4Line } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { Button, Image } from 'semantic-ui-react';
import TeamDropdown from './TeamDropdown';
import UserDropdown from './UserDropdown';
import { AutoContext } from '../AutoContext';

function Navbar() {
  const context = useContext(AutoContext);

  const handleHomeClick = () => {
    context[11]({ type: 'home', project: null });
    context[3]([]);
    context[7]([]);
    context[13]({ ...context[12], projectLabels: [] });
    context[1]({...context[0], open: false});
  };

  const handleSettingsClick = () => {
    context[1]({
      ...context[0],
      open: !context[0].open,
      type: 'settings',
    });
  }

  return (
    <div className="navbar">
      <div
        className="flex-row"
        style={{ padding: '0 4px', marginRight: 'auto' }}
      >
        <Button
          icon="home"
          inverted
          compact
          basic
          circular
          onClick={handleHomeClick}
        />
        <TeamDropdown items={['Autoban', 'PubIO']} />
        {/* user dropdown */}
        <UserDropdown />
        {context[8].avatar && <Image avatar src={context[8].avatar}/>}
      </div>
      <div className="flex-row">
        <RiMenu4Line
          color="lightblue"
          style={{ fontSize: '20px', margin: '1px' }}
        />
        <h1 className="race-font">
          {window.innerWidth > 600 ? 'Autoban' : 'A'}
        </h1>
      </div>
      {context[10].project !== null && (
        <div
          className="clickable navoptions"
          id="settings"
          onClick={handleSettingsClick}
        >
          <FiSettings size={20} style={{ margin: '10px' }} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
