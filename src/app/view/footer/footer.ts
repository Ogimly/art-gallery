import Control from '../../common/control';
import './footer.scss';

export class ViewFooter extends Control {
  constructor() {
    super(document.body, 'footer', 'footer');

    const wrapper = new Control(this.node, 'div', 'footer__inner');

    let link = new Control<HTMLLinkElement>(wrapper.node, 'a', 'footer__link');
    link.node.href = 'https://github.com/ogimly';
    new Control(link.node, 'div', 'footer__github', '2022');

    link = new Control<HTMLLinkElement>(wrapper.node, 'a', 'footer__link');
    link.node.href = 'https://rs.school/js/';
    new Control(link.node, 'div', 'footer__rss');
  }

  public render() {
    // do nothing
  }
}

export default ViewFooter;
