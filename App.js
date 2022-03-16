import React, { useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  StatusBar,
  Image,
} from 'react-native'

import { Button } from 'react-native-elements'

export default function App() {
  const [keyword, setKeyword] = useState('')
  const [meals, setMeals] = useState([])

  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals))
      .catch((error) => {
        Alert.alert('Error', error)
      })
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '80%',
          backgroundColor: '#CED0CE',
          marginLeft: '10%',
        }}
      />
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        style={{ marginLeft: '5%', marginBottom: 50, marginTop: 70 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {item.strMeal}
            </Text>
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri: item.strMealThumb,
              }}
            />
          </View>
        )}
        data={meals}
        ItemSeparatorComponent={listSeparator}
      />
      <TextInput
        style={{ fontSize: 18, width: 200, marginTop: 0, marginBottom: 20 }}
        placeholder="keyword"
        onChangeText={(text) => setKeyword(text)}
      />
      <Button
        title="Find"
        onPress={getRepositories}
        buttonStyle={{ marginTop: 0, marginBottom: 100 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
