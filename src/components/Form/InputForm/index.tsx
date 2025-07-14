import { TextInputProps } from 'react-native';
import Input from '../Input';
import { Container, Error } from './styles';
import { Control, Controller } from 'react-hook-form';

interface Props extends TextInputProps {
  control: Control<any, object>;
  name: string;
  error: any;
}

const InputForm = ({ control, name, error, ...rest }: Props) => {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value === undefined || value === null ? '' : String(value)}
            {...rest}
          />
        )}
      />

      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default InputForm;
