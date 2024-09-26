'use strict';

import {Header} from "./components/header.js    ";

const root = document.getElementById('root');
const header = new Header();
root.appendChild(header.getMainContainer());