import { DELAY_IN_MS } from "../../constants/delays";
import { TCircleObject } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { timeout, swap } from "../../utils/utils";

export const reverseString = async (arr: TCircleObject[], setArray: React.Dispatch<React.SetStateAction<TCircleObject[]>>) => {
    let start: number = 0;
    let end: number = arr.length -1;

    while (start <= end) {
      arr[start].state = arr[end].state = ElementStates.Changing;
      setArray([...arr]);
      await timeout(DELAY_IN_MS);
      swap(arr, start, end);
      arr[start].state = arr[end].state = ElementStates.Modified;
      setArray([...arr]);
      start++;
      end--;
    }
    return arr;
  };