import React, { useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { TCircleObject } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { swap, timeout } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from './string.module.css';


export const StringComponent: React.FC = () => {
  const [array, setArray] = useState<TCircleObject[]>([]);
  const [string, setString] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setString(e.currentTarget.value)
  };

  const reverseString = async (arr: TCircleObject[]) => {
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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    const arr = string.split('').map((value) => {
      return { value, state: ElementStates.Default }
    });
    setArray([...arr]);
    await timeout(DELAY_IN_MS);
    await reverseString(arr);
    setIsLoading(false);
  };
  
  return (
    <SolutionLayout title="Строка">
      <form className={s.form}>
        <Input
          maxLength={11}
          onChange={handleOnChange}
          isLimitText={true}
        />
        <Button
          text='Развернуть'
          isLoader={isLoading}
          onClick={e => handleSubmit(e)}
        />
      </form>
      <ul className={s.ul}>
        {
          array && array.map((item: TCircleObject, index: number) => {
            return (
              <li key={index} className={s.li}>
                <Circle 
                state={item.state}
                letter={item.value}
               />
              </li>
            )
          })
        }
      </ul>
    </SolutionLayout>
  );
};