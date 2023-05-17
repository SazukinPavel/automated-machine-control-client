function getLogColorByLevel(level: string) {
  const levelColorMap: any = {
    error: "red",
    warn: "amber",
    log: "green",
    verbose: "pink",
    debug: "purple",
  };
  return levelColorMap[level];
}

export default getLogColorByLevel;
