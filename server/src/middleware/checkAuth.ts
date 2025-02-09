import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { Request, Response, NextFunction } from "express";
import secrets from "../utils/secrets";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.Authorization;
    const decoded = jwt.verify(token, secrets.jwtSecret);

    //token expires in seconds
    // if (Date.now() >= decoded.exp) {
    //   res.sendStatus(410);
    //   return;
    // }

    const userId = decoded.sub;
    if (!userId) {
      res.sendStatus(401);
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    });

    if (!user) {
      res.sendStatus(401);
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(401);
    console.error(err);
    return;
  }
}

export default requireAuth;
