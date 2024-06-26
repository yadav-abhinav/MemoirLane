import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  return {
    message: `${issue.path}: ${ctx.defaultError}`,
  };
};

z.setErrorMap(customErrorMap);
