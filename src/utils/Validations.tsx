import { fieldRef, fnShowErr } from "../types/ValidationUtils";

// COMMON FUNCS
const emptyFieldErr = (fieldRef: fieldRef, fnShowErr: fnShowErr) => {
  fieldRef.current?.setAttribute("required", "");
  fnShowErr("This field is required");
};

const invalidTypeErr = (fieldRef: fieldRef, fnShowErr: fnShowErr) => {
  const field = fieldRef.current;
  fnShowErr(field?.validationMessage.slice(0, -1));
};

const invalidValueErr = (
  fieldRef: fieldRef,
  fnShowErr: fnShowErr,
  errMsg: string = "Invalid value"
) => {
  const field = fieldRef.current;
  const isValid = field?.checkValidity();

  field?.setCustomValidity(errMsg);
  !isValid && fnShowErr(field?.validationMessage);
};

export const blockInvalidChars = (e: React.KeyboardEvent) => {
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
};

const clearErrors = (fieldRef: fieldRef, fnShowErr: fnShowErr) => {
  const field = fieldRef.current;

  field?.setCustomValidity("");
  fnShowErr(field?.validationMessage);
};

// VALIDATIONS
export const dateCheck = (fieldRef: fieldRef, fnShowErr: fnShowErr) => {
  const dateField = fieldRef.current;
  const dateVal = Number(dateField?.value);
  const isEmpty = dateField?.value === "";
  const invalidDate = dateVal === 0 || !(dateVal > 0) || !(dateVal <= 31);

  // in case 'e' is entreted (Euler's number)
  if (dateField?.validity.badInput) {
    return invalidTypeErr(fieldRef, fnShowErr);
  }

  if (isEmpty) {
    return emptyFieldErr(fieldRef, fnShowErr);
  }

  if (invalidDate) {
    return invalidValueErr(fieldRef, fnShowErr, "Must be a valid day");
  }
  clearErrors(fieldRef, fnShowErr);
};

export const monthCheck = (fieldRef: fieldRef, fnShowErr: fnShowErr) => {
  const monthField = fieldRef.current;
  const monthVal = Number(monthField?.value);
  const invalidMonth = monthVal === 0 || !(monthVal > 0) || !(monthVal <= 12);

  if (monthField?.validity.badInput) {
    return invalidTypeErr(fieldRef, fnShowErr);
  }

  if (monthField?.value === "") {
    return emptyFieldErr(fieldRef, fnShowErr);
  }

  if (invalidMonth) {
    return invalidValueErr(fieldRef, fnShowErr, "Must be a valid month");
  }
  clearErrors(fieldRef, fnShowErr);
};

// YEAR VALIDATION
export const yearCheck = (fieldRef: fieldRef, fnShowErr: fnShowErr) => {
  const yearField = fieldRef.current;
  const yearVal = Number(yearField?.value);
  const invalidYear = yearVal > new Date().getFullYear();

  if (yearField?.validity.badInput) {
    return invalidTypeErr(fieldRef, fnShowErr);
  }

  if (yearField?.value === "") {
    return emptyFieldErr(fieldRef, fnShowErr);
  }

  if (invalidYear) {
    return invalidValueErr(fieldRef, fnShowErr, "Must be in the past");
  }

  if (yearVal <= 0) {
    return invalidValueErr(fieldRef, fnShowErr, "Invalid year");
  }
  clearErrors(fieldRef, fnShowErr);
};

//full date validation -> RUNS ON SUBMIT
export const checkFullDate = (day: string, month: string, year: string) => {
  const dayNum = +day;
  const monthNum = +month - 1;
  const yearNum = +year;

  // 1. All values can be converted to numbers -> isNan(+val)
  if ([dayNum, monthNum, yearNum].some((val) => isNaN(val))) {
    return false;
  }

  // 2. if date is incorrect (30/2/2024) -> check that the month matches the reference month

  const leapYear =
    (yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0;
  const dateLimits = [
    31,
    leapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  if (
    monthNum < 0 ||
    monthNum > 11 ||
    dayNum < 1 ||
    dayNum > dateLimits[monthNum]
  ) {
    return false;
  }

  // 3. if full date is ahead of current date -> setYearErr("Must be in the past")
  const queryDate = new Date(yearNum, monthNum, dayNum);
  if (queryDate > new Date()) {
    return false;
  }

  return true;
};
