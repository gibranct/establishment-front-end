import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Popconfirm, Button } from 'antd';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';

import { Container, FlexContainer, ButtonsContainer } from './styles';
import Api from '../../services/Api';
import { toast } from 'react-toastify';

type ColumnsType = {
  title: string;
  dataIndex: string;
  key: string;
  render?: (_: any, record: any) => JSX.Element;
};

type Establishment = {
  id: number;
  cnpj: string;
  name: string;
  address: {
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    street: string;
  };
};

type DataSourceProps = {
  key: number;
  cnpj: string;
  name: string;
  address: string;
  city: string;
  state: string;
};

function Establishments() {
  const history = useHistory();
  const [dataSource, setDataSource] = useState<DataSourceProps[]>([]);

  useEffect(() => {
    Api.get('establishments')
      .then(({ data }) => {
        const { data: dataValues } = data;
        setDataSource(
          dataValues.map((es: Establishment) => ({
            key: es.id,
            cnpj: es.cnpj,
            name: es.name,
            address: `${es.address.street}, ${es.address.number} - ${es.address.neighborhood}`,
            city: es.address.city,
            state: es.address.state
          }))
        );
      })
      .catch(() => {
        toast.error('Não foi possível carregar os estabelecimentos');
      });
  }, []);

  const handleDeleteItem = useCallback(
    ({ key: itemId, cnpj }) => {
      Api.delete(`/establishments/${itemId}`)
        .then(() => {
          setDataSource(dataSource.filter((data: any) => data.key !== itemId));
          toast.success(`Estabelecimento com CNPJ ${cnpj} removido`);
        })
        .catch(() => {
          toast.error(
            `Não foi possível remover o estabelecimento com CNPJ ${cnpj}`
          );
        });
    },
    [dataSource]
  );

  const columns: ColumnsType[] = [
    {
      title: 'CNPJ',
      dataIndex: 'cnpj',
      key: 'cnpj'
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Endereço',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Cidade',
      dataIndex: 'city',
      key: 'city'
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state'
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, record: DataSourceProps) => (
        <ButtonsContainer>
          <Popconfirm
            title="Têm certeza que deseja remover este item?"
            onConfirm={() => {
              handleDeleteItem({ ...record });
            }}
          >
            <DeleteOutlined />
          </Popconfirm>

          <EditOutlined
            onClick={() => history.push(`/establishment/${record.key}`)}
          />
        </ButtonsContainer>
      )
    }
  ];

  return (
    <Container>
      <FlexContainer>
        <h1>Estabelecimentos</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            history.push('/establishment');
          }}
        >
          Estabelecimento
        </Button>
      </FlexContainer>
      <Table dataSource={dataSource} columns={columns} />
    </Container>
  );
}

export default Establishments;
