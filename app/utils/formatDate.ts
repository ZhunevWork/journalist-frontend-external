import dayjs from "dayjs";

function formatDate(created_at: string) {
  const date = dayjs(created_at);
  const today = dayjs();
  const yesterday = dayjs().subtract(1, "day");

  if (date.isSame(today, "day")) {
    return "Сегодня";
  } else if (date.isSame(yesterday, "day")) {
    return "Вчера";
  } else {
    return date.format("DD.MM.YYYY");
  }
}

export default formatDate