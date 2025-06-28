module.exports = {
  apps: [
    {
      name: 'HHSB',
      script: 'dist/server.js',
      env: {
        NODE_ENV: 'development',
        SECRET: 'HHSB',
        LYRICIST_TOKEN: 'UJYTnEMS0QZluVoY_1yooeL3OHXnsv9ShkAVK48GKjCJvvN4zYVrR60FJwnrnLeb',
        DATABASE_URL: 'mongodb+srv://louis:IhzhFOrNAPnxNcGy@quote.rd8lj.mongodb.net/?retryWrites=true&w=majority',
        SMTP_HOST: 'smtp.gmail.com',
        SMTP_PORT: 587,
        SMTP_USER: 'ropeitgolf@gmail.com',
        SMTP_PASS: 'sttj cuxb twwn ydrt',
        FROM_EMAIL: 'ropeitgolf@gmail.com',
        CLIENT_URL: 'https://www.quote.vote/',
        REQUEST_ACCESS_URL: 'https://comment.quote.vote/auth/request-access',
        // SANDBOX_STRIPE_SECRET_KEY: 'sk_test_51HKHNzGRGwUA6VaVMFGDIottzcDOihSfghqgvrumJCMH4eqwVA6GOO9oFvc1Aqd0FU8IhKZEHliLiMRff0eAx3eR00rXSnzgmF',
        // LIVE_STRIPE_SECRET_KEY: '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',
        // TO_INVESTOR_EMAIL: 'olivermolina10@gmail.com,louisgirifalco@gmail.com',
        // STRIPE_ENVIRONMENT: 'production',
      },
    },
  ],
};
