process.on('uncaughtException', (error) => {
  console.log(`uncaughtException: ${error}`);
});

process.on('unhandledRejection', (error) => {
  console.log(error);
});

setTimeout(() => {
  throw new Error('async error');
}, 300);

throw new Error('error in Node');
