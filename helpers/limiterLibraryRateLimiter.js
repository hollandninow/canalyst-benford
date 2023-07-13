const { RateLimiter } = require('limiter');
const { sleep } = require('./getMillisToSleep');

class LimiterLibraryRateLimiter {
  constructor( { maxRequests, maxRequestWindowMS } ) {
    this.maxRequests = maxRequests;
    this.maxRequestWindowMS = maxRequestWindowMS;
    this.limiter = new RateLimiter({
      tokensPerInterval: 5,
      interval: 1000,
    });
  }

  async acquireToken (fn) {
    if (this.limiter.tryRemoveTokens(1)) {
      process.nextTick( () => {} );
      return fn();
    } else {
      await sleep(this.maxRequestWindowMS);
      return this.acquireToken(fn);
    }
  }
}

module.exports = LimiterLibraryRateLimiter;