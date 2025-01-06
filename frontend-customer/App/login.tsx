import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Box>
      <Text>Login</Text>
      <Input />
      <Input />
      <Button onPress={handleLogin}>
        <Text>Login</Text>
      </Button>
    </Box>
  );
};

export default LoginScreen;
