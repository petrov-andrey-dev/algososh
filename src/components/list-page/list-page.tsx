import React, { useEffect, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { TCircleObject } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { mutateCircle, randomArr, timeout } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./list-page.class";
import s from "./list-page.module.css";

type TButtonsState = {
  addToHeadBtn: boolean;
  addToTailBtn: boolean;
  delFromHeadBtn: boolean;
  delFromTailBtn: boolean;
  addByIndexBtn: boolean;
  delByIndexBtn: boolean;
}

const linkedList = new LinkedList<string>()
randomArr(4, 4).map(i => linkedList.addToHead(i.toString()))

export const ListPage: React.FC = () => {

  const [list, setList] = useState<TCircleObject[]>([]);
  const [string, setString] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [deletingValue, setDeletingValue] = useState<string>('');
  const [pointer, setPointer] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<TButtonsState>({
    addToHeadBtn: false,
    addToTailBtn: false,
    delFromHeadBtn: false,
    delFromTailBtn: false,
    addByIndexBtn: false,
    delByIndexBtn: false,
  });
  const [action, setAction] = useState<TButtonsState>({
    addToHeadBtn: false,
    addToTailBtn: false,
    delFromHeadBtn: false,
    delFromTailBtn: false,
    addByIndexBtn: false,
    delByIndexBtn: false,
  });

  useEffect(() => {
    setList(linkedList.toArray().map(i => {
      return { value: i.value, state: ElementStates.Default }
    }))
  }, []);

  const updateList = (obj: LinkedList<string>) => {
    setList(obj.toArray().map(i => {
      return { value: i.value, state: ElementStates.Default }
    }))
  };

  const handleOnStringChange = (e: React.FormEvent<HTMLInputElement>) => {
    setString(e.currentTarget.value)
  };

  const handleOnIndexChange = (e: React.FormEvent<HTMLInputElement>) => {
    setIndex(Number(e.currentTarget.value))

  };

  const onAddToHeadBtn = async () => {
    setIsLoading({ ...isLoading, addToHeadBtn: true });
    setAction({ ...action, addToHeadBtn: true });
    linkedList.addToHead(string);
    await timeout(DELAY_IN_MS);
    setAction({ ...action, addToHeadBtn: false });
    updateList(linkedList);
    mutateCircle(setList, list, 0, ElementStates.Modified);
    await timeout(DELAY_IN_MS);
    mutateCircle(setList, list, 0, ElementStates.Default);
    setIsLoading({ ...isLoading, addToHeadBtn: false });
    setString('');
  };

  const onAddToTailBtn = async () => {
    setIsLoading({ ...isLoading, addToTailBtn: true });
    setAction({ ...action, addToTailBtn: true });
    linkedList.addToTail(string);
    await timeout(DELAY_IN_MS);
    setAction({ ...action, addToTailBtn: false });
    updateList(linkedList);
    mutateCircle(setList, list, list.length, ElementStates.Modified);
    await timeout(DELAY_IN_MS);
    mutateCircle(setList, list, list.length, ElementStates.Default);
    setIsLoading({ ...isLoading, addToTailBtn: false });
    setString('');
  };

  const onDelFromHeadBtn = async () => {
    setIsLoading({ ...isLoading, delFromHeadBtn: true });
    setAction({ ...action, delFromHeadBtn: true });
    setDeletingValue(list[0].value);
    linkedList.delFromHead();
    mutateCircle(setList, list, 0, ElementStates.Default, '');
    await timeout(DELAY_IN_MS);
    updateList(linkedList);
    setIsLoading({ ...isLoading, delFromHeadBtn: false });
    setAction({ ...action, delFromHeadBtn: false });
  };

  const onDelFromTailBtn = async () => {
    setIsLoading({ ...isLoading, delFromTailBtn: true });
    setAction({ ...action, delFromTailBtn: true });
    setDeletingValue(list[list.length - 1].value);
    linkedList.delFromTail();
    mutateCircle(setList, list, list.length - 1, ElementStates.Default, '');
    await timeout(DELAY_IN_MS);
    updateList(linkedList);
    setIsLoading({ ...isLoading, delFromHeadBtn: false });
    setAction({ ...action, delFromHeadBtn: false });
  };

  const onAddByIndexBtn = async () => {
    setIsLoading({ ...isLoading, addByIndexBtn: true });
    setAction({ ...action, addByIndexBtn: true });
    linkedList.addByIndex(string, index);
    for (let i = 0; i <= index; i++) {
      setPointer(i);
      mutateCircle(setList, list, i - 1, ElementStates.Changing);
      await timeout(DELAY_IN_MS);
    }
    await timeout(DELAY_IN_MS);
    updateList(linkedList);
    setAction({ ...action, addByIndexBtn: false });
    mutateCircle(setList, list, index, ElementStates.Modified);
    await timeout(DELAY_IN_MS);
    mutateCircle(setList, list, index, ElementStates.Default);
    setIsLoading({ ...isLoading, addByIndexBtn: false });
    setPointer(-1);
    setString('');
    setIndex(0);
  }

  const onDelByIndexBtn = async () => {
    setIsLoading({ ...isLoading, delByIndexBtn: true });
    linkedList.delByIndex(index);
    for (let i = 0; i <= index; i++) {
      setPointer(i);
      mutateCircle(setList, list, i, ElementStates.Changing);
      await timeout(DELAY_IN_MS);
    }
    setAction({ ...action, delByIndexBtn: true });
    setDeletingValue(list[index].value);
    mutateCircle(setList, list, index, ElementStates.Default, '');
    await timeout(DELAY_IN_MS);
    setAction({ ...action, delByIndexBtn: false });
    updateList(linkedList);
    setIsLoading({ ...isLoading, delByIndexBtn: false });
    setIndex(0);
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={s.form}>
        <Input
          value={string}
          maxLength={4}
          onChange={handleOnStringChange}
          isLimitText={true}
          extraClass={s.input}
        />
        <Button
          text='Добавить в head'
          isLoader={isLoading.addToHeadBtn}
          onClick={onAddToHeadBtn}
          disabled={string.length === 0 || list.length === 10}
          extraClass={s.button}
        />
        <Button
          text='Добавить в tail'
          isLoader={isLoading.addToTailBtn}
          onClick={onAddToTailBtn}
          disabled={string.length === 0}
          extraClass={s.button}
        />
        <Button
          text='Удалить из head'
          onClick={onDelFromHeadBtn}
          isLoader={isLoading.delFromHeadBtn}
          disabled={list.length === 0}
          extraClass={s.button}
        />
        <Button
          text='Удалить из tail'
          onClick={onDelFromTailBtn}
          isLoader={isLoading.delFromTailBtn}
          disabled={list.length === 0}
          extraClass={s.button}
        />
      </form>
      <form className={s.form}>
        <Input
          min={0}
          max={list.length - 1}
          value={index}
          onChange={handleOnIndexChange}
          isLimitText={true}
          type='number'
          extraClass={s.input}
        />
        <Button
          text='Добавить по индексу'
          onClick={onAddByIndexBtn}
          isLoader={isLoading.addByIndexBtn}
          disabled={index === null || string.length === 0 || list.length === 10}
          extraClass={s.bigButton}
        />
        <Button
          text='Удалить по индексу'
          onClick={onDelByIndexBtn}
          isLoader={isLoading.delByIndexBtn}
          disabled={index === null}
          extraClass={s.bigButton}
        />
      </form>
      <ul className={s.ul}>
        {
          list && list.map((item: TCircleObject, index: number) => {
            return (
              <li key={index} className={s.li}>
                <Circle
                  index={index}
                  letter={item.value}
                  state={item.state}
                  head={
                    (action.addToHeadBtn && index === 0)
                      || (action.addToTailBtn && index === list.length - 1)
                      || (action.addByIndexBtn && index === pointer)
                      ? <Circle isSmall={true} state={ElementStates.Changing} letter={string} />
                      : null
                        || index === 0 ? HEAD : null
                  }
                  tail={
                    (action.delFromHeadBtn && index === 0)
                      || (action.delFromTailBtn && index === list.length - 1)
                      || (action.delByIndexBtn && index === pointer)
                      ? <Circle isSmall={true} state={ElementStates.Changing} letter={deletingValue} />
                      : null
                        || index === list.length - 1 ? TAIL : null
                  }
                />
                {index !== list.length - 1 && <ArrowIcon />}
              </li>
            )
          })
        }
      </ul>
    </SolutionLayout>
  );
};
