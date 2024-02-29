import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
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
}

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<TCircleObject[]>([]);
  const [string, setString] = useState<string>('')
  const [isLoading, setIsLoading] = useState<TButtonsState>({
    pushBtn: false,
    popBtn: false
  });

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setString(e.currentTarget.value)
  };

  const pushItem = async (str: string) => {
    if (string.length) {
      const newElement = { value: str, state: ElementStates.Changing };
      setStack(stack => [...stack, newElement]);
      await timeout(SHORT_DELAY_IN_MS);
      mutateCircle(setStack, stack, stack.length, ElementStates.Default);
      setString('');
    }
  };

  const popItem = async () => {
    if (stack.length > 0) {
      mutateCircle(setStack, stack, stack.length - 1, ElementStates.Changing);
      await timeout(SHORT_DELAY_IN_MS);
      setStack(stack.slice(0, stack.length - 1));
    }
  };

  const onAddButton = async (e: React.FormEvent<HTMLButtonElement>) => {
    setIsLoading({ ...isLoading, pushBtn: true });
    await pushItem(string);
    setIsLoading({ ...isLoading, pushBtn: false });
  };

  const onRemoveButton = async (e: React.FormEvent<HTMLButtonElement>) => {
    setIsLoading({ ...isLoading, popBtn: true });
    await popItem();
    setIsLoading({ ...isLoading, popBtn: false });
  };

  const onClearButton = async (e: React.FormEvent<HTMLButtonElement>) => {
    setStack([])
  };

  return (
    <SolutionLayout title="Стек">
      <form className={s.form}>
        <Input
          value={string}
          maxLength={4}
          onChange={handleOnChange}
          isLimitText={true}
        />
        <Button
          text='Добавить'
          isLoader={isLoading.pushBtn}
          onClick={e => onAddButton(e)}
          disabled={string.length === 0}
        />
        <Button
          text='Удалить'
          isLoader={isLoading.popBtn}
          onClick={e => onRemoveButton(e)}
          disabled={stack.length === 0}
        />
        <Button
          text='Очистить'
          onClick={e => onClearButton(e)}
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
