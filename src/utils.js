export function greeting() {
  const currentHour = new Date().getHours();
  switch (currentHour) {
    case currentHour < 12 || currentHour === 0:
      return "Good morning";

    case currentHour < 16:
      return "Good afternoon";

    default:
      return "Good evening";
  }
}
