import { Fragment } from 'react';

export default function Layout({ children }) {
  return (
    <Fragment>
      <header>I'm a header</header>
      <main>{children}</main>
    </Fragment>
  );
}
