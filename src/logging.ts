import ENV from './env';

const targets = (() => {
  const targets: any = [
    {
      level: ENV.LOG_LEVEL,
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:yyyy-mm-dd"T"HH:MM:ss.l',
        ignore: 'pid,hostname',
      },
    },
  ];

  if (ENV.LOG_FILE) {
    targets.push({
      level: ENV.LOG_LEVEL,
      target: 'pino/file',
      options: {
        destination: ENV.LOG_FILE,
      },
    });
  }

  return targets;
})();

const logConfig: { [key: string]: any } = {
  transport: {
    targets,
  },
};

export default logConfig;
