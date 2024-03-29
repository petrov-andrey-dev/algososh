import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { swap, timeout } from "../../utils/utils";
import { TArray } from "./sorting-page";

export const bubbleSort = async (arr: TArray[], direction: Direction, setArray: React.Dispatch<React.SetStateAction<TArray[]>>) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = arr[j + 1].state = ElementStates.Changing;
        setArray([...arr]);
        await timeout(SHORT_DELAY_IN_MS);
        if (direction === Direction.Ascending && arr[j].value > arr[j + 1].value) {
          swap(arr, j, j + 1);
        } else if (direction === Direction.Descending && arr[j].value < arr[j + 1].value) {
          swap(arr, j, j + 1);
        }
        arr[j].state = arr[j + 1].state = ElementStates.Default;
        setArray([...arr]);
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setArray([...arr]);
    }
  };

  export const selectSort = async (arr: TArray[], direction: Direction, setArray: React.Dispatch<React.SetStateAction<TArray[]>>) => {
    if (arr.length < 1) return arr;
    for (let i = 0; i < arr.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].state = arr[j].state = ElementStates.Changing;
        setArray([...arr]);
        await timeout(SHORT_DELAY_IN_MS);
        if (direction === Direction.Ascending) { 
            if (arr[j].value < arr[min].value) {
                min = j;
            }
        } else {
            if (arr[j].value > arr[min].value) {
                min = j;
              }
        }
        arr[j].state = ElementStates.Default;
        setArray([...arr]);
      }
      swap(arr, i, min);
      arr[i].state = ElementStates.Modified;
      setArray([...arr]);
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    setArray([...arr]);
  };