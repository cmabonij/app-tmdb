import Toast from "react-native-toast-message";

export function FormatDate(input: any) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + '/' + month + '/' + year;
}

export const accountId = 21317909;


export const showToast = (type: 'success' | 'error', text: string) => {
  type === 'success'
    ? Toast.show({
        type: 'success',
        text1: text,
      })
    : Toast.show({
        type: 'error',
        text1: text,
      });
};