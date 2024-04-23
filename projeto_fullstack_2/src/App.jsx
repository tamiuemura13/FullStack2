import './App.css'
import React, { lazy, Suspense } from 'react';
const EmailVerificationPage = lazy(() => import('./pages/EmailVerificationPage'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Carregando...</div>}>
        {/* <RouterProvider router={router} /> */}
        <EmailVerificationPage />
      </Suspense>
    </div>
  );
}

export default App
