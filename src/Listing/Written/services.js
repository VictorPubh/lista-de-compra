import { listingIndex, lists } from "../../Store/globals";
import { textAreaValue, quantityIdentical } from "../../Store/written-mode";
import { get } from "svelte/store";

class WrittenModeServices {
  list = {};

  constructor(list) {
    this.list = list;
  }

  getText() {
    let output = String();

    if (this.list.limit > 0) output += `Limite: ${this.list.limit}\r\n`;
    // output += (this.list.discount > 0) ? `Desconto: ${this.list.discount}\r\n\r\n` : `\r\n`;

    this.list.content.forEach((item) => {
      let endString = "\r\n";

      if (item.quantity >= get(quantityIdentical)) {
        endString = `== ${item.value * item.quantity}\r\n`;
      }

      if (item.value > 0 || item.purchased) {
        endString = `= ${(item.value).toFixed(2) || 0}\r\n`;
      }

      output += `${item.quantity}x ${item.name} ${endString}`;
    });

    return output;
  }

  isValidLine(line) {
    const validRegEx = /([0-9,.]{1,3}((x)|(\*))[ ]?)?[A-Z\a-z\ *]([ ]?[=]{1,2}[ ]?[0-9,.]{1,8})?/gi;
    return line.match(validRegEx) && line.trim() != String();
  }

  getObject() {
    const mapOutput = get(textAreaValue).split("\n");
    const contentOutput = [];

    mapOutput.forEach((item, i) => {
      let Object = {
        purchased: false
      };
      
      let validLine = false;

      if (this.isValidLine(item)) validLine = true;

      if (item.toLocaleLowerCase().includes("limite:")) {
        const limitIndex = item.indexOf(":");
        const limitCandidate = +item.slice(limitIndex + 1);

        if (!isNaN(limitCandidate)) {
          this.list.limit = limitCandidate;

          const _lists = get(lists);
          _lists[get(listingIndex)].limit = limitCandidate;
          lists.set(_lists);

          validLine = false;
        }
      }

      if (item.includes("x")) {
        const quantityLimit = item.indexOf("x");
        const quantityCadidate = +item.slice(0, quantityLimit);
        let quantityValue = 1;

        if (!isNaN(quantityCadidate)) {
          quantityValue = quantityCadidate;
          item = item.slice(quantityLimit + 1);
        }

        validLine = true;
        Object.quantity = quantityValue;
      } else {
        Object.quantity = 1;
      }

      if (item.includes("==")) {
        const itemInfo = item.split("==");
        const totalCandidate = +itemInfo[1].replace(",", ".");

        if (!isNaN(totalCandidate)) {
          Object.purchased = true;
          Object.value = totalCandidate / Object.quantity;
          item = itemInfo[0];
        }
      } else {
        if (item.includes("=")) {
          const itemInfo = item.split("=");
          const valueCandidate = +itemInfo[1].replace(",", ".");
          let value = 0;

          if (!isNaN(valueCandidate)) {
            value = valueCandidate;
            item = itemInfo[0];
          }

          validLine = true;
          Object.purchased = true;
          Object.value = value;
        } else {
          Object.value = 0;
        }
      }

      Object.name = item.trim();
      if (validLine) contentOutput.push(Object);
    });

    contentOutput.map((out, i) => {
      out.id = i;
    });

    return contentOutput;
  }

save() {
    const parsed = this.getObject();

    if (parsed.length > 0) {
      this.list.content = parsed;
    }

    const _lists = get(lists)
    _lists[get(listingIndex)].content = parsed;
    lists.set(_lists);

    textAreaValue.set(this.getText());
  }
}

export default WrittenModeServices;