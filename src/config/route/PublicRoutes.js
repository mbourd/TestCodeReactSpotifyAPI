import React from 'react';
import { Route, Routes } from 'react-router';
import AlbumDetail from '../../components/Album/AlbumDetail';
import MainPage from '../../components/MainPage/MainPage';

const routes = [
  { path: "/", component: MainPage },
  { path: "/album/:id", component: AlbumDetail },
  { path: "*", component: MainPage },
];

const PublicRoutes = ({ }) => {
  return (
    <>
      <Routes>
        {routes.map((route, index) => {
          return <Route path={route.path} key={index} element={<route.component />} />
        })}
      </Routes>
    </>
  );
};

export default PublicRoutes;
