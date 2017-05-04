import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Grid from '../src/components/grid.jsx';

import '../src/assets/grid.global.sass';
import '../src/index.global.sass';

const emails = [
  { id: 1, createdAt: new Date(2012, 10,10).getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' },
  { id: 2, createdAt: new Date(2017, 4, 2).getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' },
  { id: 3, createdAt: new Date(2017, 4, 3).getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' },
  { id: 4, createdAt: new Date(2017, 3, 1).getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' },
  { id: 5, createdAt: new Date().getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' }
];

storiesOf('Grid', module)
  .add('with emails', () => (
    <Grid items={emails}/>
  ));

