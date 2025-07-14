import { Amount, Container, Title } from './styles';

interface Props {
  title: string;
  amount: string | number;
  color: string;
}

const HistoryCard = ({ title, amount, color }: Props) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};
export default HistoryCard;
