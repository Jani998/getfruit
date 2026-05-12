import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const Procurar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
    style={styles.barra}
      placeholder="Procurar"
      onChangeText={setSearchQuery}
      value={searchQuery}
      inputStyle={styles.input}
    />
  );
};

export default Procurar;

const styles = StyleSheet.create({
barra: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  input: { fontSize: 14 },
})
