export default class Modal {
    modalId: string;
    onHide?: () => void;
    hideModal(): void;
    showModal(title: string, content: string, reuseModalIfSameTitle?: boolean, onHide?: () => void, hideOnOutsideClick?: boolean): boolean;
}
