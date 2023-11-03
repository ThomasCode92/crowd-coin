import { Icon, Menu } from 'semantic-ui-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
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
