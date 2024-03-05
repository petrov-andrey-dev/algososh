import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { TCircleObject } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { mutateCircle, timeout } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from "./queue-page.module.css";
import { useForm } from "../../hooks/useForm";

type TButtonsState = {
  enqueueBtn: boolean;
  dequeueBtn: boolean;
};

type TInput = {
  string: string;
};

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<TCircleObject[]>(Array(7).fill({ value: '', state: ElementStates.Default }));
  const [head, setHead] = useState<number>(-1);
  const [tail, setTail] = useState<number>(-1);
  const {values, handleChange, setValues} = useForm<TInput>({string: ''});
  const [isLoading, setIsLoading] = useState<TButtonsState>({
    enqueueBtn: false,
    dequeueBtn: false
  });

  const enqueue = async (item: string) => {
    mutateCircle(setQueue, queue, tail + 1, ElementStates.Changing);
    await timeout(SHORT_DELAY_IN_MS);
    const newQueue = queue.slice(0, queue.length);
    const newItem = { value: item, state: ElementStates.Default };
    newQueue.splice(tail + 1, 1, newItem);
    setQueue(newQueue);
    if (head === -1 || queue[head].value === '') {
      setHead(head + 1);
    }
    setTail(tail + 1);
    setValues({string: ''});
  };

  const dequeue = async () => {
    mutateCircle(setQueue, queue, head, ElementStates.Changing);
    await timeout(SHORT_DELAY_IN_MS);
    const newQueue = queue.slice();
    const newItem = { value: '', state: ElementStates.Default };
    newQueue.splice(head, 1, newItem);
    setQueue(newQueue);
    if (head < tail) {
      setHead(head + 1)
    }
    if (head === tail) {
      setHead(-1);
      setTail(-1);
    }
  };

  const onAddButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tail < queue.length - 1) {
      setIsLoading({ ...isLoading, enqueueBtn: true });
      await enqueue(values.string);
      setIsLoading({ ...isLoading, enqueueBtn: false });
    }
  };

  const onRemoveButton = async () => {
    if (head <= tail) {
      setIsLoading({ ...isLoading, dequeueBtn: true });
      await dequeue();
      setIsLoading({ ...isLoading, dequeueBtn: false });
    }
  };

  const onClearButton = async () => {
    setQueue(Array(7).fill({ value: '', state: ElementStates.Default }));
    setHead(-1);
    setTail(-1);
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
          disabled={values.string.length === 0 || tail === queue.length - 1}
        />
        <Button
          text='Удалить'
          isLoader={isLoading.dequeueBtn}
          onClick={onRemoveButton}
          disabled={head < 0}
        />
        <Button
          text='Очистить'
          onClick={onClearButton}
          disabled={head < 0}
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
                  head={index === head ? HEAD : ''}
                  tail={index === tail ? TAIL : ''}
                />
              </li>
            )
          })
        }
      </ul>
    </SolutionLayout>
  );
};
