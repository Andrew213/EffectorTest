function shuffleArray<T>(initArray: T[]): T[] {
  for (let i = initArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [initArray[i], initArray[j]] = [initArray[j], initArray[i]];
  }
  return initArray;
}

export default shuffleArray;
