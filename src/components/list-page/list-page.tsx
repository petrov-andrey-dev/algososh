import React, { useEffect, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { useForm } from "../../hooks/useForm";
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
};

type TInput = {
  string: string;
  index: number |null;
};

const linkedList = new LinkedList<string>()

export const ListPage: React.FC = () => {
  const [list, setList] = useState<TCircleObject[]>([]);
  const [deletingValue, setDeletingValue] = useState<string>('');
  const [pointer, setPointer] = useState<number>(-1);
  const {values, handleChange, setValues} = useForm<TInput>({string: '', index: null})
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
    if (linkedList.getSize() < 4) {
      randomArr(4 - linkedList.getSize(), 4 -linkedList.getSize()).map(i => linkedList.addToTail(i.toString()))
    }
    setList(linkedList.toArray().map(i => {
      return { value: i.value, state: ElementStates.Default }
    }))
  }, []);

  const updateList = (obj: LinkedList<string>) => {
    setList(obj.toArray().map(i => {
      return { value: i.value, state: ElementStates.Default }
    }))
  };

  const onAddToHeadBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, addToHeadBtn: true });
    setAction({ ...action, addToHeadBtn: true });
    linkedList.addToHead(values.string);
    await timeout(DELAY_IN_MS);
    setAction({ ...action, addToHeadBtn: false });
    updateList(linkedList);
    mutateCircle(setList, list, 0, ElementStates.Modified);
    await timeout(DELAY_IN_MS);
    mutateCircle(setList, list, 0, ElementStates.Default);
    setIsLoading({ ...isLoading, addToHeadBtn: false });
    setValues({...values, string: ''});
  };

  const onAddToTailBtn = async () => {
    setIsLoading({ ...isLoading, addToTailBtn: true });
    setAction({ ...action, addToTailBtn: true });
    linkedList.addToTail(values.string);
    await timeout(DELAY_IN_MS);
    setAction({ ...action, addToTailBtn: false });
    updateList(linkedList);
    mutateCircle(setList, list, list.length, ElementStates.Modified);
    await timeout(DELAY_IN_MS);
    mutateCircle(setList, list, list.length, ElementStates.Default);
    setIsLoading({ ...isLoading, addToTailBtn: false });
    setValues({...values, string: ''});
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

  const onAddByIndexBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.index !== null && values.index >= 0) {
      setIsLoading({ ...isLoading, addByIndexBtn: true });
      setAction({ ...action, addByIndexBtn: true });
      linkedList.addByIndex(values.string, values.index);
      for (let i = 0; i <= values.index; i++) {
        setPointer(i);
        mutateCircle(setList, list, i - 1, ElementStates.Changing);
        await timeout(DELAY_IN_MS);
      }
      await timeout(DELAY_IN_MS);
      updateList(linkedList);
      setAction({ ...action, addByIndexBtn: false });
      mutateCircle(setList, list, values.index, ElementStates.Modified);
      await timeout(DELAY_IN_MS);
      mutateCircle(setList, list, values.index, ElementStates.Default);
      setIsLoading({ ...isLoading, addByIndexBtn: false });
      setPointer(-1);
      setValues({string: '', index: null})
    }
  };

  const onDelByIndexBtn = async () => {
    if (values.index !== null && values.index >= 0) {
      setIsLoading({ ...isLoading, delByIndexBtn: true });
      linkedList.delByIndex(values.index);
      for (let i = 0; i <= values.index; i++) {
        setPointer(i);
        mutateCircle(setList, list, i, ElementStates.Changing);
        await timeout(DELAY_IN_MS);
      }
      setAction({ ...action, delByIndexBtn: true });
      setDeletingValue(list[values.index].value);
      mutateCircle(setList, list, values.index, ElementStates.Default, '');
      await timeout(DELAY_IN_MS);
      setAction({ ...action, delByIndexBtn: false });
      updateList(linkedList);
      setIsLoading({ ...isLoading, delByIndexBtn: false });
      setValues({...values, index: null});
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={s.form} onSubmit={onAddToHeadBtn}>
        <Input
          value={values.string}
          maxLength={4}
          onChange={handleChange}
          isLimitText={true}
          extraClass={s.input}
          name='string'
        />
        <Button
          text='Добавить в head'
          isLoader={isLoading.addToHeadBtn}
          type='submit'
          disabled={values.string.length === 0 || list.length === 10}
          extraClass={s.button}
        />
        <Button
          text='Добавить в tail'
          isLoader={isLoading.addToTailBtn}
          onClick={onAddToTailBtn}
          disabled={values.string.length === 0 || list.length === 10}
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
      <form className={s.form} onSubmit={onAddByIndexBtn}>
        <Input
          min={0}
          max={list.length - 1}
          value={values.index === null ? '' : values.index}
          onChange={handleChange}
          isLimitText={true}
          type='number'
          extraClass={s.input}
          name='index'
        />
        <Button
          text='Добавить по индексу'
          type='submit'
          isLoader={isLoading.addByIndexBtn}
          disabled={
            values.index === null
            || values.index < 0
            || values.index > list.length - 1
            || values.string.length === 0
            || list.length === 10
          }
          extraClass={s.bigButton}
        />
        <Button
          text='Удалить по индексу'
          onClick={onDelByIndexBtn}
          isLoader={isLoading.delByIndexBtn}
          disabled={
            values.index === null 
            || values.index < 0
            || values.index > list.length - 1
            || list.length === 0 
          }
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
                      ? <Circle isSmall={true} state={ElementStates.Changing} letter={values.string} />
                      : null
                        || index === 0 ? HEAD : null
                  }
                  tail={
                    (action.delFromHeadBtn && index === 0)
                      || (action.delFromTailBtn && index === list.length - 1)
                      || (action.delByIndexBtn && index === pointer)
                      ? <Circle isSmall={true} state={ElementStates.Changing} letter={deletingValue} />
                      : null
                        || values.index === list.length - 1 ? TAIL : null
                  }
                />
                {values.index !== list.length - 1 && <ArrowIcon />}
              </li>
            )
          })
        }
      </ul>
    </SolutionLayout>
  );
};
