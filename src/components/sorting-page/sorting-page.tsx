import React, { useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { randomArr } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from "./sorting-page.module.css";
import { bubbleSort, selectSort } from "./sorting-page.utils";

type TButtonsState = {
  ascBtn: boolean;
  descBtn: boolean;
  newArrBtn: boolean;
}

export type TArray = {
  value: number;
  state: ElementStates;
}

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<TArray[]>([]);
  const [sortingType, setSortingType] = useState<'select' | 'bubble'>('select');
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

  

  const onAscBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, ascBtn: true });
    setIsDisabled({ ...isDisabled, descBtn: true, newArrBtn: true });
    sortingType === 'bubble' ? await bubbleSort(array, Direction.Ascending, setArray) : await selectSort(array, Direction.Ascending, setArray)
    setIsLoading({ ...isLoading, ascBtn: false })
    setIsDisabled({ ...isDisabled, descBtn: false, newArrBtn: false });
  }

  const onDescBtn = async () => {
    setIsLoading({ ...isLoading, descBtn: true });
    setIsDisabled({ ...isDisabled, ascBtn: true, newArrBtn: true });
    sortingType === 'bubble' ? await bubbleSort(array, Direction.Descending, setArray) : await selectSort(array, Direction.Descending, setArray)
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
      <form className={s.form} onSubmit={onAscBtn}>
        <RadioInput
          label="Выбор"
          onChange={() => setSortingType('select')}
          checked={sortingType === 'select'}
        />
        <RadioInput
          label="Пузырек"
          onChange={() => setSortingType('bubble')}
          checked={sortingType === 'bubble'}
        />
        <Button
          text='По возрастанию'
          isLoader={isLoading.ascBtn}
          type='submit'
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
