import { render } from '@testing-library/react';
import Map from './Map';

describe('Image of the Map component.', () => {
    test("src contains the correct value", () => {
        render(<Map />)
        const mapImage = document.querySelector('.lol_map');
        expect(mapImage.src).toContain('http://localhost/match-map.webp');
    })

    test("Initial time of the video player should be at 0:00.", () => {
        render(<Map />)
        const mapPlayerTime = document.querySelector('.timestamp');
        expect(mapPlayerTime.textContent.match(/.*0:00.*/)).not().toEqual(NaN);
    })
});