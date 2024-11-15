export function fakeId(): string{
  return (Math.random() * 1000000).toString();
}

export function getRandomFutureTime(minTime = 2, maxTime = 20) {
  const minutesRemaining = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  return Date.now() + (minutesRemaining * 60 * 1000);
}
