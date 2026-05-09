type ContributionDay = {
  contributionCount: number
  date: string
  weekday: number
}

type ContributionWeek = {
  contributionDays: ContributionDay[]
  firstDay: string
}

type ContributionMonth = {
  firstDay: string
  name: string
  totalWeeks: number
  year: number
}

export type ContributionCalendar = {
  months: ContributionMonth[]
  totalContributions: number
  weeks: ContributionWeek[]
}

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar: ContributionCalendar
      }
    }
  }
  errors?: Array<{ message: string }>
}

const FALLBACK_MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"]
const FALLBACK_COLUMNS = 52
const FALLBACK_ROWS = 7

const fallbackLevels = {
  low: [
    [43, 4],
    [44, 3],
    [45, 2],
    [48, 0],
    [49, 0],
    [50, 1],
    [47, 5],
    [48, 5],
  ],
  mid: [
    [43, 3],
    [47, 4],
    [47, 6],
    [48, 4],
    [49, 5],
    [50, 4],
  ],
  high: [
    [43, 4],
    [48, 6],
    [49, 4],
  ],
} as const

function toDateKey(column: number, row: number) {
  return `${column}-${row}`
}

function getFallbackContributionCount(column: number, row: number) {
  const key = toDateKey(column, row)

  if (fallbackLevels.high.some(([x, y]) => toDateKey(x, y) === key)) {
    return 8
  }

  if (fallbackLevels.mid.some(([x, y]) => toDateKey(x, y) === key)) {
    return 4
  }

  if (fallbackLevels.low.some(([x, y]) => toDateKey(x, y) === key)) {
    return 1
  }

  return 0
}

export function getFallbackContributionCalendar(): ContributionCalendar {
  const today = new Date()
  const weeks: ContributionWeek[] = Array.from({ length: FALLBACK_COLUMNS }).map((_, column) => {
    const start = new Date(today)
    start.setDate(today.getDate() - (FALLBACK_COLUMNS - 1 - column) * 7)

    const contributionDays: ContributionDay[] = Array.from({ length: FALLBACK_ROWS }).map((__, row) => {
      const day = new Date(start)
      day.setDate(start.getDate() + row)

      return {
        contributionCount: getFallbackContributionCount(column, row),
        date: day.toISOString(),
        weekday: row,
      }
    })

    return {
      contributionDays,
      firstDay: contributionDays[0]?.date ?? start.toISOString(),
    }
  })

  return {
    months: FALLBACK_MONTHS.map((name, index) => ({
      firstDay: weeks[index * 4]?.firstDay ?? today.toISOString(),
      name,
      totalWeeks: 4,
      year: today.getFullYear(),
    })),
    totalContributions: weeks.flatMap((week) => week.contributionDays).reduce((sum, day) => sum + day.contributionCount, 0),
    weeks,
  }
}

export function getContributionIntensity(count: number, maxCount: number) {
  if (count <= 0) {
    return "none"
  }

  const safeMax = Math.max(maxCount, 1)
  const ratio = count / safeMax

  if (ratio >= 0.75) {
    return "high"
  }

  if (ratio >= 0.35) {
    return "mid"
  }

  return "low"
}

export async function getGithubContributionCalendar(username: string): Promise<ContributionCalendar> {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return getFallbackContributionCalendar()
  }

  const to = new Date()
  const from = new Date(to)
  from.setFullYear(to.getFullYear() - 1)

  const query = `
    query UserContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            months {
              firstDay
              name
              totalWeeks
              year
            }
            weeks {
              firstDay
              contributionDays {
                contributionCount
                date
                weekday
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`GitHub API request failed with status ${response.status}`)
  }

  const result = (await response.json()) as GraphQLResponse

  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join("; "))
  }

  const calendar = result.data?.user?.contributionsCollection?.contributionCalendar

  if (!calendar) {
    throw new Error(`No contribution calendar returned for ${username}`)
  }

  return calendar
}
