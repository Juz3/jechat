const getTime = () => {
  const time = new Date();
  const EEST_DIFFERENCE = 3;
  let hours;

  // In production, use UTC, otherwise use EEST.
  if (process.env.NODE_ENV === "production") {
    hours = time.getHours() + EEST_DIFFERENCE;
  } else {
    hours = time.getHours();
  }
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  if (seconds < 10) seconds = ("0" + seconds).toString();
  if (minutes < 10) minutes = ("0" + minutes).toString();

  const formattedTime = hours + ":" + minutes + ":" + seconds;

  return formattedTime;
};

module.exports = getTime;
