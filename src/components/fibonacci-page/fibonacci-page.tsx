import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import { timeout } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from "./fibonacci-page.module.css";

type TInput = {
  number: number |null;
};

export const FibonacciPage: React.FC = () => {

  const [outputArray, setOutputArray] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {values, handleChange} = useForm<TInput>({number: null});

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.number) {
      if (values.number > 0 || values.number <= 19) {
        setOutputArray([]);
        setIsLoading(true);
        await makeOutputArray(makeTempArray(values.number), setOutputArray)
        setIsLoading(false);
      }
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={s.form} onSubmit={handleSubmit}>
        <Input
          min={1}
          max={19}
          value={values.number || ''}
          type = "number"
          onChange={handleChange}
          isLimitText={true}
          name='number'
        />
        <Button
          text='Рассчитать'
          type='submit'
          isLoader={isLoading}
          disabled={values.number === null || values.number > 19 }
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
