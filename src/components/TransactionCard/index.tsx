import { categories } from '../../utils/categories';
import {
  Amount,
  Category,
  CategoryName,
  Container,
  Footer,
  Icon,
  Title,
  Date,
} from './styles';

export interface TransactionCardData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardData;
}

const TransactionCard = ({ data }: Props) => {
  const { name, amount, category, date, type } = data;
  const categorySelected = categories.find(item => item.key === category) || {
    name: 'Categoria não encontrada',
    icon: 'alert-circle',
  };

  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={categorySelected.icon} />
          <CategoryName>{categorySelected.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};
export default TransactionCard;
