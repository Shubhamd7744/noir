import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type WishlistContextType = {
  ids: string[];
  total: number;
  isWishlisted: (productId: string) => boolean;
  toggle: (productId: string) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "noir_wishlist_v1";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setIds(parsed.filter((v) => typeof v === "string"));
      }
    } catch {
      // ignore storage parse errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // ignore storage write errors
    }
  }, [ids]);

  const isWishlisted = useCallback((productId: string) => ids.includes(productId), [ids]);

  const add = useCallback((productId: string) => {
    setIds((current) => (current.includes(productId) ? current : [productId, ...current]));
  }, []);

  const remove = useCallback((productId: string) => {
    setIds((current) => current.filter((id) => id !== productId));
  }, []);

  const toggle = useCallback(
    (productId: string) => {
      setIds((current) =>
        current.includes(productId)
          ? current.filter((id) => id !== productId)
          : [productId, ...current]
      );
    },
    []
  );

  const clear = useCallback(() => setIds([]), []);

  const value = useMemo<WishlistContextType>(
    () => ({
      ids,
      total: ids.length,
      isWishlisted,
      toggle,
      add,
      remove,
      clear,
    }),
    [ids, isWishlisted, toggle, add, remove, clear]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
};
