import React, { Suspense, lazy } from 'react';

// Importar o componente EmailVerificationForm de forma assíncrona usando lazy
const LazyEmailVerificationForm = lazy(() => import('../components/EmailVerificationForm'));

// Importar o componente MassEmailVerificationForm de forma assíncrona usando lazy
const LazyMassEmailVerificationForm = lazy(() => import('../components/MassEmailVerificationForm'));

function EmailVerificationPage() {
 
  const handleMassEmailVerification = async (massEmails) => {
    console.log('Verificando e-mails em massa:', massEmails);
  };

  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-md-5">
          <h1>Verificação de E-mail Único</h1>
          <Suspense fallback={<div>Carregando...</div>}>
            <LazyEmailVerificationForm />
          </Suspense>
        </div>
        <div className="col-md-5">
          <h1>Verificação de E-mails em Massa</h1>
          <Suspense fallback={<div>Carregando...</div>}>
            <LazyMassEmailVerificationForm onVerify={handleMassEmailVerification} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default EmailVerificationPage;
