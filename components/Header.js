import { Icon, Menu } from 'semantic-ui-react';

export default function Header() {
  return (
    <header>
      <Menu>
        <Menu.Item>CrowdCoin</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>Campaigns</Menu.Item>
          <Menu.Item>
            <Icon name="plus" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </header>
  );
}
