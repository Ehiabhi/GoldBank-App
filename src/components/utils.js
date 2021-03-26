export function greeting() {
  const currentHour = new Date().getHours();
  if (currentHour < 12 || currentHour === 0) {
    return "Good morning";
  } else if (currentHour < 16) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}
