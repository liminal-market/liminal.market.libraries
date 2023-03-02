import Modal from "../Modal";
import KycEditTrustedContactHtml from "../../../html/modal/Kyc/KycEditTrustedContact.html";
import CountryHelper from "../../../util/CountryHelper";
import FormHelper from "../../../util/FormHelper";
import UserService from "../../../services/backend/UserService";
import LoadingHelper from "../../../util/LoadingHelper";
import WidgetGlobals from "src/WidgetGlobals";

export default class KycEditTrustedContact {
  modal: Modal;

  constructor() {
    this.modal = new Modal();
  }

  public async show() {
    let userService = new UserService();
    let account = await userService.getAccount();

    let template = WidgetGlobals.HandlebarsInstance.compile(
      KycEditTrustedContactHtml
    );
    this.modal.showModal(
      "Edit trusted contact",
      template({ countries: CountryHelper.Countries })
    );

    if (account.trusted_contact) {
      let contactProperties = Object.getOwnPropertyNames(
        account.trusted_contact
      );
      FormHelper.fillInputs(contactProperties, account.trusted_contact);
    }
    this.bindEvents();
  }

  public bindEvents() {
    let trustedContactSubmit = document.getElementById("trustedContactSubmit");
    trustedContactSubmit?.addEventListener("click", async (evt) => {
      evt.preventDefault();

      if (!FormHelper.validate("#kycTrustedContactForm")) return;
      LoadingHelper.setLoading(trustedContactSubmit);

      let params = FormHelper.getParams("#kycTrustedContactForm");

      let userService = new UserService();
      await userService
        .updateTrustedContact(params)
        .then((response: any) => {
          if (response.message) {
            this.showError(response.message);
            return;
          }
          this.modal.hideModal();
        })
        .catch((reason) => {
          if (reason.message) {
            this.showError(JSON.parse(reason.message).message);
          } else {
            this.showError(reason);
          }
        })
        .finally(() => {
          LoadingHelper.removeLoading();
        });
    });
  }

  private showError(message: string) {
    let kycEditNameError = document.getElementById("kycEditNameError");
    if (!kycEditNameError) return;

    kycEditNameError.innerHTML = message;
    kycEditNameError.style.display = "block";
  }
}
