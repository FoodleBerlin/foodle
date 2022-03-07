import React, { ChangeEvent, useRef, useState } from 'react';
import styles from './Create.module.scss';
import Profile from '.';
import Bookings from './Bookings';
import Payments from './Payments';
interface TabsProps {
  tabs: string[];
  defaultTab?: string;
}

const Tabs = (props: TabsProps) => {
  const [currentTab, setCurrentTab] = useState<string>(props.defaultTab ? props.defaultTab : props.tabs[0]);
  return (
    <div className="tab">
      <div className="tab__sidebar">
        {props.tabs.map((tab: string) => {
          <a className="tab__indicator" key={tab} onClick={() => setCurrentTab(tab)}>
            {tab}
          </a>;
        })}
        <a className="tab__contact button-tertiary">Contact</a>
      </div>
      <div className="tab__component">
        {currentTab === 'Profile' ? (
          <Profile prop={''} />
        ) : currentTab === 'My Bookings' ? (
          <Bookings prop={''} />
        ) : (
          <Payments prop={''} />
        )}
      </div>
    </div>
  );
};

export default Tabs;
