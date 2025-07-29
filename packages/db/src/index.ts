import { LEAD_PROCESS_STATUS, prisma, type Lead } from "./client";

export type OperationResult<TData> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      data: null;
    };

export async function leadCount(): Promise<OperationResult<number>> {
  try {
    const count = await prisma.lead.count();
    return {
      success: true,
      data: count,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
}

export type CreateLeadIn = {
  keyword: string;
};

export async function createLead(
  input: CreateLeadIn,
): Promise<OperationResult<Lead>> {
  try {
    const newLead = await prisma.lead.create({
      data: {
        keyword: input.keyword,
        status: LEAD_PROCESS_STATUS.processing,
      },
    });

    return {
      success: true,
      data: newLead,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
}

export type GetLeadByKeywordIn = {
  keyword: string;
};

export async function getLeadByKeyword(
  input: GetLeadByKeywordIn,
): Promise<OperationResult<Lead | null>> {
  try {
    const lead = await prisma.lead.findFirst({
      where: {
        keyword: {
          equals: input.keyword,
        },
      },
    });

    return {
      success: true,
      data: lead,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
}

export async function getAllLeads(): Promise<OperationResult<Lead[]>> {
  try {
    const leads = await prisma.lead.findMany();

    return {
      success: true,
      data: leads,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
}
