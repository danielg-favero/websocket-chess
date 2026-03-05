class Logger {
  public log(message: string) {
    console.log(`✅ [LOG] ${message}`);
  }

  public error(message: string) {
    console.error(`❌ [ERROR] ${message}`);
  }

  public warn(message: string) {
    console.warn(`⚠️ [WARN] ${message}`);
  }
}

export const logger = new Logger();
