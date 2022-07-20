import Control from '../../common/control';
import './controlButton.scss';

export class ControlButton extends Control {
  constructor(parent: Control, classList: string, content: string) {
    super(parent.node, 'span', `button ${classList}`, content);
  }

  setContent(content: string) {
    this.node.textContent = content;
  }

  addClassName(className: string) {
    this.node.classList.add(className);
  }

  removeClassName(className: string) {
    this.node.classList.remove(className);
  }
}

export default ControlButton;
