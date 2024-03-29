import renderer from 'react-test-renderer';

import { HEAD, TAIL } from '../../../constants/element-captions';
import { ElementStates } from '../../../types/element-states';
import { Circle } from './circle';

describe('Компонент Circle:', () => {
    it('Круг без буквы рендерится без ошибок', () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Круг с буквами рендерится без ошибок', () => {
        const tree = renderer
            .create(<Circle letter='abcd'/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Круг с head рендерится без ошибок', () => {
        const tree = renderer
            .create(<Circle head={HEAD} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Круг с react-элементом в head рендерится без ошибок', () => {
        const tree = renderer
            .create(<Circle head={<Circle />} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Круг с tail рендерится без ошибок', () => {
        const tree = renderer
            .create(<Circle tail={TAIL} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Круг с react-элементом в tail рендерится без ошибок', () => {
        const tree = renderer
            .create(<Circle tail={<Circle />} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Круг с index рендерится без ошибок', () => {
        const tree = renderer
            .create(<Circle index={0}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Круг с пропом isSmall ===  true рендерится без ошибок', () => {
        const tree = renderer
            .create(<Circle isSmall={true}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Круг в состоянии default  true рендерится без ошибок', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Default}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Круг в состоянии changing  true рендерится без ошибок', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Changing}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Круг в состоянии modified  true рендерится без ошибок', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Modified}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});