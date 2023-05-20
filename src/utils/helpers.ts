export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  }

  return new Intl.DateTimeFormat('en-us', options).format(new Date(date))
}