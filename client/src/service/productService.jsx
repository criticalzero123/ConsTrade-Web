// export const categoryOptions = [
//   "--SELECT--",
//   "Sandbox",
//   "Real-time strategy (RTS)",
//   "Multiplayer online battle arena (MOBA)",
//   "Role-playing (RPG, ARPG, etc..)",
//   "Simulation and sports",
//   "Puzzlers and party games",
//   "Action-adventure",
//   "Survival and horror",
// ];
export const categoryOptions = [
  "--SELECT--",
  "Sandbox",
  "RTS",
  "MOBA",
  "RPG",
  "ARPG",
  "Simulation",
  "Sports",
  "Action",
  "Adventure",
  "Survival",
  "Horror",
];
export const platformOptions = [
  "--SELECT--",
  "XBox360",
  "Xbox",
  "Switch",
  "PS4",
  "Others...",
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
  if (value !== "--SELECT--" && value !== "") {
    const exist = hook.some(
      (hookValue) =>
        hookValue.toString().toLowerCase() === value.toString().toLowerCase()
    );
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
