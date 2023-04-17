"use strict";

class AdviceApp {
  adviceBox = document.querySelector(".advice-generator-box");
  adviceId = document.querySelector(".advice-num");
  adviceText = document.querySelector(".advice-text");
  getAdviceBtn = document.querySelector(".get-advice-btn");

  constructor() {
    this.getAdvice();
    this.getAdviceBtn.addEventListener("click", this.getAdvice.bind(this));
  }

  async getAdvice() {
    this.adviceBox.classList.add("hide-text");
    this.getAdviceBtn.disabled = true;

    try {
      const fetchPro = fetch("https://api.adviceslip.com/advice");
      const response = await Promise.race([fetchPro, this.timeout(10)]);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${data.message} (${res.status})`);
      }
      this.renderAdvice(data.slip);
    } catch (error) {
      console.error(error);
      this.renderError(error.message);
    }
  }

  renderAdvice(slip) {
    setTimeout(
      function () {
        this.adviceId.textContent = slip.id;
        this.adviceText.innerHTML = `&ldquo;${slip.advice}&rdquo;`;
      }.bind(this),
      500
    );

    setTimeout(
      function () {
        this.adviceBox.classList.remove("hide-text");
        this.getAdviceBtn.disabled = false;
      }.bind(this),
      1000
    );
  }

  renderError(message) {
    setTimeout(
      function () {
        this.adviceId.textContent = "???";
        this.adviceText.textContent = `Error: ${message}. Please try again`;
      }.bind(this),
      500
    );

    setTimeout(
      function () {
        this.adviceBox.classList.remove("hide-text");
        this.getAdviceBtn.disabled = false;
      }.bind(this),
      1000
    );
  }

  timeout(s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} seconds`));
      }, s * 1000);
    });
  }
}

const app = new AdviceApp();
