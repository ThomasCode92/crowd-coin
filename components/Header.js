import { useRouter } from 'next/router';
import { Icon, Menu } from 'semantic-ui-react';

import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <Menu>
        <Menu.Item onClick={() => router.push('/')}>CrowdCoin</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>Campaigns</Menu.Item>
          <Menu.Item onClick={() => router.push('/campaigns/new')}>
            <Icon name="plus" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </header>
  );
}
