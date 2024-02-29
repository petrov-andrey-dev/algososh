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

type TButtonsState = {
  enqueueBtn: boolean;
  dequeueBtn: boolean;
}

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<TCircleObject[]>(Array(7).fill({ value: '', state: ElementStates.Default }));
  const [head, setHead] = useState<number>(-1);
  const [tail, setTail] = useState<number>(-1);
  const [string, setString] = useState<string>('')
  const [isLoading, setIsLoading] = useState<TButtonsState>({
    enqueueBtn: false,
    dequeueBtn: false
  });

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setString(e.currentTarget.value)
  };

  const enqueue = async (item: string) => {
    if (tail < queue.length - 1) {
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
      setString('');
    }
  };

  const dequeue = async () => {
    if (head <= tail) {
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
    }
  };

  const onAddButton = async (e: React.FormEvent<HTMLButtonElement>) => {
    setIsLoading({...isLoading, enqueueBtn: true});
    await enqueue(string);
    setIsLoading({...isLoading, enqueueBtn: false});
  }

  const onRemoveButton = async (e: React.FormEvent<HTMLButtonElement>) => {
    setIsLoading({...isLoading, dequeueBtn: true});
    await dequeue();
    setIsLoading({...isLoading, dequeueBtn: false});
  };

  const onClearButton = async (e: React.FormEvent<HTMLButtonElement>) => {
    setQueue(Array(7).fill({ value: '', state: ElementStates.Default }));
    setHead(-1);
    setTail(-1);
  };


  return (
    <SolutionLayout title="Очередь">
      <form className={s.form}>
        <Input
          value={string}
          maxLength={4}
          onChange={handleOnChange}
          isLimitText={true}
        />
        <Button
          text='Добавить'
          isLoader={isLoading.enqueueBtn}
          onClick={e => onAddButton(e)}
          disabled={string.length === 0}
        />
        <Button
          text='Удалить'
          isLoader={isLoading.dequeueBtn}
          onClick={e => onRemoveButton(e)}
          disabled={head < 0}
        />
        <Button
          text='Очистить'
          onClick={e => onClearButton(e)}
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
