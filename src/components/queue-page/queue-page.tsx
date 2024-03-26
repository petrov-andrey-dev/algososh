import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { useForm } from "../../hooks/useForm";
import { TCircleObject } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./queue-page.class";
import s from "./queue-page.module.css";

type TButtonsState = {
  enqueueBtn: boolean;
  dequeueBtn: boolean;
};

type TInput = {
  string: string;
};

const newQueue = new Queue<TCircleObject>(7, Array(7).fill({ value: '', state: ElementStates.Default }));

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<TCircleObject[]>(newQueue.getItems());
  const {values, handleChange, setValues} = useForm<TInput>({string: ''});
  const [isLoading, setIsLoading] = useState<TButtonsState>({
    enqueueBtn: false,
    dequeueBtn: false
  });

  const onAddButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newQueue.getTail() < newQueue.getSize()) {
      setIsLoading({ ...isLoading, enqueueBtn: true });
      setValues({string: ''});
      newQueue.changeTailItem({value: '', state: ElementStates.Changing});
      setQueue([...newQueue.getItems()]);
      await timeout(SHORT_DELAY_IN_MS);
      newQueue.enqueue({value: values.string, state: ElementStates.Default});
      setQueue([...newQueue.getItems()]);
      setIsLoading({ ...isLoading, enqueueBtn: false });
    }
  };

  const onRemoveButton = async () => {
    if (newQueue.getHead() <= newQueue.getTail()) {
      setIsLoading({ ...isLoading, dequeueBtn: true });
      newQueue.changeHeadItem({value: newQueue.getItems()[newQueue.getHead()].value, state: ElementStates.Changing});
      setQueue([...newQueue.getItems()]);
      console.log(newQueue.getItems()[newQueue.getHead()]);
      await timeout(SHORT_DELAY_IN_MS);
      newQueue.dequeue({value: '', state: ElementStates.Default});
      setQueue([...newQueue.getItems()]);
      setIsLoading({ ...isLoading, dequeueBtn: false });
    }
  };

  const onClearButton = () => {
    newQueue.clear(Array(7).fill({ value: '', state: ElementStates.Default }));
    setQueue([...newQueue.getItems()]);
  };


  return (
    <SolutionLayout title="Очередь">
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
          isLoader={isLoading.enqueueBtn}
          type='submit'
          disabled={values.string.length === 0 || newQueue.getTail() === newQueue.getSize()}
        />
        <Button
          text='Удалить'
          isLoader={isLoading.dequeueBtn}
          onClick={onRemoveButton}
          disabled={newQueue.getHead() < 0}
        />
        <Button
          text='Очистить'
          onClick={onClearButton}
          disabled={newQueue.getHead() < 0}
          extraClass={s.ml}
        />
      </form>
      <ul className={s.ul}>
        {
          queue && queue.map((item: TCircleObject, index: number) => {
            return (
              <li key={index} className={s.li}>
                <Circle
                  index={index}
                  letter={item.value}
                  state={item.state}
                  head={index === newQueue.getHead() && item.value ? HEAD : ''}
                  tail={index === newQueue.getTail() - 1 && item.value ? TAIL : ''}
                />
              </li>
            )
          })
        }
      </ul>
    </SolutionLayout>
  );
};
