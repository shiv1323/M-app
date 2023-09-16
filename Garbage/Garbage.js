import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import "firebase/firestore";
import { firebase } from "@firebase/app";
import { Image } from "react-native";
import { TextInput } from "react-native";
import colors from "../config/colors";
import SkeletonLoading from "../component/SkeletonLoading";
import { AuthContext } from "../context/Message";

const Garbage = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFilter] = useState([]);

  const { users } = useContext(AuthContext);

  useEffect(() => {
    // Filter users based on the search input when the search value changes
    const filtered = users.find((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(filtered);
  }, [search]);

  const Item = ({ title }) => (
    <View style={styles.item}>
      <View style={styles.mid}>
        <Image source={{ uri: title.imageUrl }} style={styles.img} />
        <Text style={styles.title}>{title.name}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholderTextColor="white"
      />
      <Text style={{ color: colors.white, textAlign: "center" }}>
        List of Users:
      </Text>
      {/* // Render the FlatList with filtered data */}
      {filtered.length > 0 &&
        filtered.map((data, id) => {
          <View key={id}>
            <Item title={data} />
          </View>;
        })}
    </SafeAreaView>
  );
};

export default Garbage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: colors.background,
  },
  item: {
    // backgroundColor: "green",
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    // borderRadius: 18,
  },
  title: {
    fontSize: 20,
    color: colors.white,
  },
  img: {
    height: 50,
    borderRadius: 40,
    width: 50,
    marginRight: 25,
  },
  mid: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: colors.white,
    borderColor: "white",
  },
});
