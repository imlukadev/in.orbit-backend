import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goal";
import { createGoalCompletionRoute } from "./routes/create-completion";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { getWeekSummmaryRoute } from "./routes/get-week-summary";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(createGoalCompletionRoute);
app.register(getPendingGoalsRoute);
app.register(getWeekSummmaryRoute);

app.register(fastifyCors, {
  origin: "*",
});

app
  .listen({
    port: 3300,
  })
  .then(() => {
    console.log("HTTP server running!");
  });
