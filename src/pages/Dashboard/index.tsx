import React from 'react';

import { Container, Header, HeaderContent, Profile } from './style';

import logoImg from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  return (
    <Container>
    <Header>
      <HeaderContent>
        <img src={logoImg} alt="GoBarber"/>

        <Profile>
          <img src={user.avatar_url}
           alt="Yan César"
           />
           <div>
             <span>Bem-Vindo,</span>
             <strong>{user.name}</strong>
           </div>
        </Profile>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </Header>

  </Container>

  )
}



export default Dashboard;
