
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  error?: Error;
  userId?: string;
  sessionId?: string;
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel = LogLevel.INFO;
  private sessionId: string;
  private logBuffer: LogEntry[] = [];
  private maxBufferSize = 100;

  private constructor() {
    this.sessionId = this.generateSessionId();
    
    // Send logs periodically in production
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      setInterval(() => this.flushLogs(), 30000);
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  public setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  public error(message: string, error?: Error, context?: Record<string, any>): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  public warn(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, context);
  }

  public info(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, context);
  }

  public debug(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error): void {
    if (level > this.logLevel) return;

    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error,
      sessionId: this.sessionId
    };

    // Console output in development
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      this.consoleLog(logEntry);
    }

    // Buffer for production logging
    this.addToBuffer(logEntry);
  }

  private consoleLog(entry: LogEntry): void {
    const levelNames = ['ERROR', 'WARN', 'INFO', 'DEBUG'];
    const levelColors = ['#ff0000', '#ff8800', '#0088ff', '#888888'];
    
    const style = `color: ${levelColors[entry.level]}; font-weight: bold;`;
    const prefix = `%c[${levelNames[entry.level]}]`;
    
    if (entry.error) {
      console.group(`${prefix} ${entry.message}`, style);
      console.error(entry.error);
      if (entry.context) console.log('Context:', entry.context);
      console.groupEnd();
    } else {
      console.log(`${prefix} ${entry.message}`, style, entry.context || '');
    }
  }

  private addToBuffer(entry: LogEntry): void {
    this.logBuffer.push(entry);
    
    if (this.logBuffer.length > this.maxBufferSize) {
      this.logBuffer = this.logBuffer.slice(-this.maxBufferSize);
    }
  }

  private flushLogs(): void {
    if (this.logBuffer.length === 0) return;

    // In a real app, send to logging service
    // For now, we'll just clear the buffer
    console.info(`Flushing ${this.logBuffer.length} log entries`);
    this.logBuffer = [];
  }

  public getRecentLogs(count: number = 50): LogEntry[] {
    return this.logBuffer.slice(-count);
  }
}

export const logger = Logger.getInstance();
