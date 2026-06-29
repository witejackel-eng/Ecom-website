"use client";

import { createContext, useContext, useReducer, useEffect, useCallback } from "react";

const STORAGE_KEY = "device_destination_auth";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  createdAt: string;
}

interface Address {
  id: string;
  type: string;
  isDefault: boolean;
  fullName: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface BusinessDetails {
  id: string;
  companyName: string;
  gstin: string;
  pan: string;
  businessAddress: string;
  contactPerson: string;
  businessEmail: string;
  businessPhone: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: any[];
  subtotal: number;
  tax: number;
  total: number;
  deliveryStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  shippingAddress: any;
}

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  addedAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  addresses: Address[];
  businessDetails: BusinessDetails | null;
  orders: Order[];
  quotations: any[];
  wishlist: WishlistItem[];
}

type AuthAction =
  | { type: "LOGIN"; payload: any }
  | { type: "LOGOUT" }
  | { type: "UPDATE_PROFILE"; payload: Partial<User> }
  | { type: "CHANGE_PASSWORD" }
  | { type: "ADD_ADDRESS"; payload: any }
  | { type: "UPDATE_ADDRESS"; payload: any }
  | { type: "DELETE_ADDRESS"; payload: string }
  | { type: "SET_DEFAULT_ADDRESS"; payload: string }
  | { type: "ADD_TO_WISHLIST"; payload: any }
  | { type: "REMOVE_FROM_WISHLIST"; payload: string }
  | { type: "LOAD_STATE"; payload: AuthState };

function loadState(): AuthState {
  try {
    if (typeof window === "undefined") throw new Error("SSR");
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...JSON.parse(stored), isLoading: false };
    }
  } catch {}
  return {
    user: null, isAuthenticated: false, isLoading: false,
    addresses: [], businessDetails: null, orders: [], quotations: [], wishlist: [],
  };
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        addresses: action.payload.addresses || [],
        businessDetails: action.payload.businessDetails || null,
        orders: action.payload.orders || [],
        quotations: action.payload.quotations || [],
        wishlist: action.payload.wishlist || [],
      };
    case "LOGOUT":
      return {
        user: null, isAuthenticated: false, isLoading: false,
        addresses: [], businessDetails: null, orders: [], quotations: [], wishlist: [],
      };
    case "UPDATE_PROFILE":
      if (!state.user) return state;
      return { ...state, user: { ...state.user, ...action.payload } };
    case "CHANGE_PASSWORD":
      return state;
    case "ADD_ADDRESS":
      return { ...state, addresses: [...state.addresses, { ...action.payload, id: `addr_${Date.now()}` }] };
    case "UPDATE_ADDRESS":
      return { ...state, addresses: state.addresses.map((a) => (a.id === action.payload.id ? action.payload : a)) };
    case "DELETE_ADDRESS":
      return { ...state, addresses: state.addresses.filter((a) => a.id !== action.payload) };
    case "SET_DEFAULT_ADDRESS":
      return { ...state, addresses: state.addresses.map((a) => ({ ...a, isDefault: a.id === action.payload })) };
    case "ADD_TO_WISHLIST":
      return { ...state, wishlist: [...state.wishlist, { ...action.payload, id: `wl_${Date.now()}`, addedAt: new Date().toISOString() }] };
    case "REMOVE_FROM_WISHLIST":
      return { ...state, wishlist: state.wishlist.filter((i) => i.id !== action.payload) };
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
}

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { firstName: string; lastName: string; email: string; password: string; phone: string }) => Promise<void>;
  logout: () => void;
} | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, null, loadState);

  useEffect(() => {
    if (!state.isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {}
    }
  }, [state]);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 1000));
    dispatch({
      type: "LOGIN",
      payload: {
        user: { id: "user_001", firstName: "Aditya", lastName: "Sharma", email, phone: "+91 98765 43210", emailVerified: true, createdAt: new Date().toISOString() },
        addresses: [{ id: "addr_001", type: "home", isDefault: true, fullName: "Aditya Sharma", phone: "+91 98765 43210", addressLine1: "123 Main Street", city: "Delhi", state: "Delhi", pincode: "110001", country: "India" }],
        businessDetails: { id: "biz_001", companyName: "DeviceDestination", gstin: "07AABCD1234E1Z5", pan: "AABCD1234E", businessAddress: "123 Industrial Area, Delhi", contactPerson: "Aditya Sharma", businessEmail: "billing@devicedestination.com", businessPhone: "+91 11 2345 6789" },
        orders: [{ id: "order_001", orderNumber: "DD-2026-0001", date: new Date(Date.now() - 7 * 86400000).toISOString(), items: [], subtotal: 12500, tax: 2250, total: 14750, deliveryStatus: "delivered", paymentStatus: "paid", shippingAddress: {} }],
        quotations: [],
        wishlist: [],
      },
    });
  }, []);

  const signup = useCallback(async (data: { firstName: string; lastName: string; email: string; password: string; phone: string }) => {
    await new Promise((r) => setTimeout(r, 1000));
    dispatch({ type: "LOGIN", payload: { user: { id: `user_${Date.now()}`, firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone, emailVerified: false, createdAt: new Date().toISOString() }, addresses: [], businessDetails: null, orders: [], quotations: [], wishlist: [] } });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}