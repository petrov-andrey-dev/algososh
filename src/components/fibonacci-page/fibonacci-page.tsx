import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { timeout } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {

  const [outputArray, setOutputArray] = useState<number[]>([]);
  const [number, setNumber] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNumber(Number(e.currentTarget.value))
  };

  const makeTempArray = (n: number) => {
    var tmpArr = [1, 1];
    for (let i = 2; i <= n; i++) {
      tmpArr[i] = tmpArr[i - 2] + tmpArr[i - 1]
    }
    return tmpArr
  };

  const makeOutputArray = async (arr: number[], setArr: React.Dispatch<React.SetStateAction<number[]>>) => {
    for (let i = 0; i < arr.length; i++) {
      await timeout(SHORT_DELAY_IN_MS);
      setArr(array => [...array, arr[i]]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    setOutputArray([]);
    setIsLoading(true);
    await makeOutputArray(makeTempArray(number), setOutputArray)
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={s.form}>
        <Input
          min={1}
          max={19}
          type = "number"
          onChange={handleOnChange}
          isLimitText={true}
        />
        <Button
          text='Рассчитать'
          isLoader={isLoading}
          onClick={e => handleSubmit(e)}
        />
      </form>
      <ul className={s.ul}>
        {
          outputArray && outputArray.map((item: number, index: number) => {
            return (
              <li key={index} className={s.li}>
                <Circle 
                index={index}
                letter={String(item)}
               />
              </li>
            )
          })
        }
      </ul>
    </SolutionLayout>
  );
};
