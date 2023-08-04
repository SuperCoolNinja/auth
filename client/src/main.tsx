/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Routes } from './routes';
import { AppContext } from './context/ctx';
import { IAppContext } from './interfaces/IContext';
import { Notification } from './components/notification';
import { ENotifType } from './enums/ENotification';
import { createRoot } from 'react-dom/client';

import './index.scss';


const AppInitializer: React.FunctionComponent = () => {
  const [showNotif, setNotif] = useState<{
    txt: string;
    type: ENotifType;
    bShow: boolean;
  }>({
    txt: "",
    type: ENotifType.INFO,
    bShow: false,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotif({ txt: "", type: ENotifType.INFO, bShow: false });
    }, 6000);

    return () => clearTimeout(timeout);
  }, [showNotif]);

  const contextValue: IAppContext = {
    showNotif,
    setNotif,
  };

  return (
    <React.StrictMode>
      <AppContext.Provider value={contextValue}>
      <RouterProvider router={Routes} fallbackElement={<p>Loading...</p>} />
      {showNotif.bShow && (
        <Notification txt={showNotif.txt} type={showNotif.type} />
      )}
      </AppContext.Provider>
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root') as HTMLElement;
createRoot(rootElement).render(<AppInitializer />); // Use createRoot instead of ReactDOM.render
