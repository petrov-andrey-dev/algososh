import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import { TCircleObject } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { mutateCircle, timeout } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from "./stack-page.module.css";

type TButtonsState = {
  pushBtn: boolean;
  popBtn: boolean;
};

type TInput = {
  string: string;
};

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<TCircleObject[]>([]);
  const {values, handleChange, setValues} = useForm<TInput>({string: ''});
  const [isLoading, setIsLoading] = useState<TButtonsState>({
    pushBtn: false,
    popBtn: false
  });

  const pushItem = async (str: string) => {
    if (values.string.length && stack.length <= 19) {
      const newElement = { value: str, state: ElementStates.Changing };
      setStack(stack => [...stack, newElement]);
      await timeout(SHORT_DELAY_IN_MS);
      mutateCircle(setStack, stack, stack.length, ElementStates.Default);
      setValues({string: ''});
    }
  };

  const popItem = async () => {
    if (stack.length > 0) {
      mutateCircle(setStack, stack, stack.length - 1, ElementStates.Changing);
      await timeout(SHORT_DELAY_IN_MS);
      setStack(stack.slice(0, stack.length - 1));
    }
  };

  const onAddButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, pushBtn: true });
    await pushItem(values.string);
    setIsLoading({ ...isLoading, pushBtn: false });
  };

  const onRemoveButton = async () => {
    setIsLoading({ ...isLoading, popBtn: true });
    await popItem();
    setIsLoading({ ...isLoading, popBtn: false });
  };

  const onClearButton = async () => {
    setStack([])
  };

  return (
    <SolutionLayout title="Стек">
      <form className={s.form} onSubmit={onAddButton}>
        <Input
          value={values.string}
          maxLength={4}
          onChange={handleChange}
          isLimitText={true}
          name='string'
        />
        <Button
          text='Добавить'
          isLoader={isLoading.pushBtn}
          type='submit'
          disabled={values.string.length === 0 || stack.length >= 20}
        />
        <Button
          text='Удалить'
          isLoader={isLoading.popBtn}
          onClick={onRemoveButton}
          disabled={stack.length === 0}
        />
        <Button
          text='Очистить'
          onClick={onClearButton}
          disabled={stack.length === 0}
          extraClass={s.ml}
        />
      </form>
      <ul className={s.ul}>
        {
          stack && stack.map((item: TCircleObject, index: number) => {
            return (
              <li key={index} className={s.li}>
                <Circle
                  index={index}
                  letter={item.value}
                  state={item.state}
                  head={index === stack.length - 1 ? "top" : ""}
                />
              </li>
            )
          })
        }
      </ul>
    </SolutionLayout>
  );
};
