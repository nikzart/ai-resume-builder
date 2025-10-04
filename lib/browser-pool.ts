import puppeteer, { Browser } from "puppeteer";

class BrowserPool {
  private browsers: Browser[] = [];
  private maxBrowsers = 2;
  private initializationPromise: Promise<void> | null = null;

  async initialize() {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = (async () => {
      try {
        // Pre-launch one browser instance
        const browser = await puppeteer.launch({
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--disable-web-security', // Allow local navigation
          ]
        });
        this.browsers.push(browser);
        console.log("Browser pool initialized with 1 browser");
      } catch (error) {
        console.error("Failed to initialize browser pool:", error);
        this.initializationPromise = null;
      }
    })();

    return this.initializationPromise;
  }

  async getBrowser(): Promise<Browser> {
    await this.initialize();

    // Return existing browser if available and connected
    for (const browser of this.browsers) {
      if (browser.connected) {
        return browser;
      }
    }

    // If no connected browsers or we're under the limit, create a new one
    if (this.browsers.length < this.maxBrowsers) {
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-web-security',
        ]
      });
      this.browsers.push(browser);
      return browser;
    }

    // All browsers disconnected, recreate one
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-web-security',
      ]
    });
    this.browsers[0] = browser;
    return browser;
  }

  async cleanup() {
    for (const browser of this.browsers) {
      try {
        if (browser.connected) {
          await browser.close();
        }
      } catch (error) {
        console.error("Error closing browser:", error);
      }
    }
    this.browsers = [];
    this.initializationPromise = null;
  }
}

// Singleton instance
export const browserPool = new BrowserPool();

// Cleanup on process exit
if (typeof process !== 'undefined') {
  process.on('exit', () => {
    browserPool.cleanup();
  });

  process.on('SIGINT', () => {
    browserPool.cleanup();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    browserPool.cleanup();
    process.exit(0);
  });
}
