"use client";

import {
  accountUpdateSchema,
  signInEmailSchema,
  signUpEmailSchema,
} from "@/zod/certification";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useLoginForm = () => {
  return useForm({
    resolver: zodResolver(signInEmailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
};

export const useSignupForm = () => {
  return useForm({
    resolver: zodResolver(signUpEmailSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
};

export const useAccountUpdateForm = (initialName = "", initialEmail = "") => {
  return useForm({
    resolver: zodResolver(accountUpdateSchema),
    defaultValues: {
      name: initialName,
      email: initialEmail,
    },
  });
};
