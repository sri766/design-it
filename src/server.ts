import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { getPayloadClient } from './get-payload';
import { nextApp, nextHandler } from './next-utils';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc';
import { inferAsyncReturnType } from '@trpc/server';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ req, res });
export type ExpressContext = inferAsyncReturnType<typeof createContext>;

// Middleware to handle CORS and cookies
app.use(cors({
    origin: process.env.NEXT_PUBLIC_CLIENT_URL, // Update with your client URL
    credentials: true, // Enable credentials (cookies)
}));
app.use(cookieParser());

// Start function
const start = async () => {
    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
            },
        },
    });

    // TRPC Middleware
    app.use('/api/trpc', trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    }));

    // Next.js handler
    app.use((req, res) => nextHandler(req, res));

    // Prepare and start Next.js app
    nextApp.prepare().then(() => {
        payload.logger.info('Next.js started');

        app.listen(PORT, async () => {
            payload.logger.info(`Next.js App Url: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
        });
    });
};

start();
