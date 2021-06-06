import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Skeleton } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container } from './styles';
import Api from '../../services/Api';

type InitialValuesProps = {
  cnpj?: string;
  name?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  street?: string;
};

function CreateEstablishment() {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [initialValues, setInitialValues] = useState<InitialValuesProps>({});

  useEffect(() => {
    if (!params.id) return;

    setLoading(true);
    setIsUpdate(true);

    Api.get(`/establishments/${params.id}`)
      .then(({ data }) => {
        const { name, cnpj, address } = data.data;
        setInitialValues({
          name,
          cnpj,
          street: address.street,
          number: address.number,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state
        });
        setLoading(false);
      })
      .catch(({ data }) => {
        setLoading(false);
        toast.error(data.message);
      });
  }, [params.id]);

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        const url = isUpdate
          ? `/establishments/${params.id}`
          : '/establishments';
        const method = isUpdate ? 'put' : 'post';

        await Api[method](url, {
          cnpj: data.cnpj,
          name: data.name,
          address: {
            number: data.number,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state,
            street: data.street
          }
        });

        toast.success(
          `Estabelecimento ${isUpdate ? 'atualizado' : 'cadastrado'}`
        );

        history.push('/establishments');
      } catch ({ response }) {
        const { data } = response;
        toast.error(data.message);
      }
    },
    [history, isUpdate, params.id]
  );

  const REQUIRED_FIELD = 'Este campo é obrigatório';

  if (loading) {
    return (
      <Container>
        <Skeleton />
      </Container>
    );
  }

  return (
    <Container>
      <h1>{isUpdate ? 'Atualizar' : 'Adicionar'} Estabelecimento</h1>
      <Form
        layout="vertical"
        className="establishment-form"
        initialValues={{ ...initialValues }}
        onFinish={handleSubmit}
      >
        <Row>
          <Col span={11}>
            <Form.Item
              label="Nome"
              name="name"
              rules={[{ required: true, message: REQUIRED_FIELD }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={2} />
          <Col span={11}>
            <Form.Item
              label="CNPJ"
              name="cnpj"
              rules={[{ required: true, message: REQUIRED_FIELD }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={14}>
            <Form.Item
              label="Rua/Avenida"
              name="street"
              rules={[{ required: true, message: REQUIRED_FIELD }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={1} />
          <Col span={4}>
            <Form.Item
              label="Número"
              name="number"
              rules={[{ required: true, message: REQUIRED_FIELD }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={1} />
          <Col span={4}>
            <Form.Item
              label="Bairro"
              name="neighborhood"
              rules={[{ required: true, message: REQUIRED_FIELD }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={11}>
            <Form.Item
              label="Cidade"
              name="city"
              rules={[{ required: true, message: REQUIRED_FIELD }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={2} />
          <Col span={11}>
            <Form.Item
              label="Estado"
              name="state"
              rules={[{ required: true, message: REQUIRED_FIELD }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default CreateEstablishment;
