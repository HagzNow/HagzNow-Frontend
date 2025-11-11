export const formatTime = (hour, lang = "ar") => {
  if (typeof hour !== "number") return "";
  let h = hour;
  const suffix =
    h >= 12 ? (lang === "ar" ? "م" : "PM") : lang === "ar" ? "ص" : "AM";
  if (h === 0) h = 12;
  if (h > 12) h -= 12;
  return `${h} ${suffix}`;
};

export const getTimeRanges = (slots = []) => {
  if (!slots || slots.length === 0) return [];

  const hours = slots.map((slot) => {
    if (typeof slot === "number") return slot;
    if (slot?.start?.hour) return slot.start.hour;
    if (slot?.hour) return slot.hour;
    return null;
  });

  const validHours = hours.filter((h) => typeof h === "number");

  if (validHours.length === 0) return [];

  const sorted = [...validHours].sort((a, b) => a - b);
  const ranges = [];

  let start = sorted[0];
  let end = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) {
      end = sorted[i];
    } else {
      ranges.push({ start, end });
      start = sorted[i];
      end = sorted[i];
    }
  }

  ranges.push({ start, end });
  return ranges;
};
