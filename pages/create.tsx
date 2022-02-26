import React from 'react';
import Wizard, { WizardProvider } from '../components/Layout/wizard/Wizard';
import Navbar from '../components/Layout/Navbar';

export default function Create() {
  return (
    <>
      <Navbar></Navbar>
      <WizardProvider>
        <Wizard></Wizard>
      </WizardProvider>
    </>
  );
}
