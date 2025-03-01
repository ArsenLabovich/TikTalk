export interface Profile {
  id: number|null,
  username: string,
  avatarUrl: string | null,
  subscriptionsAmount: number,
  firstName: string,
  lastName: string,
  isActive: boolean,
  stack: string[],
  city: string,
  description: string
}
