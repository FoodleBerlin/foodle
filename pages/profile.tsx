import React from 'react';
import Wizard, { WizardProvider } from '../components/Layout/wizard/Wizard';
import Navbar from '../components/Layout/Navbar';
import Tabs from '../components/Profile/Tabs';

export default function Profile() {
  return (
    <>
      <Navbar></Navbar>
      <Tabs tabs={['Profile', 'My Bookings', 'My Payments']} />
    </>
  );
}
