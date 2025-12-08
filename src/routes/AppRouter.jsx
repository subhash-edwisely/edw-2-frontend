import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/DashboardPage/Dashboard.jsx'
import CodeEditorPage from '../pages/CodeEditorPage/CodeEditorPage.jsx'
import LayoutPage from '../pages/LayoutPage/LayoutPage.jsx';
import AllProblemsPage from '../pages/AllProblemsPage/AllProblemsPage.jsx';

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<LayoutPage /> }>
          <Route index element={<Dashboard /> } />
          <Route path='/problem/:id' element={<CodeEditorPage />} />
          <Route path='/all-problems' element={<AllProblemsPage />} />
        </Route>
    </Routes>
  )
}

export default AppRouter