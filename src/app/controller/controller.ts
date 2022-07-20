import { appSettings } from '../../app';
import DataModel from '../model/dataModel';
import { ArrayS, IData, SettingsValue, TData, TRange } from '../abstract/types';
import ViewApp from '../view/view';
import FixedSelector from './selectors/fixedSelector';
import RangeSelector from './selectors/rangeSelector';
import CheckSelector from './selectors/checkSelector';
import SearchSelector from './selectors/searchSelector';
import SelectSelector from './selectors/selectSelector';
import { bagMaxSize, sortOptions } from '../abstract/const';
import { toggleItem } from '../abstract/functions';
import { getLangMapping } from '../abstract/mapping';
import ModalAlert from '../view/modal/modalAlert';

type TSelectors =
  | FixedSelector
  | RangeSelector
  | CheckSelector
  | SearchSelector
  | SelectSelector;

class AppController {
  // model
  private _model: DataModel;

  // view
  private _appView: ViewApp;

  private _selectors: Map<string, TSelectors>;

  constructor() {
    // load model & all property
    this._model = new DataModel();

    this._model.setInBag(appSettings.getBag());
    this._model.setInFavorite(appSettings.getFavorite());

    this._selectors = new Map([]);
    this.createSelectors();

    this._appView = new ViewApp();
  }

  //* -------- SELECTORS --------
  private createSelectors() {
    this.createFixedSelectors();
    this.createRangeSelectors();
    this.createCheckSelectors();

    this._selectors.set('inBag', new CheckSelector('inBag', false));
    this._selectors.set('inFavorite', new CheckSelector('inFavorite', false));

    this._selectors.set('search', new SearchSelector('search'));
    this._selectors.set(
      'sorting',
      new SelectSelector('sorting', sortOptions, appSettings.getView().sorting)
    );
  }

  private createFixedSelectors() {
    const values = appSettings.getModel().fixed;

    const arr = Object.entries(appSettings.getSelectors().fixed);
    // arr ot [key, value] = ['artCategory', enArtCategory]

    arr.forEach((ctrl) => {
      const [key, allValues] = ctrl;
      this._selectors.set(
        key,
        new FixedSelector(<keyof IData>key, allValues, values[key])
      );
    });
  }

  private createRangeSelectors() {
    const values = appSettings.getModel().range;

    const arr = Object.entries(appSettings.getSelectors().range);
    // arr ot [key, value] = ['price', { min: 0, max: 100 }]

    arr.forEach((ctrl) => {
      const [key, allValues] = ctrl;
      this._selectors.set(
        key,
        new RangeSelector(
          <keyof IData>key,
          allValues,
          values[key] ? values[key] : allValues
        )
      );
    });
  }

  private createCheckSelectors() {
    const values = appSettings.getModel().check;

    const arr = appSettings.getSelectors().check; // ['inStock', 'last']

    arr.forEach((key) => {
      this._selectors.set(key, new CheckSelector(<keyof IData>key, values.includes(key)));
    });
  }

  private updSelector({ key, newValue }: SettingsValue) {
    const selector = this._selectors.get(key);
    if (selector instanceof FixedSelector) selector.setValues(<ArrayS>newValue);
    if (selector instanceof RangeSelector) selector.setValues(<TRange>newValue);
    if (selector instanceof CheckSelector) selector.setValues(<boolean>newValue);
    if (selector instanceof SearchSelector) selector.setValues(<string>newValue);
    if (selector instanceof SelectSelector) selector.setValues(<string>newValue);
  }

  private updAllSelectors() {
    this._selectors.forEach((selector, key) => {
      if (selector instanceof FixedSelector)
        selector.setValues(appSettings.getModelFixed(key));
      if (selector instanceof RangeSelector)
        selector.setValues(appSettings.getModelRange(key));
      if (selector instanceof CheckSelector)
        selector.setValues(appSettings.getModelCheck(key));
      if (selector instanceof SearchSelector) selector.setValues('');
      if (selector instanceof SelectSelector)
        selector.setValues(appSettings.getViewSelect('sorting'));
    });
  }

  //* -------- FILTER --------
  private filter(data: TData): TData {
    const selectors = [...this._selectors.values()];

    return selectors.reduce((previousData, selector) => {
      return selector.filter(previousData);
    }, data);
  }

  //* -------- RENDER --------
  private renderApp() {
    const data = this.filter(this._model.getData());

    this._appView.render(data);
    this.addHandlers();
  }

  private renderPanelSelectors() {
    this._appView.renderPanelSelectors();
    this.addPanelSelectorsHandler();
  }

  private renderShowcase() {
    const data = this.filter(this._model.getData());

    this._appView.renderShowCase(data);
  }

  //* -------- HANDLERS --------
  private addHandlers() {
    this.addPanelSelectorsHandler();
    this.addPanelHeaderHandler();
  }

  private addPanelSelectorsHandler() {
    this._appView.setPanelSelectorsHandler(this.PanelSelectorsHandler.bind(this));

    this._appView.setClearHandler(this.ClearHandler.bind(this));

    this._appView.setResetHandler(this.ResetHandler.bind(this));
  }

  private PanelSelectorsHandler(modelValue: SettingsValue) {
    appSettings.setModel(modelValue);
    this.updSelector(modelValue);

    this.renderShowcase();
  }

  private ClearHandler() {
    appSettings.clearSettings();
    this.updAllSelectors();

    this._model.setInBag(appSettings.getBag());
    this._model.setInFavorite(appSettings.getFavorite());

    this.renderApp();
  }

  private ResetHandler() {
    appSettings.clearModel();
    this.updAllSelectors();

    this.renderPanelSelectors();
    this.renderShowcase();
  }

  private addPanelHeaderHandler() {
    this._appView.setPanelHeaderHandler(this.PanelHeaderHandler.bind(this));
  }

  private PanelHeaderHandler(viewValue: SettingsValue) {
    appSettings.setView(viewValue);
    this.updSelector(viewValue);

    if (viewValue.key === 'lang') {
      this.renderApp();
    } else {
      this.renderShowcase();
    }
  }

  private addShowcaseHandler() {
    this._appView.setShowcaseHandler(
      this.ShowcaseInBagHandler.bind(this),
      this.ShowcaseInFavoriteHandler.bind(this)
    );
  }

  private ShowcaseInBagHandler(i: number): boolean {
    const newBag = toggleItem<number>(appSettings.getBag(), i);
    if (newBag.length > bagMaxSize) {
      new ModalAlert(getLangMapping('bagLimit'));
      return false;
    }

    appSettings.setBag(newBag);
    this._model.setOneInBag(i);

    this._appView.setBagCounter(appSettings.getBag().length);

    return true;
  }

  private ShowcaseInFavoriteHandler(i: number): boolean {
    appSettings.setFavorite(toggleItem<number>(appSettings.getFavorite(), i));
    this._model.setOneInFavorite(i);

    this._appView.setFavoriteCounter(appSettings.getFavorite().length);

    return true;
  }

  public start() {
    this.addShowcaseHandler();
    this.renderApp();
    // new ModalAlert('Привет!');
  }
}
export default AppController;
