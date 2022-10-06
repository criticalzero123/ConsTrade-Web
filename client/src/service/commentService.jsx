export const calculateDateRelative = (_timeStamp) => {
  const timeStamp = new Date(_timeStamp).getTime();
  const humanDate = new Date(timeStamp);

  const localTime = new Date();

  const isMonthLapse = localTime.getMonth() - humanDate.getMonth() === 0;
  const isDayLapse = localTime.getDay() - humanDate.getDay() === 0;

  const _isHourCondition1 =
    humanDate.getHours() - localTime.getHours() < 0 &&
    localTime.getMinutes() - humanDate.getMinutes() < 0;

  const _isHourCondition2 =
    humanDate.getHours() - localTime.getHours() === 0 &&
    localTime.getMinutes() - humanDate.getMinutes() > 0;

  const isHourLapse = _isHourCondition1 || _isHourCondition2;

  const isMinutesLapse = localTime.getMinutes() - humanDate.getMinutes() === 0;

  if (isMonthLapse) {
    if (isDayLapse) {
      if (isHourLapse) {
        if (isMinutesLapse) {
          const toCommentTime = Math.abs(
            localTime.getSeconds() - humanDate.getSeconds()
          );

          return toCommentTime + " seconds";
        } else {
          var minutesDifference =
            localTime.getMinutes() - humanDate.getMinutes();

          minutesDifference =
            minutesDifference < 0 ? 60 + minutesDifference : minutesDifference;

          const toCommentTime = minutesDifference + "m";

          return toCommentTime;
        }
      } else {
        const toCommentTime = Math.abs(
          humanDate.getHours() - localTime.getHours()
        );

        return toCommentTime + "h";
      }
    } else {
      const toCommentTime = humanDate.getDay() - localTime.getDay();
      return Math.abs(toCommentTime) + "d";
    }
  } else {
    const toCommentTime = Math.abs(humanDate.getMonth() - localTime.getMonth());
    return toCommentTime > 1
      ? toCommentTime + " months"
      : toCommentTime + " month";
  }
};
