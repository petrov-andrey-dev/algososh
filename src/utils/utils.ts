import { TCircleObject } from "../types/circle";
import { ElementStates } from "../types/element-states";

const timeout = async (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

const swap = <T>(arr: T[], first: number, second: number) => {
  const tmp = arr[first];
  arr[first] = arr[second];
  arr[second] = tmp;
  return arr
} 

const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomArr = (min: number, max: number) => {
  let arr = [];
  for (let i = 0; i < randomNum(min, max); i++) {
    arr.push(randomNum(0, 100));
  }
  return arr;
}

const mutateCircle = (
  func: React.Dispatch<React.SetStateAction<TCircleObject[]>>,
  arr: TCircleObject[],
  index: number,
  state: ElementStates,
  value?: string
) => {
  func(arr => arr.map((item, currIndex) => {
    if (currIndex === Number(index)) {
      return value != null ? {value, state} : {...item, state}
    } else {
      return item;
    }
  }))
} 

export {
  randomArr, 
  swap, 
  timeout,
  mutateCircle
};
