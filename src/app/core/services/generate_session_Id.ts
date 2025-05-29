export function generateSessionId(studentId: string): string {
  const timestamp = new Date().toISOString();
  return btoa(`${timestamp}:${studentId}`);
}