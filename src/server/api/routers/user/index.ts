import { createTRPCRouter } from "~/server/api/trpc";
import { register } from "./register";

export const userRouter = createTRPCRouter({
  register,
});
