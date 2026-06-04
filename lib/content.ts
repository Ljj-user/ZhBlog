import navigationData from "@/content/site/navigation.json"
import socialLinksData from "@/content/site/social-links.json"
import profileData from "@/content/site/profile.json"
import homeData from "@/content/site/home.json"
import friendsData from "@/content/site/friends.json"
import projectsData from "@/content/site/projects.json"
import albumsData from "@/content/photos/albums.json"
import photosData from "@/content/photos/photos.json"

export interface NavigationItem {
  name: string
  href: string
}

export interface SocialLink {
  name: string
  href: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface ExperienceItem {
  period: string
  title: string
  org: string
  description: string
}

export interface EducationInfo {
  period: string
  school: string
  degree: string
}

export interface SiteProfile {
  siteTitle: string
  name: string
  role: string
  avatar: string
  coverImage: string
  intro: string
  summary: string
  bio: string
  location: string
  aboutLocation: string
  email: string
  focusSummary: string
  availabilityLabel: string
  profileTags: string[]
  aboutTags: string[]
  focusAreas: string[]
  skillGroups: SkillGroup[]
  experience: ExperienceItem[]
  education: EducationInfo
  contactCopy: string
  homeSidebarEmailLabel: string
  homeSidebarEmailDescription: string
}

export interface QuickLinkItem {
  label: string
  description: string
  href: string
}

export interface NoticeContent {
  eyebrow: string
  title: string
  items: string[]
  updatedAt?: string
}

export interface HomePhotoStripContent {
  eyebrow: string
  title: string
  badge: string
  description: string
  coverTitleLine1: string
  coverTitleLine2: string
  coverDescription: string
}

export interface HomeContent {
  hero: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    description: string
  }
  quickLinks: QuickLinkItem[]
  nowCard: NoticeContent
  noticeCard: NoticeContent
  photoStrip: HomePhotoStripContent
  recentWriting: {
    eyebrow: string
    title: string
    linkLabel: string
  }
  designMedia: {
    eyebrow: string
    title: string
    description: string
    backgroundImage: string
  }
  player: {
    eyebrow: string
    title: string
  }
}

export interface FriendLink {
  name: string
  url: string
  avatar?: string
  description: string
  tag: string
}

export interface FriendsContent {
  hero: {
    eyebrow: string
    title: string
    description: string
  }
  preferenceCard: NoticeContent
  exchangeCard: {
    title: string
    description: string
    ctaLabel: string
    ctaHref: string
  }
  items: FriendLink[]
}

export interface ProjectItem {
  slug: string
  title: string
  tags: string[]
  description: string
  href: string
  featured: boolean
  pain: string
  result: string
  lesson: string
  developmentVibe: string
}

export interface ProjectsContent {
  githubProfile: {
    username: string
    url: string
  }
  hero: {
    eyebrow: string
    title: string
    description: string
  }
  listHeading: string
  items: ProjectItem[]
}

export interface PhotoAlbum {
  id: string
  name: string
  description: string
}

export interface PhotoItem {
  id: string
  src: string
  alt: string
  width: number
  height: number
  albumId: string
  date: string
  caption: string
  tags: string[]
  category: string
  location?: string
  featured: boolean
  sortOrder: number
  exifCamera?: string
  exifFocalLength?: string
  exifAperture?: string
  exifShutterSpeed?: string
  exifIso?: string
}

export function getNavigationItems(): NavigationItem[] {
  return navigationData.items as NavigationItem[]
}

export function getSocialItems(): SocialLink[] {
  return socialLinksData.items as SocialLink[]
}

export function getSiteProfile(): SiteProfile {
  return profileData as SiteProfile
}

export function getHomeContent(): HomeContent {
  return homeData as HomeContent
}

export function getFriendsContent(): FriendsContent {
  return friendsData as FriendsContent
}

export function getProjectsContent(): ProjectsContent {
  return projectsData as ProjectsContent
}

export function getPhotoAlbums(): PhotoAlbum[] {
  return albumsData.items as PhotoAlbum[]
}

export function getPhotos(): PhotoItem[] {
  return photosData.items.slice().sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getFeaturedPhotos(limit?: number): Array<PhotoItem & { albumName: string }> {
  const albums = getPhotoAlbums()
  const albumMap = new Map(albums.map((album) => [album.id, album.name]))
  const items = getPhotos()
    .filter((photo) => photo.featured)
    .map((photo) => ({
      ...photo,
      albumName: albumMap.get(photo.albumId) ?? photo.albumId,
    }))

  return typeof limit === "number" ? items.slice(0, limit) : items
}
