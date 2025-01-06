import { Text, View, FlatList } from "react-native";
import products from "../assets/products.json";
import ProductListItem from "../components/productListItem";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
    </View>
  );
};

export default HomeScreen;
