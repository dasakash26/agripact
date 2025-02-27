import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createNegotiation = async (req: Request, res: Response) => {
  try {
    const currentTerms = await prisma.currentTerms.create({
      data: {
        ...req.body,
      },
    });

    const negotiation = await prisma.negotiation.create({
      data: {
        currentTermsId: currentTerms.id,
        createdById: req.body.createdBy,
        offeredToId: req.user.id,
        details: "negotiation details",
        turn: req.user.id,
        ongoing: true,
      },
    });

    res.status(201).json({ message: "Negotiation created successfully." });
  } catch (error) {
    console.log("Error creating negotiation:", error);
    res.status(500).json({ error: "Already negotiating on this offer" });
  }
};

export const getNegotiations = async (req: Request, res: Response) => {
  try {
    const negotiations = await prisma.negotiation.findMany({
      where: {
        OR: [{ createdById: req.user.id }, { offeredToId: req.user.id }],
      },
    });

    const currentTerms = await prisma.currentTerms.findMany();
    console.log("negotiations", negotiations);
    res.status(200).json({ negotiations, currentTerms });
  } catch (error) {
    console.log("Error getting negotiations:", error);
    res.status(500).json({ error: "Failed to get negotiations" });
  }
};

export const getCurrentTerms = async (req: Request, res: Response) => {
  try {
    const currentTerms = await prisma.currentTerms.findUnique({
      where: { id: req.params.currentTermsId },
    });
    res.status(200).json({ currentTerms });
  } catch (error) {
    console.log("Error getting current terms:", error);
    res.status(500).json({ error: "Failed to get current terms" });
  }
};

export const updateCurrentTerms = async (req: Request, res: Response) => {
  try {
    console.log("req.body", req.body);
    const currentTerms = await prisma.currentTerms.update({
      where: { id: req.params.currentTermsId },
      data: {
        quantity: parseInt(req.body.quantity),
        price: parseInt(req.body.price),
        harvestTime: new Date(req.body.harvestTime),
        location: req.body.location,
        paymentTerms: req.body.paymentTerms,
      },
    });
    const negotiation = await prisma.negotiation.findFirst({
      where: { currentTermsId: req.params.currentTermsId },
    });
    const updatedNegotiation = await prisma.negotiation.update({
      where: { id: negotiation!.id },
      data: {
        turn:
          negotiation!.turn === negotiation!.offeredToId
            ? negotiation!.createdById
            : negotiation!.offeredToId,
      },
    });

    res.status(200).json({ currentTerms, updatedNegotiation });
  } catch (error) {
    console.log("Error updating current terms:", error);
    res.status(500).json({ error: "Failed to update current terms" });
  }
};

export const completeNegotiation = async (req: Request, res: Response) => {
  try {
    console.log("req.body", req.body);
    const negotiation = await prisma.negotiation.update({
      where: { currentTermsId: req.params.currentTermsId },
      data: { ongoing: false, status: req.body.status },
    });
    res.status(200).json({ negotiation });
  } catch (error) {
    console.log("Error completing negotiation:", error);
    res.status(500).json({ error: "Failed to complete negotiation" });
  }
};
