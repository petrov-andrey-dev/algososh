import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import { TCircleObject } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack-page.class";
import s from "./stack-page.module.css";

type TButtonsState = {
  pushBtn: boolean;
  popBtn: boolean;
};

type TInput = {
  string: string;
};

const newStack = new Stack<TCircleObject>();

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<TCircleObject[]>([]);
  const {values, handleChange, setValues} = useForm<TInput>({string: ''});
  const [isLoading, setIsLoading] = useState<TButtonsState>({
    pushBtn: false,
    popBtn: false
  });

  useEffect(() => {
    onClearButton();
  }, [])

  const onAddButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, pushBtn: true });
    newStack.push({value: values.string, state: ElementStates.Changing});
    setStack([...newStack.getItems()]);
    setValues({string: ''});
    await timeout(SHORT_DELAY_IN_MS);
    newStack.peek().state = ElementStates.Default;
    setStack([...newStack.getItems()]);
    setIsLoading({ ...isLoading, pushBtn: false });
  };

  const onRemoveButton = async () => {
    setIsLoading({ ...isLoading, popBtn: true });
    newStack.peek().state = ElementStates.Changing;
    setStack([...newStack.getItems()]);
    await timeout(SHORT_DELAY_IN_MS);
    newStack.pop();
    setStack([...newStack.getItems()]);
    setIsLoading({ ...isLoading, popBtn: false });
  };

  const onClearButton = () => {
    newStack.clear();
    setStack([]);
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
        <p></p>
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
