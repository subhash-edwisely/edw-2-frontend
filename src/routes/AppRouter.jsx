import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProblemDashboardPage from '../pages/ProblemDashboardPage/ProblemDashboardPage.jsx'
import CodeEditorPage from '../pages/CodeEditorPage/CodeEditorPage.jsx'
import LayoutPage from '../pages/LayoutPage/LayoutPage.jsx';


const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<LayoutPage /> }>
          <Route index element={<ProblemDashboardPage /> } />
          <Route path='/problem/:id' element={<CodeEditorPage />} />
        </Route>
    </Routes>
  )
}

export default AppRouter