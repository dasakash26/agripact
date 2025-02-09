import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PDFViewer } from "@react-pdf/renderer";
import SignupPdf from "./SignupPdf.tsx"; // Import your PDF component
import api from "@/api/axiosConfig";

// Zod Schema for Signup Form
const signupSchema = z
  .object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password must be at least 1 characters long"),
    confirmPassword: z.string(),
    userType: z.enum(["FARMER", "BUYER"], {
      required_error: "Please select a user type",
    }),
  })
  .refine(
    (values) => values.password === values.confirmPassword,
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

type SignupFormInputs = z.infer<typeof signupSchema>;

const SignupPagePDF = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const [submittedData, setSubmittedData] = useState<SignupFormInputs | null>(null);
//   const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    const { name, email, password, userType } = data;

    try {
      const res = await api.post("user/register", {
        name,
        email,
        password,
        role: userType,
      });
      toast({
        title: res.data.message,
      });
      setSubmittedData(data); // Save data for the PDF
    } catch (error: any) {
      toast({
        title: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center px-4">
        {!submittedData ? (
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your email below to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label>I am a:</Label>
                  <RadioGroup
                    className="flex gap-4"
                    defaultValue=""
                    onValueChange={(value) => {
                      register("userType").onChange({
                        target: { name: "userType", value },
                      });
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="FARMER" id="farmer" />
                      <Label htmlFor="farmer">Farmer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="BUYER" id="buyer" />
                      <Label htmlFor="buyer">Buyer</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline">
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <PDFViewer width="100%" height="600">
            <SignupPdf formData={submittedData} />
          </PDFViewer>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default SignupPagePDF;
