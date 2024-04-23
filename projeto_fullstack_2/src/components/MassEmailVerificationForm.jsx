import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function MassEmailVerificationForm({ onVerify }) {
  const [massEmails, setMassEmails] = useState('');
  const [error, setError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState(null);

  // Função para lidar com a verificação em massa de e-mails
  const handleMassEmailVerification = async () => {
    setIsVerifying(true);
    try {
      // Verifica se o campo de e-mails em massa está vazio
      if (!massEmails.trim()) {
        throw new Error('O campo de e-mails em massa está vazio');
      }

      // Verifica se cada e-mail na lista está em um formato válido
      const emailList = massEmails.split(/[\s,;\n]+/);
      const invalidEmails = emailList.filter(email => !isValidEmailFormat(email));
      if (invalidEmails.length > 0) {
        throw new Error(`Os seguintes e-mails estão em um formato inválido: ${invalidEmails.join(', ')}`);
      }

      // Limita o número máximo de e-mails para verificação em massa
      if (emailList.length > 100) {
        throw new Error('O número máximo de e-mails para verificação em massa é 100');
      }

      const response = await fetch(`https://www.disify.com/api/email/${massEmails}/mass`);
      if (!response.ok) {
        throw new Error('Erro ao verificar os e-mails em massa');
      }
      const data = await response.json();
      setVerificationResults(data);
      setError(null);
    } catch (error) {
      console.error('Erro:', error);
      setError(error.message); // Defina o erro manualmente aqui
    } finally {
      setIsVerifying(false);
    }
  };

  // Função para validar o formato do e-mail usando expressão regular
  const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formMassEmails" className="mb-3">
          <Form.Label>Verificação de E-mails em Massa:</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Digite os e-mails em massa nesse formato:
          watanabe@example.com,
          tamiuemura@example.com " value={massEmails} onChange={(e) => setMassEmails(e.target.value)} />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" onClick={handleMassEmailVerification} disabled={isVerifying} className="mb-3">
          {isVerifying ? 'Verificando...' : 'Verificar Massa'}
        </Button>
      </Form>
      {verificationResults && (
        <div>
          <h2>Resultados da Verificação em Massa:</h2>
          <pre>{JSON.stringify(verificationResults, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MassEmailVerificationForm;
