import '../styles/styles.scss';
import { addOfflineChecking } from './connection-checker';
import { setFooterDate } from './footerDate';

setFooterDate('footer > section#year')
const offlineElement = document.getElementById('connection-status');
if (offlineElement) addOfflineChecking(offlineElement);


