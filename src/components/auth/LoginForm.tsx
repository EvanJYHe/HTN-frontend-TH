"use client";

import { FormEvent, useState } from "react";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useAuth } from "../../context/AuthContext";

type LoginFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function LoginForm({ onSuccess, onCancel }: LoginFormProps) {
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
    onSuccess?.();
  };

  return (
    <form aria-label="Login form" onSubmit={handleSubmit}>
      <Flex direction="column" gap="4">
        <label htmlFor="username">
          <Text as="div" size="3" mb="1" style={{ color: "var(--ink-soft)" }}>
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
          <Text as="div" size="3" mb="1" style={{ color: "var(--ink-soft)" }}>
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
          <Text as="p" size="1" mt="2" style={{ color: "#737373" }}>
            Hint: username = <span className="text-neutral-300">hacker</span>, password ={" "}
            <span className="text-neutral-300">htn2026</span>
          </Text>
        </label>

        {error ? (
          <Text size="2" color="red">
            {error}
          </Text>
        ) : null}

        <Flex gap="3" mt="3">
          <Button size="3" type="submit">
            Login
          </Button>
          {onCancel ? (
            <Button size="3" type="button" variant="soft" color="gray" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
        </Flex>
      </Flex>
    </form>
  );
}
