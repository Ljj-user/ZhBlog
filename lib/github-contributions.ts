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

function addDays(date: Date, amount: number) {
  const next = new Date(date)
  next.setUTCDate(next.getUTCDate() + amount)
  return next
}

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function startOfWeek(date: Date) {
  return addDays(date, -date.getUTCDay())
}

function endOfWeek(date: Date) {
  return addDays(date, 6 - date.getUTCDay())
}

function getAttribute(tag: string, name: string) {
  const match = tag.match(new RegExp(`${name}="([^"]+)"`))
  return match?.[1]
}

function buildMonths(weeks: ContributionWeek[]): ContributionMonth[] {
  const months: ContributionMonth[] = []

  weeks.forEach((week, index) => {
    const weekDates = week.contributionDays.map((day) => new Date(day.date))
    const firstOfMonth = weekDates.find((date) => date.getUTCDate() === 1)
    const labelDate = index === 0 ? weekDates[0] : firstOfMonth

    if (!labelDate) {
      return
    }

    months.push({
      firstDay: week.firstDay,
      name: labelDate.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
      totalWeeks: 0,
      year: labelDate.getUTCFullYear(),
    })
  })

  return months.map((month, index) => ({
    ...month,
    totalWeeks: (months[index + 1] ? weeks.findIndex((week) => week.firstDay === months[index + 1].firstDay) : weeks.length) -
      weeks.findIndex((week) => week.firstDay === month.firstDay),
  }))
}

async function getPublicGithubContributionCalendar(username: string): Promise<ContributionCalendar> {
  const to = new Date()
  const from = new Date(to)
  from.setUTCFullYear(to.getUTCFullYear() - 1)

  const fromKey = formatDateKey(from)
  const toKey = formatDateKey(to)

  const response = await fetch(`https://github.com/users/${username}/contributions?from=${fromKey}&to=${toKey}`, {
    headers: {
      "User-Agent": "ZhBlog",
    },
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`GitHub contributions page request failed with status ${response.status}`)
  }

  const svg = await response.text()
  const rectTags = svg.match(/<rect\b[^>]*data-date="[^"]+"[^>]*>/g) ?? []

  if (!rectTags.length) {
    throw new Error(`No public contribution data returned for ${username}`)
  }

  const contributions = rectTags
    .map((tag) => {
      const date = getAttribute(tag, "data-date")
      const count = Number(getAttribute(tag, "data-count") ?? "0")

      if (!date) {
        return null
      }

      return {
        contributionCount: Number.isFinite(count) ? count : 0,
        date,
      }
    })
    .filter((day): day is { contributionCount: number; date: string } => day !== null)
    .sort((left, right) => left.date.localeCompare(right.date))

  if (!contributions.length) {
    throw new Error(`Parsed contribution data for ${username} was empty`)
  }

  const contributionMap = new Map(contributions.map((day) => [day.date, day.contributionCount]))
  const firstDate = new Date(`${contributions[0].date}T00:00:00.000Z`)
  const lastDate = new Date(`${contributions[contributions.length - 1].date}T00:00:00.000Z`)
  const firstWeekStart = startOfWeek(firstDate)
  const lastWeekEnd = endOfWeek(lastDate)
  const weeks: ContributionWeek[] = []

  for (let weekStart = new Date(firstWeekStart); weekStart <= lastWeekEnd; weekStart = addDays(weekStart, 7)) {
    const contributionDays: ContributionDay[] = Array.from({ length: FALLBACK_ROWS }).map((_, weekday) => {
      const day = addDays(weekStart, weekday)
      const dateKey = formatDateKey(day)

      return {
        contributionCount: contributionMap.get(dateKey) ?? 0,
        date: `${dateKey}T00:00:00.000Z`,
        weekday,
      }
    })

    weeks.push({
      contributionDays,
      firstDay: contributionDays[0]?.date ?? weekStart.toISOString(),
    })
  }

  return {
    months: buildMonths(weeks),
    totalContributions: contributions.reduce((sum, day) => sum + day.contributionCount, 0),
    weeks,
  }
}

export async function getGithubContributionCalendar(username: string): Promise<ContributionCalendar> {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return getPublicGithubContributionCalendar(username)
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
