import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

type UserProfileProps = {

};

const UserProfile: React.FC<UserProfileProps> = () => {
  const userId = useLocation().pathname.split('/')[2]
  return (
    <>
      <Header />
      <h1>{userId}</h1>
      <Footer />
    </>
  )
}
export default UserProfile;
