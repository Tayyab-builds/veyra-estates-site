/**
 * Derives simple, factual directory stats from the existing agents data —
 * counts only, never invented figures or awards.
 */
export function getAgentStats(agents) {
  const markets = Array.from(
    new Set(
      agents.flatMap((agent) =>
        agent.region
          .split('&')
          .map((part) => part.trim())
          .filter(Boolean),
      ),
    ),
  )

  return {
    count: agents.length,
    markets,
    marketsLabel: markets.length === 1 ? '1 Market' : `${markets.length} Markets`,
  }
}
