import detailedAge from "../AgeCalc";
import { test, expect } from "vitest";

const currentDate = new Date();
const yearMs = 1000 * 60 * 60 * 24 * 365;
const monthMs = yearMs / 12;
const dayMs = 1000 * 60 * 60 * 24;

test("Returns my current age", () => {
  const birthDate = 9;
  const birthMonth = 8;
  const birthYear = 1989;

  const resultDiff =
    currentDate.getTime() -
    new Date(birthYear, birthMonth - 1, birthDate).getTime();
  const resultYear = Math.floor(resultDiff / yearMs);
  const resultMonth = Math.floor((resultDiff % yearMs) / monthMs);
  const resultDay = Math.floor((resultDiff % monthMs) / dayMs);

  const result = detailedAge(birthDate, birthMonth, birthYear);
  const expectedResult = {
    years: resultYear,
    months: resultMonth,
    days: resultDay,
  };

  expect(result).toEqual(expectedResult);
});

test("Subtract from current year if year is less than 100", () => {
  const birthDate = 1;
  const birthMonth = 1;
  const birthYear = 10;

  const resultDiff =
    currentDate.getTime() -
    new Date(birthYear, birthMonth - 1, birthDate).getTime();
  const resultMonth = Math.floor((resultDiff % yearMs) / monthMs);
  const resultDay = Math.floor((resultDiff % monthMs) / dayMs);
  const result = {
    years: currentDate.getFullYear() - birthYear,
    months: resultMonth,
    days: resultDay,
  };

  expect(detailedAge(birthDate, birthMonth, birthYear)).toEqual(result);
});

test("Return 'null' if date is invalid", () => {
  expect(detailedAge(29, 2, 2023)).toBeNull();
});

test("Return 'null' if all values aren't numbers", () => {
  expect(detailedAge("e1", 1, 1990)).toBeNull();
});
