"use server";

import { db } from "@/lib/db";
import { StatusSchema } from "@/schemas";
import { z } from "zod";

export const competitionStatusAccept = async (values: z.infer<typeof StatusSchema>, id?: string) => {
    await db.competition.update({
        where: { id: id },
        data: { status: 'ACCEPTED' },
      });
}

export const competitionStatusDecline = async (values: z.infer<typeof StatusSchema>, id?: string) => {
    await db.competition.update({
        where: { id: id },
        data: { status: 'DECLINED' },
      });
}

export const datasetStatusAccept = async (values: z.infer<typeof StatusSchema>, id?: string) => {
  await db.dataset.update({
      where: { id: id },
      data: { status: 'ACCEPTED' },
    });
}

export const datasetStatusDecline = async (values: z.infer<typeof StatusSchema>, id?: string) => {
  await db.dataset.update({
      where: { id: id },
      data: { status: 'DECLINED' },
    });
}

export const submissionStatusAccept = async (values: z.infer<typeof StatusSchema>, id?: string) => {
  await db.submission.update({
      where: { id: id },
      data: { status: 'ACCEPTED' },
    });
}

export const submissionStatusDecline = async (values: z.infer<typeof StatusSchema>, id?: string) => {
  await db.submission.update({
      where: { id: id },
      data: { status: 'DECLINED' },
    });
}
