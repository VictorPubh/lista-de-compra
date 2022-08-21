import { lists, textMode } from "../../Store/globals";
import { getFormatMoney } from "../../Utils/moneyOperators";
import { get } from "svelte/store";
import WrittenModeServices from "../Written/services";
import { openModal, optsModal } from "../../Store/modal";
import { navigateTo } from "svelte-router-spa";

export class ListingServices {
  list = {};
  content = [];
  hasLimit = false;

  constructor(list) {
    this.list = list;

    this.content = this.list.content;
    this.hasLimit = this.list.limit > 0;
    
    console.log("ListingServices: ", JSON.stringify(list));
  }

  getAvailable = (formated = true) => {
    const totalAvailable = this.list.limit - (+this.getPicked(false));
    return formated ? getFormatMoney(totalAvailable) : totalAvailable;
  };

  getPicked = function (formated = true) {
    let amount = Number();

    this.content.forEach((item) => {
      if (item.purchased) {
        amount += item.value * item.quantity;
      }
    });

    return formated ? getFormatMoney(amount) : amount;
  };

  setPurchased(id, bool) {
    const _content = get(lists)[this.list.id].content;
    _content[id].purchased = bool;

    this.updateContent(_content);
  }

  updateContent(listContent) {
    this.content = listContent;

    const _lists = get(lists);
    _lists[this.list.id].content = listContent;

    lists.set(_lists);
  }

  openWrittenOrListing(isWritten = true) {
    const { id } = this.list;
    const target = isWritten ? `edit/${id}` : `listing/${id}`;
  
    textMode.set(isWritten);
    navigateTo(target);
  }

  writtenManager() {
    const _list = get(lists)[this.list.id];
    const WMServices = new WrittenModeServices(_list);

    if (get(textMode)) {
      if (
        JSON.stringify(_list.content) != JSON.stringify(WMServices.getObject())
      ) {
        console.log(1)
        optsModal.set({
          title: "Sair sem Salvar?",
          message: "Você não salvou as alteraçõe<br />no Modo Texto.",
          textBack: "Voltar",
          textConfirm: "Salvar",
          textCancel: "Descartar",
          fn: {
            confirm: () => {
              this.updateContent(WMServices.getObject());

              openModal.set(false);
              this.openWrittenOrListing(false);
            },
            cancel: () => {
              openModal.set(false);
              this.openWrittenOrListing(false);
            },
            back: () => {
              openModal.set(false);
            },
            overlay: () => {},
          },
        });
      } else {
        this.openWrittenOrListing(false);
      }
    } else {
      this.openWrittenOrListing();
    }
  }
}
