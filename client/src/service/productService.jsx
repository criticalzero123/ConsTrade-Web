export const categoryOptions = ["--SELECT--", "FPS", "ARPG", "RPG"];
export const platformOptions = [
  "--SELECT--",
  "XBox360",
  "Xbox",
  "Switch",
  "PS4",
];
export const conditionOptions = [
  "Brand New",
  "Used - Like New",
  "Used - Good",
  "Slightly Used",
];
export const preferTradeOptions = ["Selling", "Swapping", "Trade-in"];
export const meetupPreferenceOptions = ["Public Meetup", "Deliver"];

export const addHookSelect = (value, hook, setHook) => {
  if (!(value === "--SELECT--")) {
    const exist = hook.some((hookValue) => hookValue === value);
    if (exist) {
      const filterized = hook.filter((hookValue) => hookValue !== value);

      setHook(filterized);
    } else {
      setHook([...hook, value]);
    }
  }
};

export const toArrayString = (string) => {
  if (string !== undefined && string.indexOf(",") > -1) {
    return string.split(",");
  } else {
    return new Array(string);
  }
};
