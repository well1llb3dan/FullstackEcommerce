export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`http://73.62.129.158:3000/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    console.error("Login failed:", responseText);
    try {
      const errorData = JSON.parse(responseText);
      throw new Error(errorData.message || "Login failed");
    } catch (e) {
      throw new Error("Login failed: " + responseText);
    }
  }

  try {
    const data: LoginResponse = JSON.parse(responseText);
    return data;
  } catch (e) {
    console.error("Failed to parse JSON:", responseText);
    throw new Error("Failed to parse JSON: " + responseText);
  }
}
