import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container, FlexContainer } from './styles';
import Api from '../../services/Api';

function SignUp() {
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        console.log({ data });

        await Api.post('/users', {
          ...data
        });

        toast.success('Usuário cadastrado');

        history.push('/login');
      } catch ({ response }) {
        const { data } = response;
        toast.error(data.message);
      }
    },
    [history]
  );

  return (
    <Container>
      <h2>Adcionar Usuário</h2>
      <Form
        className="signup-form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Nome é obrigatório' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="nome"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'E-mail é obrigatório' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
            type="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Senha é obrigatória' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>

        <Form.Item>
          <FlexContainer>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Adcionar
            </Button>
            <Link to="/login">Login</Link>
          </FlexContainer>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default SignUp;
