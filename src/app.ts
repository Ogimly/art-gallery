import Settings from './app/controller/settings';
import AppController from './app/controller/controller';

export const appSettings = new Settings();

const appController = new AppController();
appController.start();
