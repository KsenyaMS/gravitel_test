import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from './LoginPage';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import DashboardPage from './DashboardPage';


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

