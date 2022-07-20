import Control from '../../common/control';
import './modalAlert.scss';

export class ModalAlert {
  constructor(str: string) {
    document.body.classList.add('lock');

    const modal = new Control(document.body, 'div', 'modal');
    new Control(
      new Control(modal.node, 'div', 'modal__text', str).node,
      'div',
      'button button_modal',
      'X'
    ).node.addEventListener('click', () => {
      modal.destroy();
      document.body.classList.remove('lock');
    });
  }
}

export default ModalAlert;
