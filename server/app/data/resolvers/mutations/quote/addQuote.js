import QuoteModel from '../../models/QuoteModel';
import PostModel from '../../models/PostModel';
import { logActivity } from '../../utils/activities_utils';
import { logger } from '../../../utils/logger';
import { updateTrending } from '../../utils/post_utils';
import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

// Rate limiting config (env)
const QUOTE_LIMIT_COUNT = Number(process.env.QUOTE_CREATION_LIMIT_COUNT || 2);
const QUOTE_LIMIT_WINDOW_MIN = Number(process.env.QUOTE_CREATION_LIMIT_WINDOW_MUNUTES || 10);

let addQuoteLimiter;
if (process.env.REDIS_URL) {
  const redisClient = new Redis(process.env.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
  });

  addQuoteLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rl:addQuote",
    points: QUOTE_LIMIT_COUNT,
    duration: QUOTE_LIMIT_WINDOW_MIN * 60,
    blockDuration: QUOTE_LIMIT_WINDOW_MIN * 60,
  })

  logger.info("Rate limiting: Using Redis Store")
}

else {
  addQuoteLimiter = new RateLimiterMemory({
    points: QUOTE_LIMIT_COUNT,
    duration: QUOTE_LIMIT_WINDOW_MIN * 60,
    blockDuration: QUOTE_LIMIT_WINDOW_MIN * 60,
  })

  logger.info("Rate limiting: Using Memory Store")
}


export const addQuote = (pubsub) => {
  return async (_, args, context) => {
    logger.info('Function: addQuote');

    const { user } = context || {};
    if (!user) {
      throw new Error("Authentication required");
    }

    const isAdmin = !!user.admin
    if (!isAdmin) {
      try {
        await addQuoteLimiter.consume(String(user._id)) 
      } catch (rejRes) {
        const message = "You have reached the posting limit. Please wait a few minutes before creating another quote."
        logger.warn('[RATE_LIMIT_EXCEEDED] addQuote', {
          userId: user._id,
          limit: QUOTE_LIMIT_COUNT,
          windowMinutes: QUOTE_LIMIT_WINDOW_MIN, 
          retryAfter: Math.round(rejRes.msBeforeNext / 1000),
        })

        const error = new Error(message);
        error.extensions = { code: 'RATE_LIMIT_EXCEEDED' }; 
        throw error;
      }
    }

    const quoteData = { ...args.quote, created: new Date() };

    try {
      const quote = await new QuoteModel(quoteData).save();
      await updateTrending(quote.postId);
      const post = await PostModel.findById(quote.postId);
      await logActivity(
        'QUOTED',
        { userId: quote.quoter, postId: quote.postId, quoteId: quote._id },
        `Quoted on '${post.title}' post.`,
      );
      return quote;
    } catch (err) {
      throw new Error(err);
    }
  };
};
