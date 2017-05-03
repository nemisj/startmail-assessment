import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Grid from '../src/components/grid.jsx';
import Welcome from './Welcome';

import '../src/assets/grid.global.sass';
import '../src/index.global.sass';

const emails = [
  { createdAt: new Date(2012, 10,10).getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' },
  { createdAt: new Date(2017, 4, 2).getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' },
  { createdAt: new Date(2017, 4, 3).getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' },
  { createdAt: new Date(2017, 3, 1).getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' },
  { createdAt: new Date().getTime(), from: 'Tijn Schmits', subject: 'Our visit on 10 june' }
];

storiesOf('Grid', module)
  .add('with emails', () => (
    <Grid items={emails}/>
  ));

