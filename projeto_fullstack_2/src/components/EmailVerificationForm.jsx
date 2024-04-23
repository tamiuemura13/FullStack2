import React, { useState } from 'react';
import { Form, Button, Alert, Table } from 'react-bootstrap';

function EmailVerificationForm() {
  const [email, setEmail] = useState('');
  const [verificationResults, setVerificationResults] = useState([]); 
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e, emailToVerify) => {
    e.preventDefault();
    // Verificar se o campo de e-mail está vazio
    if (!emailToVerify.trim()) {
      setError('Campo de email não pode estar vazio');
      return;
    }
    // Verificar se o formato do e-mail é válido usando regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToVerify)) {
      setError('Digite um email com formato válido');
      return;
    }

    // Verificar se o e-mail já está presente nos resultados de verificação
    if (verificationResults.some(result => result.email === emailToVerify)) {
      setError('Este email já foi verificado');
      return;
    }

    setIsFetching(true);
    try {
      const response = await fetch(`https://www.disify.com/api/email/${emailToVerify}`);
      if (!response.ok) {
        throw new Error('Erro ao verificar o email');
      }
      const data = await response.json();
      setVerificationResults([...verificationResults, { email: emailToVerify, ...data }]);
      setEmail(''); // Limpa o input após a verificação
      setError(null);
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao verificar o email');
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e, email)}>
        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label>Digite seu e-mail para verificação:</Form.Label>
          <Form.Control type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit">
          Verificar
        </Button>
      </Form>
      {isFetching && <p>Buscando...</p>}
      {verificationResults.length > 0 && (
        <div>
          <h2>Resultados da Verificação:</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>E-mail</th>
                <th>Formato</th>
                <th>Domínio</th>
                <th>Descartável</th>
                <th>DNS</th>
              </tr>
            </thead>
            <tbody>
              {verificationResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.email}</td> {/* Exibe o email verificado */}
                  <td>{result.format ? result.format.toString() : 'N/A'}</td>
                  <td>{result.domain ? result.domain : 'N/A'}</td>
                  <td>{result.disposable ? result.disposable.toString() : 'false'}</td>
                  <td>{result.dns ? result.dns.toString() : 'false'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default EmailVerificationForm;
