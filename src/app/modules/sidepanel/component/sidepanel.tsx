import React from 'react';

import './sidepanel.scss';

import { isNullOrUndefined } from '../../../common/utils';
import { getFontColor } from '../../../common/color';
import generateUid from '../../../common/uid';

type SidePanelBackground =
    'ShadowPurple' | 'MidnightBadger' | 'MarineBlue'
    | 'BlueNight' | 'AmbrosiaIvory' | 'Risotto' | 'JerauPejuang'
    | 'MyrtleGreen';

export type SidePanelItem = {
    name: string;
    icon?: string;
    tooltip?: string;
};

export type SidePanelProps = {
    caption: string;
    background: SidePanelBackground;
    items: Array<SidePanelItem>;
    onItemClick: (name: string) => void;
    expanded?: boolean;
};

const backgroundColorMap: Map<SidePanelBackground, string> = new Map<SidePanelBackground, string>([
    ['ShadowPurple', '462B45'],
    ['MidnightBadger', '575965'],
    ['MarineBlue', '043353'],
    ['BlueNight', '323846'],
    ['AmbrosiaIvory', 'FFF4EA'],
    ['Risotto', 'F7F4E7'],
    ['JerauPejuang', '762014'],
    ['MyrtleGreen', '275A53'],
]);

export default function SidePanel(props: SidePanelProps): JSX.Element {
    const mappedMenuItems: Array<SidePanelItem & { uid: string }> =
        props.items.map(menuItem => ({
            ...menuItem,
            uid: generateUid()
        }));

    const backgroundColor: string =
        `#${backgroundColorMap.get(props.background)}`;

    const fontColor: string =
        getFontColor(backgroundColor);

    return (
        <div className="side-panel mr-2" style={{ backgroundColor: backgroundColor, color: fontColor }}>
            <h4 className="side-panel__caption">{props.caption}</h4>
            <hr style={{ borderTopColor: fontColor }} />
            <ul className="side-panel__items">
                {mappedMenuItems.map(item => generateSidePanelItem(item))}
            </ul>
        </div>
    );
};

const generateSidePanelItem = (item: SidePanelItem & { uid: string }): JSX.Element => {
    if (isNullOrUndefined(item.icon)) {
        return (
            <li key={item.uid} className="side-panel__items__item side-panel__items__item--no-icon">
                {item.name}
            </li>
        );
    } else {
        return (
            <li key={item.uid} className="side-panel__items__item">
                <i className={`fas fa-${item.icon}`} />
                {item.name}
            </li>
        );
    }
};