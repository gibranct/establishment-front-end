import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { Container, FlexContainer, ImgContainer } from './styles';
import logo from '../../assets/img/logo.webp';

function SignIn() {
  const history = useHistory();
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        await signIn({ email: data.email, password: data.password });

        history.push('/establishments');
      } catch ({ response }) {
        const { data } = response;
        toast.error(data.message);
      }
    },
    [signIn, history]
  );

  return (
    <Container>
      <ImgContainer>
        <img src={logo} alt="logo" />
      </ImgContainer>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
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
              Entrar
            </Button>
            <Link to="/signup">Registrar-se</Link>
          </FlexContainer>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default SignIn;
