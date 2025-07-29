import { LEAD_PROCESS_STATUS, prisma, type Lead } from "./client";
export {
  LEAD_PROCESS_STATUS,
  type Lead,
  type LeadProcessStatus,
} from "./client";

export const MAX_UPDATE_RETRY = 3;

export type OperationResult<TData> =
  | {
      success: true;
      data: TData;
    }
  | {
      // In real world app, maybe consider also return class that extends `Error` class
      // to inform what error that actually happens
      success: false;
      data: null;
    };

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
        status: LEAD_PROCESS_STATUS.PROCESSING,
      },
    });

    return {
      success: true,
      data: newLead,
    };
  } catch {
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
  } catch {
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
  } catch {
    return {
      success: false,
      data: null,
    };
  }
}

export async function getAllUnfinishLeads(): Promise<OperationResult<Lead[]>> {
  try {
    const leads = await prisma.lead.findMany({
      where: {
        status: {
          in: [LEAD_PROCESS_STATUS.PROCESSING, LEAD_PROCESS_STATUS.PENDING],
        },
        AND: {
          retry: {
            lt: MAX_UPDATE_RETRY,
          },
        },
      },
    });

    return {
      success: true,
      data: leads,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
}

export type UpdateLeadIn = Lead;

export async function updateLead({
  id,
  ...newLeadData
}: UpdateLeadIn): Promise<OperationResult<Lead>> {
  try {
    const updatedLead = await prisma.lead.update({
      data: newLeadData,
      where: {
        id,
      },
    });

    return {
      success: true,
      data: updatedLead,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
}
