import { tourFirstItemAdd } from "../../../Store/globals";
import { get } from "svelte/store";
import { valueInput, quantityInput, productInput, listingFocused } from "../store";

export class ListServices {
  list = [];

  constructor(list) {
    this.list = list;
  }

  updateStore = (data) => {
    this.list = data;
    listingFocused.set(data);
  };

  removeZeroedProducts() {
    const _content = this.list.filter((item) => item.quantity > 0);
    _content.map((item, i) => item.id = i);

    this.updateStore(_content);
  }

  addItem() {
    const hasValue = get(valueInput) !== undefined;

    console.log(JSON.stringify(this.list))
    const id = this.list.length;
    const quantity = isNaN(get(quantityInput)) ? 1 : get(quantityInput);
    const name =
      typeof get(productInput) === "undefined"
        ? `Produto #${id + 1}`
        : get(productInput);
    const value = hasValue ? get(valueInput) : 0;

    this.list.push({
      id,
      name,
      quantity,
      value,
      purchased: hasValue,
      content: []
    });

    valueInput.set(undefined);
    quantityInput.set(undefined);
    productInput.set(undefined);

    if (id == 0) tourFirstItemAdd.set(true);

    this.updateStore(this.list);
  }

  setPurchased(itemId, bool) {
    const _lists = this.list;
    _lists[itemId].purchased = bool;

    this.updateStore(_lists);
  }
}
