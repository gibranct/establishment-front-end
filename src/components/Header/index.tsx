import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import { Container, Content, Profile } from './styles';

function Header() {
  const { username, signOut, isAuthenticated } = useAuth();
  const history = useHistory();

  const logout = useCallback(() => {
    signOut();
    history.push('/login');
  }, [signOut, history]);

  if (!isAuthenticated) return null;

  return (
    <Container>
      <Content>
        <nav>
          <img
            src={
              'http://www.eccount.com/wp-content/uploads/2015/11/Manage-your-Money.png'
            }
            alt="logo"
          />
          <Link to="/establishments">Estabelecimentos</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{username}</strong>
              <div onClick={logout}>Sair</div>
            </div>
            <img
              src={
                'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png'
              }
              alt={username}
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default Header;
