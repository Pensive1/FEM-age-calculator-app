import { useEffect, useRef, useState } from "react";
import { DOBInput } from "../../types/ComponentProps";
import detailedAge from "../../utils/AgeCalc";
import {
  blockInvalidChars,
  checkFullDate,
  dateCheck,
  monthCheck,
  yearCheck,
  clearErrors,
} from "../../utils/Validations";
import "./DobInput-styles.scss";

const DobInput = ({
  setResultYears,
  setResultMonths,
  setResultDays,
}: DOBInput) => {
  const dobYear = useRef<HTMLInputElement>(null);
  const dobMonth = useRef<HTMLInputElement>(null);
  const dobDay = useRef<HTMLInputElement>(null);

  const yearField = dobYear.current;
  const monthField = dobMonth.current;
  const dayField = dobDay.current;

  const [dateErr, setDateErr] = useState("");
  const [monthErr, setMonthErr] = useState("");
  const [yearErr, setYearErr] = useState("");

  const allValidFields = [
    dayField?.validity.valid,
    monthField?.validity.valid,
    yearField?.validity.valid,
  ].every((field) => field === true);

  const checkAllFields = () => {
    if (allValidFields) {
      //Final check to clear date error : "Must be a valid date" (added onSubmit through handleSubmit)
      clearErrors(dobDay, setDateErr);
    }
  };

  useEffect(() => {
    checkAllFields();
  }, [yearField?.value, monthField?.value, dayField?.value]);

  // Auto-switch fields
  const nextFieldFocus = (
    currentFieldEl: React.RefObject<HTMLInputElement>,
    nextFieldEl: React.RefObject<HTMLInputElement>
  ) => {
    const isCurrentFieldValid = currentFieldEl.current?.validity.valid;

    if (currentFieldEl.current?.value.length === 2 && isCurrentFieldValid) {
      nextFieldEl.current?.focus();
    }
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const noEmptyFields = yearField && monthField && dayField;
    const isValidDate =
      noEmptyFields &&
      checkFullDate(dayField?.value, monthField?.value, yearField?.value);
    const noErrors = noEmptyFields && allValidFields;

    if (noErrors && isValidDate) {
      const yearVal = +yearField.value;
      const monthVal = +monthField.value;
      const dayVal = +dayField.value;

      const result = detailedAge(dayVal, monthVal, yearVal);
      setResultYears(result?.years);
      setResultMonths(result?.months);
      setResultDays(result?.days);
    } else {
      setDateErr("Must be a valid date");
      setResultYears(null);
      setResultMonths(null);
      setResultDays(null);
    }
  };

  return (
    <form action="submit" className="dob" onSubmit={handleSubmit} noValidate>
      <fieldset className="dob__fields">
        <p className="dob__field-err">{dateErr}</p>
        <input
          type="number"
          placeholder="DD"
          className="dob__input"
          id="dobDay"
          ref={dobDay}
          min={1}
          max={31}
          onBlur={() => dateCheck(dobDay, setDateErr)}
          onInput={() => {
            dateCheck(dobDay, setDateErr);
            nextFieldFocus(dobDay, dobMonth);
          }}
          onKeyDown={blockInvalidChars}
        ></input>
        <label className="dob__field-label" htmlFor="dobDay">
          Day
        </label>
      </fieldset>

      <fieldset className="dob__fields">
        <p className="dob__field-err">{monthErr}</p>
        <input
          type="number"
          placeholder="MM"
          className="dob__input"
          id="dobMonth"
          ref={dobMonth}
          min={1}
          max={12}
          onBlur={() => monthCheck(dobMonth, setMonthErr)}
          onInput={() => {
            monthCheck(dobMonth, setMonthErr);
            nextFieldFocus(dobMonth, dobYear);
          }}
          onKeyDown={blockInvalidChars}
        ></input>
        <label className="dob__field-label" htmlFor="dobMonth">
          Month
        </label>
      </fieldset>

      <fieldset className="dob__fields">
        <p className="dob__field-err">{yearErr}</p>
        <input
          type="number"
          placeholder="YYYY"
          className="dob__input"
          ref={dobYear}
          id="dobYear"
          min={1}
          max={new Date().getFullYear()}
          onBlur={() => yearCheck(dobYear, setYearErr)}
          onInput={() => {
            yearCheck(dobYear, setYearErr);
          }}
          onChange={() => {
            yearCheck(dobYear, setYearErr);
          }}
          onKeyDown={blockInvalidChars}
        ></input>
        <label className="dob__field-label" htmlFor="dobYear">
          Year
        </label>
      </fieldset>
      <button type="submit" className="dob__submit"></button>
    </form>
  );
};

export default DobInput;
