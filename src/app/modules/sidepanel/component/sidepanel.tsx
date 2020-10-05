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
    const [state, setState] = React.useState<boolean>(props.expanded || true);

    const mappedMenuItems: Array<SidePanelItem & { uid: string }> =
        props.items.map(menuItem => ({
            ...menuItem,
            uid: generateUid()
        }));

    const backgroundColor: string =
        `#${backgroundColorMap.get(props.background)}`;

    const fontColor: string =
        getFontColor(backgroundColor);

    const className: string =
        state ? ' side-panel--expanded' : '';

    return (
        <div className={`side-panel${className}`} style={{ backgroundColor: backgroundColor, color: fontColor }}>
            {/* <h4 className="side-panel__caption">{props.caption}</h4> */}
            <hr style={{ borderTopColor: fontColor }} />
            <ul className="side-panel__items">
                {mappedMenuItems.map(item => generateSidePanelItem(item))}
            </ul>
            {generateExpander(state, () => setState(!state))}
        </div>
    );
};

const generateExpander = (expanded: boolean, clickHandler: () => void): JSX.Element => {
    const content =
        expanded
            ? (<div className="side-panel__expander-menu" onClick={clickHandler}>
                <span>Collapse</span>
                <i className="fas fa-angle-double-left" />
            </div>)
            : (<div className="side-panel__expander-menu" onClick={clickHandler}>
                <i className="fas fa-angle-double-right" />
            </div>);

    return (
        <div className="side-panel__expander" onClick={clickHandler}>
            {content}
        </div>);
};

const generateSidePanelItem = (item: SidePanelItem & { uid: string }): JSX.Element => {
    if (isNullOrUndefined(item.icon)) {
        return (
            <li key={item.uid} className="side-panel__item side-panel__item--no-icon">
                <span>{item.name}</span>
            </li>
        );
    } else {
        return (
            <li key={item.uid} className="side-panel__item">
                <i className={`fas fa-${item.icon}`} />
                <span>{item.name}</span>
            </li>
        );
    }
};