import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import secrets from "../utils/secrets";

export const registerUser = async (req: Request, res: Response) => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.name ||
    !req.body.role
  ) {
    res.status(400).json({ message: "Name, email and password are required!" });
    return;
  }

  const { name, email, password, role } = req.body;

  try {
    const existedUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existedUser) {
      res.status(409).json({ message: "User already existed!" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      },
    });

    // const exp = Date.now() + 1000 * 60 * 5;
    const token = jwt.sign({ sub: user.id }, secrets.jwtSecret);

    res.cookie("authorization", token, {
      httpOnly: true,
      secure: false,
      domain: "localhost",
      path: "/",
    });

    res.status(201).json({ message: "User created successfully!" });
  } catch (err: any) {
    res.status(500).json({ message: "Internal server error!" });

    console.log(err.message);
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(401).json({ message: "Invalid email or password!" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: "Invalid email or password!" });
    return;
  }

  if (secrets.jwtSecret === undefined) {
    res.status(500).json({ message: "Internal server error!" });
    return;
  }

  // const exp = Date.now() + 1000 * 60 * 5;
  const token = jwt.sign({ sub: user.id }, secrets.jwtSecret);
  res.cookie("authorization", token, {
    httpOnly: true,
    secure: false,
    domain: "localhost",
    path: "/",
  }); //secure should be true?
  res.status(200).json({ message: "Login successfully!" });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("authorization", {
    httpOnly: true,
    secure: false,
    domain: "localhost",
    path: "/",
  });
  res.status(200).json({ message: "Logout successfully!" });
};

export const getUser = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;
  res.status(200).json({ user });
};

export const getuserDetails = async (req: Request, res: Response) => {
  const id = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        address: true,
        paymentDetails: true,
        farmDetails: true,
      },
    });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
    //@ts-ignore
    console.log(err.message);
    return;
  }
};

export const editProfile = async (req: Request, res: Response) => {
  const user = req.user;
  const { name, aadharNumber, phoneNumber, crops } = req.body;
  let result = null;
  try {
    result = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: name,
        aadharNumber: aadharNumber,
        phoneNumber: phoneNumber,
        crops: [crops],
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: "Internal server error!" });
    console.log(err.message);
    return;
  }

  res.status(200).json({
    message: "Edited profile successfully!",
    user: result,
  });
};
