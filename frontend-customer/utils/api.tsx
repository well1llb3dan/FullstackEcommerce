export interface Product {
  id: number;
  category: string;
  brand?: string;
  style?: string;
  description: string;
  image: string;
  strains: Strain[];
}

export interface Strain {
  name: string;
  type: string;
  stock: number;
  price: number;
  sale: number;
}

export async function fetchProducts(token: string): Promise<Product[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const responseText = await response.text();

  if (!response.ok) {
    console.error("Failed to fetch products:", responseText);
    try {
      const errorData = JSON.parse(responseText);
      throw new Error(errorData.message || "Failed to fetch products");
    } catch (e) {
      throw new Error("Failed to fetch products: " + responseText);
    }
  }

  try {
    const data: Product[] = JSON.parse(responseText);
    return data;
  } catch (e) {
    console.error("Failed to parse JSON:", responseText);
    throw new Error("Failed to parse JSON: " + responseText);
  }
}
