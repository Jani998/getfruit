import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';


const Paginas = () => {  
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        <Chip icon="heart-outline" onPress={() => {}} style={styles.chip} compact>
          Favoritos
        </Chip>
        <Chip icon="history" onPress={() => {}} style={styles.chip} compact>
          Histórico
        </Chip>
        <Chip icon="clipboard-list-outline" onPress={() => {}} style={styles.chip} compact>
          Pedidos
        </Chip>
      </ScrollView>
    </View>
  );
}

export default Paginas; 

const styles = StyleSheet.create({
  chips: { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  chip: { backgroundColor: '#fff', borderColor: '#e8e4df' },
});
