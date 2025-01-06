import { Text } from "react-native";

interface Strain {
  name: string;
  type: string;
  stock: number;
  price: number;
  sale: number;
}

interface Product {
  id: number;
  category: string;
  brand: string;
  style: string;
  description: string;
  image: string;
  strains: Strain[];
  createdAt: string;
  modifiedAt: string;
}

export default function ProductListItem({ product }: { product: Product }) {
  return <Text style={{ fontSize: 30 }}>{product.strains.length}</Text>;
}
