import renderer from 'react-test-renderer';

import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Компонент Button:', () => {
    it('Кнопка с текстом рендерится без ошибок', () => {
        const tree = renderer
            .create(<Button text='Кнопка с текстом' />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Кнопка без текста рендерится без ошибок', () => {
        const tree = renderer
            .create(<Button />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Заблокированная кнопка рендерится без ошибок', () => {
        const tree = renderer
            .create(<Button disabled={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Кнопка с индикацией загрузки рендерится без ошибок', () => {
        const tree = renderer
            .create(<Button isLoader={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Нажатие на кнопку вызывает корректный alert', () => {
        const callback = jest.fn();
        render(<Button text='Кнопка' onClick={callback} />);
        const button = screen.getByText('Кнопка');
        expect(callback).toHaveBeenCalledTimes(0);
        fireEvent.click(button);
        expect(callback).toHaveBeenCalledTimes(1);
    });
});