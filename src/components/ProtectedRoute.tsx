// components/ProtectedRoute.tsx

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import authStore from "@/mobx/authStore";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      router.push("/");
    }
  }, [router]);

  if (!authStore.isLoggedIn) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default observer(ProtectedRoute);
