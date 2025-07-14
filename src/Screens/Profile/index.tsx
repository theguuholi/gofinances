import { View, Text, TextInput, Button } from 'react-native';

const Profile = () => {
  return (
    <View>
      <Text testID="text-title">Profile</Text>
      <TextInput testID="input-name" placeholder="Nome" autoCorrect={false} />
      <TextInput
        testID="input-lastname"
        placeholder="Sobrenome"
        autoCorrect={false}
      />
      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
};

export default Profile;
