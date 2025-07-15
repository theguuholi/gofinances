import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { renderAuth } from '../../utils/test-utils';
import Register from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock Alert
const mockAlert = jest.fn();
(global as any).Alert = mockAlert;

jest.mock('react-native-uuid', () => ({
  v4: () => 'test-uuid',
}));

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('Register Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock user data for AuthProvider
    (AsyncStorage.getItem as jest.Mock).mockImplementation(key => {
      if (key === '@gofinances:user') {
        return Promise.resolve(
          JSON.stringify({
            id: 'test-user-id',
            name: 'Test User',
            email: 'test@test.com',
          })
        );
      }
      return Promise.resolve(null);
    });
  });

  it('should open category modal when category button is pressed', () => {
    renderAuth(<Register />);

    const categoryButton = screen.getByText('Categoria');
    fireEvent.press(categoryButton);

    expect(screen.getByText('Categorias')).toBeTruthy();
  });

  it('should show error when trying to register without transaction type', async () => {
    renderAuth(<Register />);

    const nameInput = screen.getByPlaceholderText('Nome');
    const amountInput = screen.getByPlaceholderText('Preco');
    const submitButton = screen.getByText('Enviar');

    fireEvent.changeText(nameInput, 'Salary');
    fireEvent.changeText(amountInput, '1000');
    fireEvent.press(submitButton);

    expect(mockAlert).toHaveBeenCalledWith('Selecione o tipo da transação');
  });

  it('should show error when trying to register without category', async () => {
    renderAuth(<Register />);

    const nameInput = screen.getByPlaceholderText('Nome');
    const amountInput = screen.getByPlaceholderText('Preco');
    const incomeButton = screen.getByText('Income');
    const submitButton = screen.getByText('Enviar');

    fireEvent.changeText(nameInput, 'Salary');
    fireEvent.changeText(amountInput, '1000');
    fireEvent.press(incomeButton);
    fireEvent.press(submitButton);

    expect(mockAlert).toHaveBeenCalledWith('Selecione a categoria');
  });

  it('should register new transaction successfully', async () => {
    const mockStorageData = JSON.stringify([]);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(mockStorageData);

    renderAuth(<Register />);

    const nameInput = screen.getByPlaceholderText('Nome');
    const amountInput = screen.getByPlaceholderText('Preco');
    const incomeButton = screen.getByText('Income');
    const categoryButton = screen.getByText('Categoria');

    fireEvent.changeText(nameInput, 'Salary');
    fireEvent.changeText(amountInput, '1000');
    fireEvent.press(incomeButton);

    // Select category
    fireEvent.press(categoryButton);
    const salaryCategory = screen.getByText('Salary');
    fireEvent.press(salaryCategory);

    const submitButton = screen.getByText('Enviar');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('test-uuid')
      );
      expect(mockedNavigate).toHaveBeenCalledWith('Listagem');
    });
  });

  it('should show error when storage fails', async () => {
    // Mock AsyncStorage to reject when getItem is called for transaction data
    (AsyncStorage.getItem as jest.Mock).mockImplementation(key => {
      if (key === '@gofinances:user') {
        return Promise.resolve(
          JSON.stringify({
            id: 'test-user-id',
            name: 'Test User',
            email: 'test@test.com',
          })
        );
      }
      // Reject for transaction data
      return Promise.reject(new Error('Storage Error'));
    });

    renderAuth(<Register />);

    const nameInput = screen.getByPlaceholderText('Nome');
    const amountInput = screen.getByPlaceholderText('Preco');
    const incomeButton = screen.getByText('Income');
    const categoryButton = screen.getByText('Categoria');

    fireEvent.changeText(nameInput, 'Salary');
    fireEvent.changeText(amountInput, '1000');
    fireEvent.press(incomeButton);

    // Select category
    fireEvent.press(categoryButton);
    const salaryCategory = screen.getByText('Salary');
    fireEvent.press(salaryCategory);

    const submitButton = screen.getByText('Enviar');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Não foi possível cadastrar');
    });
  });

  it('should validate required fields', () => {
    renderAuth(<Register />);

    const submitButton = screen.getByText('Enviar');
    fireEvent.press(submitButton);

    expect(screen.getByText('Nome é obrigatório')).toBeTruthy();
    expect(screen.getByText('Preço é obrigatório')).toBeTruthy();
  });
});
