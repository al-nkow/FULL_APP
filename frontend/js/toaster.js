const defaultDuration = 3000;

export default class Toast {

  success(msg, duration = defaultDuration) {
    Toast.show(msg, 'success', duration);
  }

  error(msg, duration = defaultDuration) {
    Toast.show(msg, 'error', duration);
  }

  static show(msg, type, duration) {
    const toast  = document.createElement('div');
    const text   = document.createTextNode(msg);
    const parent = document.body;

    toast.appendChild(text);
    toast.className = `toast ${type}`;
    parent.appendChild(toast)

    setTimeout(() => {
      parent.removeChild(toast);
    }, duration);
  }

};