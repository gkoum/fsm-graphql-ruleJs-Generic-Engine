import { PubSub } from 'apollo-server';

import * as MESSAGE_EVENTS from './message'
import * as APPLICATION_EVENTS from './application'

export const EVENTS = {
  MESSAGE: MESSAGE_EVENTS,
  APPLICATION: APPLICATION_EVENTS
};

export default new PubSub();
