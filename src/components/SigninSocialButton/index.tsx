import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import { Button, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

const SignInSocialButton = ({ title, ...rest }: Props) => {
  return (
    <Button {...rest}>
      <Title>{title}</Title>
    </Button>
  );
};

export default SignInSocialButton;
