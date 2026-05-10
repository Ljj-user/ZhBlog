import { z } from "zod"

const requiredText = (label: string) => z.string().trim().min(1, `${label} is required`)

export const adminActionStateSchema = z.object({
  ok: z.boolean(),
  message: z.string(),
})

export type AdminActionState = z.infer<typeof adminActionStateSchema>

const linkItemSchema = z.object({
  name: requiredText("Name"),
  href: requiredText("Href"),
})

const friendLinkItemSchema = z.object({
  name: requiredText("Name"),
  url: requiredText("URL"),
  tag: requiredText("Tag"),
  description: requiredText("Description"),
})

const projectItemSchema = z.object({
  slug: requiredText("Slug"),
  title: requiredText("Title"),
  href: requiredText("Href"),
  tags: z.array(z.string().trim().min(1)).min(1, "Keep at least one tag"),
  description: requiredText("Description"),
})

const albumItemSchema = z.object({
  id: requiredText("Album id"),
  name: requiredText("Album name"),
  description: requiredText("Album description"),
})

const photoItemSchema = z.object({
  id: requiredText("Photo id"),
  src: requiredText("Photo src"),
  alt: requiredText("Photo alt"),
  width: z.number().int().positive("Width must be greater than 0"),
  height: z.number().int().positive("Height must be greater than 0"),
  albumId: requiredText("Album id"),
  date: requiredText("Date"),
  caption: requiredText("Caption"),
  tags: z.array(z.string().trim().min(1)).min(1, "Keep at least one tag"),
  category: requiredText("Category"),
  featured: z.boolean(),
  sortOrder: z.number().int().nonnegative("Sort order must be 0 or greater"),
})

export const profileBasicSchema = z.object({
  siteTitle: requiredText("Site title"),
  name: requiredText("Name"),
  role: requiredText("Role"),
  avatar: requiredText("Avatar URL"),
  coverImage: requiredText("Cover image URL"),
  bio: requiredText("Bio"),
  location: requiredText("Home location label"),
  aboutLocation: requiredText("About location label"),
  focusSummary: requiredText("Focus summary"),
  availabilityLabel: requiredText("Availability label"),
})

export const profileContactSchema = z.object({
  email: z.string().trim().email("A valid email is required"),
  intro: requiredText("Intro"),
  summary: requiredText("Summary"),
  contactCopy: requiredText("Contact copy"),
  homeSidebarEmailLabel: requiredText("Sidebar email label"),
  homeSidebarEmailDescription: requiredText("Sidebar email description"),
})

export const profileTagsSchema = z.object({
  profileTags: z.array(z.string().trim().min(1)).min(1, "Keep at least one home tag"),
  aboutTags: z.array(z.string().trim().min(1)).min(1, "Keep at least one about tag"),
  focusAreas: z.array(z.string().trim().min(1)).min(1, "Keep at least one focus area"),
})

export const homeHeroSchema = z.object({
  eyebrow: requiredText("Hero eyebrow"),
  titleLine1: requiredText("Hero title line 1"),
  titleLine2: requiredText("Hero title line 2"),
  description: requiredText("Hero description"),
})

export const noticeCardSchema = z.object({
  eyebrow: requiredText("Card eyebrow"),
  title: requiredText("Card title"),
  items: z.array(z.string().trim().min(1)).min(1, "Keep at least one item"),
})

export const designMediaSchema = z.object({
  eyebrow: requiredText("Design Media eyebrow"),
  title: requiredText("Design Media title"),
  description: requiredText("Design Media description"),
  backgroundImage: requiredText("Design Media background image"),
})

export const playerSchema = z.object({
  eyebrow: requiredText("Player eyebrow"),
  title: requiredText("Player title"),
})

export const quickLinksSchema = z.object({
  quickLinks: z
    .array(
      z.object({
        label: requiredText("Label"),
        description: requiredText("Description"),
        href: requiredText("Href"),
      }),
    )
    .min(1, "Keep at least one quick link"),
})

export const navigationItemsSchema = z.object({
  items: z.array(linkItemSchema).min(1, "Keep at least one navigation item"),
})

export const socialLinksSchema = z.object({
  items: z.array(linkItemSchema).min(1, "Keep at least one social link"),
})

export const friendsHeroSchema = z.object({
  eyebrow: requiredText("Hero eyebrow"),
  title: requiredText("Hero title"),
  description: requiredText("Hero description"),
})

export const exchangeCardSchema = z.object({
  title: requiredText("Exchange title"),
  description: requiredText("Exchange description"),
  ctaLabel: requiredText("CTA label"),
  ctaHref: requiredText("CTA href"),
})

export const friendsLinksSchema = z.object({
  items: z.array(friendLinkItemSchema).min(1, "Keep at least one friend link"),
})

export const githubProfileSchema = z.object({
  username: requiredText("GitHub username"),
  url: requiredText("GitHub url"),
})

export const projectsHeroSchema = z.object({
  eyebrow: requiredText("Hero eyebrow"),
  title: requiredText("Hero title"),
  description: requiredText("Hero description"),
})

export const projectListHeadingSchema = z.object({
  listHeading: requiredText("List heading"),
})

export const projectItemsSchema = z.object({
  items: z.array(projectItemSchema).min(1, "Keep at least one project"),
})

export const albumItemsSchema = z.object({
  items: z.array(albumItemSchema).min(1, "Keep at least one album"),
})

export const photoItemsSchema = z.object({
  items: z.array(photoItemSchema).min(1, "Keep at least one photo"),
})
