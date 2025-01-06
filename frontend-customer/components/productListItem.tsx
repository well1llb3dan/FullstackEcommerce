import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectScrollView,
  SelectItem,
  SelectDragIndicatorWrapper,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
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
  const [isLoading, setIsLoading] = useState(true);
  const [hasSelected, setHasSelected] = useState(false);
  const handleStrainChange = (value: string) => {
    const index = parseInt(value, 10);
    if (!isNaN(index)) {
      setSelectedStrainIndex(index);
      setHasSelected(true);
    }
  };
  return (
    <VStack className="mb-6">
      <Card className="p-5 rounded-lg w-[80%] m-3 self-center">
        <Image
          source={{
            uri: `${
              process.env.NEXT_PUBLIC_API_URL || "http://10.0.0.129:3000"
            }/products/image/${product.id}`,
          }}
          className="mb-6 w-full max-w-[300px] h-[275px] self-center rounded-md aspect-[1/1]"
          alt={product.strains[selectedStrainIndex]?.name || "Product image"}
          resizeMode="contain"
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
        <Heading size="md" className="text-center mb-4">
          {product.category === "flower"
            ? product.brand ||
              `${product.strains[selectedStrainIndex]?.name} - ${product.strains[selectedStrainIndex]?.type}` ||
              "Unknown Product"
            : `${product.brand} - ${product.style}` || "Unknown Brand"}
        </Heading>
        {product.strains.length > 1 && (
          <Select
            selectedValue={selectedStrainIndex.toString()}
            onValueChange={handleStrainChange}
          >
            <SelectTrigger
              variant="rounded"
              size="xl"
              style={{
                backgroundColor: "#222",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                padding: 0,
                gap: 8,
              }}
            >
              <SelectInput
                placeholder="Select a strain"
                value={
                  hasSelected
                    ? `${product.strains[selectedStrainIndex].name} - ${product.strains[selectedStrainIndex].type}`
                    : ""
                }
                style={{
                  color: "#fff",
                  // Ensure text color is white
                  flex: 1,
                  textAlign: "center",
                  paddingLeft: "auto",
                  paddingRight: "auto", // Add padding for better visibility
                }}
              />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectScrollView>
                  {product.strains.map((strain, index) => (
                    <SelectItem
                      style={{
                        display: "flex",
                        backgroundColor: "#fff",
                        height: 80,
                        justifyContent: "center",
                      }}
                      textStyle={{
                        size: "xl",
                      }}
                      key={strain.name}
                      label={`${strain.name}   -   ${strain.type}`}
                      value={index.toString()}
                    />
                  ))}
                </SelectScrollView>
              </SelectContent>
            </SelectPortal>
          </Select>
        )}
      </Card>
    </VStack>
  );
}
