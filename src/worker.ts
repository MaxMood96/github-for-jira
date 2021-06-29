import throng from 'throng';
import { initializeSentry } from './config/sentry';
import { start } from './worker/main';

const isProd = process.env.NODE_ENV === 'production';
initializeSentry();

// TODO: this should work in dev/production and should be `workers = process.env.NODE_ENV === 'production' ? undefined : 1`
if (isProd) {
  throng(
    {
      lifetime: Infinity,
    },
    start,
  );
} else {
  start();
}
