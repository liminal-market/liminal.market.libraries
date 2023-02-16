import Modal from "./Modal";
import KycContact from "./KYC/KycContact";
import KycIdentity from "./KYC/KycIdentity";
import KycDisclosures from "./KYC/KycDisclosures";
import KycAccountAgreement from "./KYC/KycAccountAgreement";
import KycTrustedContact from "./KYC/KycTrustedContact";
import KycUpload from "./KYC/KycUpload";
export default class KYCForm {
    steps: number;
    modal: Modal;
    timeout?: any;
    onHide: () => void;
    activeFieldsetSelector: string;
    kycContact: KycContact;
    kycIdentity: KycIdentity;
    kycDisclosures: KycDisclosures;
    kycTrustedContact: KycTrustedContact;
    kycUpload: KycUpload;
    kycAccountAgreement: KycAccountAgreement;
    constructor(onHide: () => void);
    show(className: string): void;
    showKYCForm(edit?: boolean): void;
    setSteps(steps: number): void;
    clearTimeout(): void;
}
