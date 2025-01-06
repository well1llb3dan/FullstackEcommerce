import { FlatList } from "react-native";
import products from "../assets/products.json";
import ProductListItem from "../components/productListItem";

const StoreScreen = () => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      keyExtractor={(item) => item.id.toString()}
      className="bg-gray-950"
    />
  );
};

export default StoreScreen;
