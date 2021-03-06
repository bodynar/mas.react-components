import React from 'react';

import SidePanel from './component/sidepanel';
import { SidepanelItem } from './types';

export default function SidePanelPageRoute(): JSX.Element {
    const sidePanelItems: Array<SidepanelItem> =
        [
            {
                name: 'Messaging',
                icon: 'fax',
                route: 'fax',
                active: true,
                component: FaxComponent
            },
            {
                name: 'Gamification courses',
                route: 'games',
                active: true,
                component: GamesComponent
            },
            {
                name: 'Contacts',
                icon: 'address-card',
                route: 'contacts',
                active: false,
                render: () => {
                    return (
                        <>
                            <h1>Contacts</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item active" aria-current="page">CONTACTS</li>
                                </ol>
                            </nav>
                        </>

                    );
                }
            },
            {
                name: 'Snooring',
                icon: 'bed',
                route: 'bed',
                active: true,
                component: BedComponent
            },
            {
                name: 'Courses',
                icon: 'user-graduate',
                route: 'courses',
                active: true,
                render: () => <CoursesComponent />
            }
        ];

    return (
        <div className="side-panel__container">
            <SidePanel
                background='ShadowPurple'
                items={sidePanelItems}
            />
        </div>
    );
};

const FaxComponent = (): JSX.Element => {
    return (
        <>
            <h1>FAX</h1>
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Alert!</h4>
                <p>
                    Aww yeah, you successfully read this important alert message.
                    This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.
            </p>
                <hr />
                <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
            </div>
        </>

    );
};

const GamesComponent = (): JSX.Element => {
    return (
        <>
            <h1>Games</h1>
            <div className="card-deck">
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
                <div className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
            </div>
        </>

    );
};

const BedComponent = (): JSX.Element => {
    return (
        <>
            <h1>Bed</h1>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa <strong>strong</strong>. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede <a className="external ext" href="#">link</a> mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
            <h3>Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus</h3>
            <ul>
                <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</li>
                <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,sem.</li>
                <li>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</li>
                <li>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.</li>
            </ul>
            <h5>Donec pede justo fringilla vel aliquet nec vulputate eget arcu</h5>
            <blockquote className="blockquote">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa <strong>strong</strong>. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In <em>em</em> enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam <a className="external ext" href="#">link</a> dictum felis eu pede mollis pretium.
        </blockquote>

            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>
        </>
    );
};

const CoursesComponent = (): JSX.Element => {
    return (
        <>
            <h1>Courses</h1>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>

            <ul>
                <li>Lorem ipsum dolor sit amet consectetuer.</li>
                <li>Aenean commodo ligula eget dolor.</li>
                <li>Aenean massa cum sociis natoque penatibus.</li>
            </ul>

            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};