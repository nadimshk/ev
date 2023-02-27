import "cypress-localstorage-commands";
import data from "../../submissionData.json"; // do not create this file

// let data = [{ submission_link: "http://localhost:5500", id: 67890 }];

import pageTwo from "../fixtures/pageTwo.json";
import pageThree from "../fixtures/pageThree.json";
import pageTwoDesc from "../fixtures/pageTwoDesc.json";
import pageOneAsc from "../fixtures/pageOneAsc.json";
import storageData from "../fixtures/cartItem.json";

describe("Test", function () {
  let acc_score = 1;
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  data.map(({ submission_link: url, id }) => {
    if (url.charAt(url.length - 1) != "/") {
      url = url + "/";
    }
    // Check if Api call is made

    it(`should be able to make the fetch request on page loads `, () => {
      cy.visit(url);
      cy.intercept(
        "GET",
        "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products?**"
      ).as("get-tech-products");
      cy.wait("@get-tech-products").then((res) => {
        expect(res.response).to.have.property("statusCode", 200);
      });
      cy.then(() => {
        acc_score += 2;
      });
    });

    it(`Navbar Should be exported from navbar.js`, () => {
      cy.get('script[type="module"]').should("exist");
      cy.then(() => {
        acc_score += 1;
      });
    });

    it(`On home Page by default page 1 data should be appended`, () => {
      cy.get("#main_items").children().should("have.length", 6);
      cy.then(() => {
        acc_score += 1;
      });
    });

    it(`On first page Previous button should be disabled`, () => {
      cy.get("#previous").should("be.disabled");
      cy.then(() => {
        acc_score += 1;
      });
    });

    it(`On moving page previous or next the page number on DOM should update`, () => {
      cy.get("#next").click();
      cy.get("#page_number").should("have.text", 2);
      cy.get("#next").click();
      cy.get("#page_number").should("have.text", 3);
      cy.get("#next").should("be.disabled");
      cy.get("#previous").click();
      cy.get("#page_number").should("have.text", 2);
      cy.get("#previous").click();
      cy.get("#page_number").should("have.text", 1);
      cy.then(() => {
        acc_score += 1;
      });
    });

    it(`On clicking next button, data from that particular page should fetched and shown`, () => {
      cy.visit(url);
      cy.get("#next").click();
      cy.wait(2000);
      cy.get("#main_items").children().should("have.length", 6);
      cy.get("#main_items")
        .children()
        .each((child, index) => {
          cy.wrap(child)
            .find(".price")
            .should("have.text", pageTwo.data[index].price);
        });
      cy.get("#next").click();

      cy.wait(3000);
      cy.get("#main_items").children().should("have.length", 4);
      cy.get("#main_items")
        .children()
        .each((child, index) => {
          cy.wrap(child)
            .find(".price")
            .should("have.text", pageThree.data[index].price);
        });
      cy.then(() => {
        acc_score += 2;
      });
    });

    it(`On last page next button should be disabled`, () => {
      cy.get("#next").should("be.disabled");
      cy.then(() => {
        acc_score += 1;
      });
    });

    it(`Clicking sort high to low should sort data high to low for current page only`, () => {
      cy.visit(url);
      cy.get("#next").click();
      cy.get("#sort-htl").click();
      cy.wait(2000);
      cy.get("#main_items")
        .children()
        .each((child, index) => {
          cy.wrap(child)
            .find(".price")
            .should("have.text", pageTwoDesc.data[index].price);
        });
      // cy.get(".price").eq(0).should("have.text", 699);
      cy.get(".price").then((res) => {
        let sorted = true;
        for (let i = 1; i < res.length; i++) {
          if (res[i - 1] < res[i]) {
            sorted = false;
          }
        }
        assert.isTrue(sorted);
      });
      cy.then(() => {
        acc_score += 2;
      });
    });

    it(`Clicking sort low to high should sort data low to high for current page only`, () => {
      cy.visit(url);
      cy.get("#sort-lth").click();
      cy.wait(2000);

      cy.get("#main_items")
        .children()
        .each((child, index) => {
          cy.wrap(child)
            .find(".price")
            .should("have.text", pageOneAsc.data[index].price);
        });
      cy.get(".price").then((res) => {
        let sorted = true;
        for (let i = 1; i < res.length; i++) {
          if (res[i - 1] > res[i]) {
            sorted = false;
          }
        }
        assert.isTrue(sorted);
      });
      cy.then(() => {
        acc_score += 2;
      });
    });

    it(` on adding items to the cart and the cart count in the navbar should be updated`, () => {
      cy.visit(url);
      cy.get(".add_to_cart").eq(0).click();
      cy.get(".add_to_cart").eq(1).click();
      cy.get(".add_to_cart").eq(2).click();
      cy.get("#cart_count").should("have.text", 3);
      cy.then(() => {
        acc_score += 1;
      });
    });

    it(`shound not able to add same product twice in cart and alert should be shown`, () => {
      cy.visit(url),
        cy.get(".add_to_cart").eq(0).click(),
        cy.get(".add_to_cart").eq(0).click(),
        cy.get("#cart_count").should("have.text", 3),
        cy.on("window:alert", (message) => {
          expect(message).to.equal("Item already exists");
        });

      cy.then(() => {
        acc_score += 1;
      });
    });

    it(` The cart items should be added to LocalStorage`, () => {
      cy.restoreLocalStorage();
      let data = JSON.parse(localStorage.getItem("cart"));
      expect(data.length).to.equal(3);

      expect(data[0].brand).to.equal(storageData[0].brand);
      expect(data[1].brand).to.equal(storageData[1].brand);
      expect(data[0].price).to.equal(storageData[0].price);
      expect(data[1].price).to.equal(storageData[1].price);
      cy.then(() => {
        acc_score += 1;
      });
    });

    it(`Items added to cart is reflected on cart page`, () => {
      cy.visit(`${url}/cart.html`);
      cy.get("#items").children().should("have.length", 3);
      cy.then(() => {
        acc_score += 2;
      });
    });

    it(`On removing an item that item should be removed`, () => {
      cy.get(".remove").eq(1).click();
      cy.get("#items").children().should("have.length", 2);
      cy.get("#cart_count").should("have.text", 2);
      cy.then(() => {
        acc_score += 1;
      });
    });

    it(`generate score`, () => {
      console.log("final score:", acc_score);
      //////////////
      let result = {
        id,
        marks: acc_score,
      };
      result = JSON.stringify(result);
      cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
        if (err) {
          console.error(err);
        }
      });
      //////////////////
    });
  });
});
