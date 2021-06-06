import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: #eee;
  padding: 10rem 50rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;

  img {
    width: 7rem;
    height: 7rem;
  }
`;
