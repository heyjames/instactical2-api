function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(null), ms);
  });
}

exports.timeout = timeout;