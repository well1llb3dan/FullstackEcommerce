import React, { useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // <-- Import from here

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
  brand?: string;
  style?: string;
  description: string;
  image: string;
  strains: Strain[];
}

export default function ProductListItem({ product }: { product: Product }) {
  const [selectedStrainIndex, setSelectedStrainIndex] = useState(0);
  const [hasSelected, setHasSelected] = useState(false);
  const [imageUri, setImageUri] = useState(
    `http://73.62.129.158:3000/products/image/${product.id}`
  );
  const [imageError, setImageError] = useState(false);

  const handleStrainChange = (value: string) => {
    const index = parseInt(value, 10);
    if (!isNaN(index)) {
      setSelectedStrainIndex(index);
      setHasSelected(true);
    }
  };

  const handleImageError = () => {
    if (!imageError) {
      setImageUri("https://via.placeholder.com/300"); // Fallback image URL
      setImageError(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          onError={handleImageError}
        />
        <Text style={styles.heading}>
          {product.category === "flower"
            ? product.brand ||
              `${product.strains[selectedStrainIndex]?.name} - ${product.strains[selectedStrainIndex]?.type}` ||
              "Unknown Product"
            : `${product.brand} - ${product.style}` || "Unknown Brand"}
        </Text>
        {product.strains.length > 1 && (
          <Picker
            selectedValue={selectedStrainIndex.toString()}
            onValueChange={handleStrainChange}
            style={styles.picker}
          >
            {product.strains.map((strain, index) => (
              <Picker.Item
                key={strain.name}
                label={`${strain.name} - ${strain.type}`}
                value={index.toString()}
              />
            ))}
          </Picker>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: "center",
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: "100%",
    maxWidth: 300,
    height: 275,
    borderRadius: 8,
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  picker: {
    width: "100%",
  },
});
