import React, { useContext } from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import { AutoContext } from '../AutoContext';
// import { Button, Dropdown } from 'react-bootstrap';
// import { FaUsers, FaUser } from 'react-icons/fa';

function TeamDropdown(props) {
  const context = useContext(AutoContext);
  const handleTeamSelect = (e, { value }) => {
    if (value) {
      context[9]({
        ...context[8],
        team: { id_team: value.id_team, team_name: value.team_name },
      });
      context[11]({ ...context[10], type: 'home' });
    } else context[9]({ ...context[8], team: null });
  };
  return (
    <Dropdown
      trigger={<Button icon="users" inverted compact basic />}
      pointing="top left"
      icon={null}
    >
      <Dropdown.Menu>
        <Dropdown.Header content="Teams" />
        <Dropdown.Divider />
        {/* {props.items.map((item, i) => (
        ))} */}
        {context[8].teams.map((team, index) => {
          return (
            <Dropdown.Item
              key={index}
              text={team.team_name}
              value={team}
              onClick={handleTeamSelect}
            />
          );
        })}
        {/* <TeamDropItem team="Autoban" />
            <TeamDropItem team="PubIO" />
            <TeamDropItem team="GHPT" /> */}
      </Dropdown.Menu>
    </Dropdown>

    // {/* <Dropdown>
    //   <Dropdown.Toggle variant="outline-light" className="NavDropdown" id="dropdown-basic" >
    //     {props.title === "Team" ? <FaUsers fontSize="22px"/> : <FaUser /> }
    //   </Dropdown.Toggle>

    //   <Dropdown.Menu>
    //     {props.items.map((item, i) => <Dropdown.Item href={`#/action-${i}`}>{item}</Dropdown.Item>)}
    //   </Dropdown.Menu>
    // </Dropdown> */}
  );
}

export default TeamDropdown;
