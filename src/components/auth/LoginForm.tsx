"use client";

import { FormEvent, useState } from "react";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useAuth } from "../../context/AuthContext";

type LoginFormProps = {
  onClose: () => void;
};

export function LoginForm({ onClose }: LoginFormProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = login(username, password);

    if (!success) {
      setError("Invalid username or password.");
      return;
    }

    setError(null);
    onClose();
  };

  return (
    <form aria-label="Login form" onSubmit={handleSubmit}>
      <Flex direction="column" gap="3">
        <label htmlFor="username">
          <Text as="div" size="2" mb="1" style={{ color: "var(--ink-soft)" }}>
            Username
          </Text>
          <TextField.Root
            id="username"
            required
            size="3"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>

        <label htmlFor="password">
          <Text as="div" size="2" mb="1" style={{ color: "var(--ink-soft)" }}>
            Password
          </Text>
          <TextField.Root
            id="password"
            required
            size="3"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {error ? (
          <Text size="2" color="red">
            {error}
          </Text>
        ) : null}

        <Flex gap="2">
          <Button size="3" type="submit">
            Login
          </Button>
          <Button size="3" type="button" variant="soft" color="gray" onClick={onClose}>
            Cancel
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
