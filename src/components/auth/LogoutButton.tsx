"use client";

import { Button } from "@radix-ui/themes";
import { useAuth } from "../../context/AuthContext";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button aria-label="Logout" color="gray" size="3" variant="soft" onClick={logout}>
      Logout
    </Button>
  );
}
