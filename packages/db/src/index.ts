import { LEAD_PROCESS_STATUS, prisma, type Lead } from "./client";
export {
  LEAD_PROCESS_STATUS,
  type Lead,
  type LeadProcessStatus,
} from "./client";

export const MAX_UPDATE_RETRY = 3;

export class QueryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QueryError";
    this.message = message;
  }
}

export type OperationResult<TData> =
  | {
      success: true;
      data: TData;
    }
  | {
      success: false;
      error: Error;
      data: null;
    };

async function runQuery<
  TCallback extends () => Promise<unknown>,
  TReturn extends Awaited<ReturnType<TCallback>>,
>(callback: TCallback): Promise<OperationResult<TReturn>> {
  try {
    const callbackResult = await callback();

    return {
      success: true,
      data: callbackResult as TReturn,
    };
  } catch (error) {
    // It's better to handle each error type properly in real world app
    if (error instanceof Error) {
      return {
        success: false,
        error: new QueryError(error.message),
        data: null,
      };
    }

    return {
      success: false,
      error: new QueryError(`Unhandled error: ${String(error)}`),
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
  return await runQuery(async () => {
    const newLead = await prisma.lead.create({
      data: {
        keyword: input.keyword,
        status: LEAD_PROCESS_STATUS.PROCESSING,
      },
    });

    return newLead;
  });
}

export type GetLeadByKeywordIn = {
  keyword: string;
};

export async function getLeadByKeyword(
  input: GetLeadByKeywordIn,
): Promise<OperationResult<Lead | null>> {
  return await runQuery(async () => {
    const lead = await prisma.lead.findFirst({
      where: {
        keyword: {
          equals: input.keyword,
        },
      },
    });
    return lead;
  });
}

export async function getAllLeads(): Promise<OperationResult<Lead[]>> {
  return await runQuery(async () => {
    const leads = await prisma.lead.findMany();
    return leads;
  });
}

export async function getAllUnfinishLeads(): Promise<OperationResult<Lead[]>> {
  return await runQuery(async () => {
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

    return leads;
  });
}

export type UpdateLeadIn = Lead;

export async function updateLead({
  id,
  ...newLeadData
}: UpdateLeadIn): Promise<OperationResult<Lead>> {
  return await runQuery(async () => {
    const updatedLead = await prisma.lead.update({
      data: newLeadData,
      where: {
        id,
      },
    });
    return updatedLead;
  });
}
