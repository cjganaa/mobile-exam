import { Stack} from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';



export default function Homework() {

  return (
    <View style={styles.container}>
        <Stack.Screen options={{
            title:"Homework"
        }}/>
      <Text>
        Update the title
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
