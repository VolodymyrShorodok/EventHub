export default function getInitials(firstName: string, lastName?: string): string {
  if (!lastName) {
    return firstName[0].toUpperCase();
  }

  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}
