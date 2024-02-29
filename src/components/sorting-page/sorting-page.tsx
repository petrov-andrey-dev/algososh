import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { randomArr, swap, timeout } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from "./sorting-page.module.css";

type TButtonsState = {
  ascBtn: boolean;
  descBtn: boolean;
  newArrBtn: boolean;
}

type TArray = {
  value: number;
  state: ElementStates;
}

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<TArray[]>([]);
  const [sortingType, setSortingType] = useState<'select' | 'bobble'>('select');
  const [isLoading, setIsLoading] = useState<TButtonsState>({
    ascBtn: false,
    descBtn: false,
    newArrBtn: false,
  });
  const [isDisabled, setIsDisabled] = useState<TButtonsState>({
    ascBtn: false,
    descBtn: false,
    newArrBtn: false,
  })
 
  useEffect(() => {
    setArray(randomArr(3, 17).map(i => {
      return { value: i, state: ElementStates.Default }
    }));
  }, [])

  const bubbleSort = async (arr: TArray[], direction: Direction) => {
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

  const selectSort = async (arr: TArray[], direction: Direction) => {
    for (let i = 0; i < arr.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].state = arr[j].state = ElementStates.Changing;
        setArray([...arr]);
        await timeout(SHORT_DELAY_IN_MS);
        if (direction === Direction.Ascending && arr[j].value > arr[min].value) {
          min = j;
        } else if (direction === Direction.Descending && arr[j].value < arr[min].value) {
          min = j;
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

  const onAscBtn = async () => {
    setIsLoading({ ...isLoading, ascBtn: true });
    setIsDisabled({ ...isDisabled, descBtn: true, newArrBtn: true });
    sortingType === 'bobble' ? await bubbleSort(array, Direction.Ascending) : await selectSort(array, Direction.Ascending)
    setIsLoading({ ...isLoading, ascBtn: false })
    setIsDisabled({ ...isDisabled, descBtn: false, newArrBtn: false });
  }

  const onDescBtn = async () => {
    setIsLoading({ ...isLoading, descBtn: true });
    setIsDisabled({ ...isDisabled, ascBtn: true, newArrBtn: true });
    sortingType === 'bobble' ? await bubbleSort(array, Direction.Descending) : await selectSort(array, Direction.Descending)
    setIsLoading({ ...isLoading, descBtn: false });
    setIsDisabled({ ...isDisabled, ascBtn: false, newArrBtn: false });
  }

  const onNewArrBtn = () => {
    setArray(randomArr(3, 17).map(i => {
      return { value: i, state: ElementStates.Default }
    }));
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={s.form}>
        <RadioInput
          label="Выбор"
          onChange={() => setSortingType('select')}
          checked={sortingType === 'select'}
        />
        <RadioInput
          label="Пузырек"
          onChange={() => setSortingType('bobble')}
          checked={sortingType === 'bobble'}
        />
        <Button
          text='По возрастанию'
          isLoader={isLoading.ascBtn}
          onClick={onAscBtn}
          sorting={Direction.Ascending}
          disabled={isDisabled.ascBtn}
        />
        <Button
          text='По убыванию'
          isLoader={isLoading.descBtn}
          onClick={onDescBtn}
          sorting={Direction.Descending}
          disabled={isDisabled.descBtn}
        />
        <Button
          text='Новый массив'
          onClick={onNewArrBtn}
          extraClass={s.ml}
          disabled={isDisabled.newArrBtn}
        />
      </form>
      <ul className={s.ul}>
        {
          array && array.map((item, index: number) => {
            return (
              <li key={index} className={s.li}>
                <Column index={item.value} state={item.state} />
              </li>
            )
          })
        }
      </ul>
    </SolutionLayout>
  );
};
