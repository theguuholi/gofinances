import { TextInputProps } from "react-native";
import Input from "../Input";
import { Container } from "./styles";
import { Control, Controller } from "react-hook-form";

interface Props extends TextInputProps {
    control: Control;
    name: string;
}

const InputForm = ({ control, name, ...rest }: Props) => {
    return (
        <Container>
            <Controller control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        onChange={onChange}
                        value={value}
                        {...rest}
                    />
                )}
                name={name}
            />
        </Container >


    )
};

export default InputForm;